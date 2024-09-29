from PIL import Image
import numpy as np
import os

from django.conf import settings
from cancer.models import BreastCancerReport


class BreastSegmentation:
    def __init__(self, *args, **kwargs) -> None:
        self.model_path = f"{settings.BASE_DIR}/models/breast-segmentation"

        self.load_model()
        self.analyze(*args, **kwargs)

    def load_model(self):
        from tensorflow.keras.models import load_model

        self.model = load_model(self.model_path)

    def preprocess_image(self, image_path: str, target_size: tuple):
        image = Image.open(image_path)
        image = image.resize(target_size)
        image = np.expand_dims(image, axis=0)
        return image

    def analyze(self, image_path: str, report_id: str):
        predicted_mask = self.predict(image_path)
        segmented_image_path = self.save_plots(image_path, predicted_mask)

        report = BreastCancerReport.objects.get(id=report_id)
        report.segmented_image = "/media/" + segmented_image_path.split("media/")[-1]

        report.save()

    def predict(self, image_path: str):
        target_size = (256, 256)
        new_image = self.preprocess_image(image_path, target_size)
        predicted_mask = self.model.predict(new_image)
        predicted_mask = np.squeeze(predicted_mask)
        return predicted_mask

    def save_plots(self, image_path: str, predicted_mask):
        import matplotlib

        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        import uuid

        segmented_image_path = (
            f"{settings.BASE_DIR}/media/reports/breast/{uuid.uuid4()}.jpg"
        )
        os.makedirs(os.path.dirname(segmented_image_path), exist_ok=True)

        original_image = Image.open(image_path)

        plt.figure(figsize=(10, 5))

        plt.subplot(1, 2, 1)
        plt.imshow(original_image)
        plt.title("Original Image")
        plt.axis("off")

        plt.subplot(1, 2, 2)
        plt.imshow(predicted_mask, cmap="jet")
        plt.title("Predicted Tumor")
        plt.axis("off")
        plt.tight_layout()
        plt.savefig(segmented_image_path)
        plt.close()

        return segmented_image_path
