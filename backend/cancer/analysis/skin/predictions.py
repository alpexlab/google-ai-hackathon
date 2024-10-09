from PIL import Image
import tensorflow as tf
import numpy as np

from django.conf import settings

from cancer.analysis.segmentation.mask import Segmentation
from cancer.models import Notifications, SkinCancerReport


class SkinAnalysis:
    def __init__(self, *args, **kwargs) -> None:
        self.model_path = f"{settings.BASE_DIR}/models/skin_cancer"
        self.class_names = [
            "actinic keratosis",
            "basal cell carcinoma",
            "dermatofibroma",
            "melanoma",
            "nevus",
            "pigmented benign keratosis",
            "seborrheic keratosis",
            "squamous cell carcinoma",
            "vascular lesion",
        ]
        self.load_model()
        self.analyze(*args, **kwargs)

    def load_model(self):
        model = tf.saved_model.load(self.model_path)
        self.model = model.signatures["serving_default"]

    def analyze(self, img_path: str, report_id: str, doctor: str):
        predicted_class, predictions = self.predict(img_path)
        result_image_path = self.plot_image_and_histogram(
            img_path, predicted_class, predictions
        )

        report = SkinCancerReport.objects.get(id=report_id)
        report.result_image = "/media/" + result_image_path.split("media/")[-1]

        report.predicted_label = self.class_names[predicted_class]
        report.probs = predictions.tolist()
        report.max_prob = max(report.probs)
        segmented_image_path = Segmentation(img_path).segmented_image_path
        report.segmented_image = "/media/" + segmented_image_path.split("media/")[-1]
        report.status = SkinCancerReport.Status.COMPLETE
        report.save()

        Notifications.objects.create(
            doctor=doctor,
            message=f"Skin cancer analysis for {report.cancer.patient.name} (Registration No: {report.cancer.patient.id}) is completed. The report suggests {report.predicted_label} with a probability of {report.max_prob:.2f}. Please check the report for more details",
        )

    def load_and_preprocess_image_pil(self, image_path):
        img = Image.open(image_path).resize((256, 256))
        img_array = np.array(img)
        img_array = img_array / 127.5 - 1
        img_array = np.expand_dims(img_array, axis=0)
        return img_array

    def predict(self, image_path):
        preprocessed_image = self.load_and_preprocess_image_pil(image_path)
        predictions = self.model(
            tf.convert_to_tensor(preprocessed_image, dtype=tf.float32)
        )

        probabilities = predictions["output_0"].numpy()
        predicted_class = np.argmax(probabilities, axis=1)[0]
        return predicted_class, probabilities[0]

    def plot_image_and_histogram(self, image_path, predicted_class, probabilities):
        import matplotlib.pyplot as plt
        import matplotlib

        matplotlib.use("Agg")
        import uuid
        import os

        result_image_path = (
            f"{settings.BASE_DIR}/media/reports/lungs/{uuid.uuid4()}.jpg"
        )
        os.makedirs(os.path.dirname(result_image_path), exist_ok=True)

        img = Image.open(image_path)
        _, axes = plt.subplots(1, 2, figsize=(12, 6))

        # Plot the image
        axes[0].imshow(img)
        axes[0].axis("off")
        axes[0].set_title(f"Predicted: {self.class_names[predicted_class]}")

        if len(probabilities) != len(self.class_names):
            print(
                f"Warning: Expected {len(self.class_names)} probabilities, but got {len(probabilities)}."
            )

            if len(probabilities) < len(self.class_names):
                probabilities = np.pad(
                    probabilities,
                    (0, len(self.class_names) - len(probabilities)),
                    "constant",
                )
            else:
                probabilities = probabilities[: len(self.class_names)]

        axes[1].bar(self.class_names, probabilities)
        axes[1].set_ylabel("Probability")
        axes[1].set_title("Class Probability Distribution")
        axes[1].set_xticklabels(self.class_names, rotation=45, ha="right")

        plt.tight_layout()
        plt.savefig(result_image_path)

        return result_image_path
