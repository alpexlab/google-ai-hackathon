import numpy as np
from tensorflow.keras.preprocessing import image

from django.conf import settings
from cancer.models import LungCancerReport


class LungsAnalysis:
    def __init__(self, *args, **kwargs) -> None:
        self.model_path = f"{settings.BASE_DIR}/models/lungs.keras"
        self.class_names = ["benign", "malignant", "no tumor detected"]
        self.load_model()
        self.analyze(*args, **kwargs)

    def load_model(self):
        from tensorflow.keras.models import load_model as load_keras_model

        self.model = load_keras_model(self.model_path, compile=False)

    def load_and_preprocess_image(self, img_path, img_height, img_width):
        img = image.load_img(img_path, target_size=(img_height, img_width))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0
        return img_array

    def analyze(self, img_path: str, report_id: str):
        result, predictions, predicted_class, img_array = self.predict(img_path)
        result_image_path, stats_image_path = self.save_plots(
            img_array, predictions, predicted_class
        )

        report = LungCancerReport.objects.get(id=report_id)
        report.result_image = "/media/" + result_image_path.split("media/")[-1]
        report.stats_image = "/media/" + stats_image_path.split("media/")[-1]
        report.predicted_label = result
        report.probs = predictions.tolist()[0]
        report.status = LungCancerReport.Status.COMPLETE
        report.save()

    def predict(self, img_path: str):
        img_height, img_width = 256, 256
        img_array = self.load_and_preprocess_image(img_path, img_height, img_width)

        predictions = self.model.predict(img_array)
        predicted_class = np.argmax(predictions, axis=1)

        result = self.class_names[predicted_class[0]]

        return result, predictions, predicted_class, img_array

    def save_plots(self, img_array, predictions, predicted_class):
        import matplotlib.pyplot as plt
        import matplotlib

        matplotlib.use("Agg")
        import uuid
        import os

        plt.figure(figsize=(10, 5))

        # First subplot: image and predicted class
        plt.subplot(1, 2, 1)
        plt.axis("off")
        plt.title(f"Predicted: {self.class_names[predicted_class[0]]}")

        # Second subplot: prediction probabilities
        plt.subplot(1, 2, 2)
        plt.bar(self.class_names, predictions[0], color=["blue", "red", "green"])
        plt.xlabel("Class")
        plt.ylabel("Probability")
        plt.title("Prediction Probabilities")

        # Save the plot
        result_image_path = (
            f"{settings.BASE_DIR}/media/reports/lungs/{uuid.uuid4()}.jpg"
        )
        os.makedirs(os.path.dirname(result_image_path), exist_ok=True)
        plt.savefig(result_image_path, bbox_inches="tight")
        plt.close()

        # Plot for the prediction probabilities
        plt.figure()
        plt.bar(self.class_names, predictions[0], color=["blue", "red", "green"])
        plt.xlabel("Class")
        plt.ylabel("Probability")
        plt.title("Prediction Probabilities")

        # Save the plot
        stats_image_path = f"{settings.BASE_DIR}/media/reports/lungs/{uuid.uuid4()}.jpg"
        os.makedirs(os.path.dirname(stats_image_path), exist_ok=True)
        plt.savefig(stats_image_path, bbox_inches="tight")
        plt.close()

        return result_image_path, stats_image_path
