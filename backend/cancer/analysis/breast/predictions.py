import numpy as np
import os
from tensorflow.keras.preprocessing import image
import tensorflow as tf

from django.conf import settings

from cancer.models import BreastCancerReport, Notifications
from cancer.analysis.segmentation.mask import Segmentation


class BreastAnalysis:
    def __init__(self, *args, **kwargs) -> None:
        self.model_path = f"{settings.BASE_DIR}/models/breast_prediction"

        self.load_model()
        self.analyze(*args, **kwargs)

    def load_model(self):
        model = tf.saved_model.load(self.model_path)
        self.model = model.signatures["serving_default"]

    def analyze(self, image_path: str, report_id: str, doctor: str):
        label, pred_value, benign_prob, malignant_prob, original_img = (
            self.predict_image(image_path)
        )
        result_image_path = self.save_plots(
            original_img, label, pred_value, benign_prob, malignant_prob
        )

        report = BreastCancerReport.objects.get(id=report_id)
        report.max_prob = pred_value
        report.predicted_label = label
        report.probs = [benign_prob, malignant_prob]
        report.result_image = "/media/" + result_image_path.split("media/")[-1]

        segmented_image_path = Segmentation(image_path).segmented_image_path
        report.segmented_image = "/media/" + segmented_image_path.split("media/")[-1]

        report.status = BreastCancerReport.Status.COMPLETE
        report.save()

        Notifications.objects.create(
            doctor=doctor,
            message=f"Breast cancer analysis for {report.cancer.patient.name} (Registration No: {report.cancer.patient.id}) is completed. The report suggests {label} with a probability of {pred_value:.2f}. Please check the report for more details",
        )

    def preprocess_image(self, image_path, target_size=(200, 200)):
        img = image.load_img(image_path, target_size=target_size)
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0
        return img_array, img

    def predict_image(self, image_path):
        # Preprocess the image
        img, original_img = self.preprocess_image(image_path)

        img_tensor = tf.convert_to_tensor(img, dtype=tf.float32)
        prediction = self.model(img_tensor)

        prob = prediction["output_0"].numpy()[0]

        label = "Malignant" if prob > 0.5 else "Benign"
        probability = float(prob) if prob > 0.5 else float(1 - prob)

        benign_prob = 1 - probability
        malignant_prob = probability

        return label, probability, benign_prob, malignant_prob, original_img

    def save_plots(self, original_img, label, probability, benign_prob, malignant_prob):
        import matplotlib

        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        import uuid

        result_image_path = (
            f"{settings.BASE_DIR}/media/reports/breast/{uuid.uuid4()}.jpg"
        )
        os.makedirs(os.path.dirname(result_image_path), exist_ok=True)

        _, ax = plt.subplots(1, 2, figsize=(10, 5))

        original_img_array = image.img_to_array(original_img)
        ax[0].imshow(original_img_array.astype("uint8"))
        ax[0].axis("off")
        ax[0].set_title(f"{label} (Probability: {probability:.2f})")

        ax[1].bar(
            ["Benign", "Malignant"],
            [benign_prob, malignant_prob],
            color=["blue", "red"],
        )
        ax[1].set_ylim(0, 1)
        ax[1].set_ylabel("Probability")
        ax[1].set_title("Class Probability Histogram")

        plt.tight_layout()
        plt.savefig(result_image_path)
        plt.close()

        return result_image_path
