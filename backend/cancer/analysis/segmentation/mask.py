import numpy as np
import cv2

from django.conf import settings


class Segmentation:
    def __init__(self, *args, **kwargs) -> None:
        self.model_path = f"{settings.BASE_DIR}/models/segmentation"
        self.load_model_from_path()
        self.analyze(*args, **kwargs)

    def load_model_from_path(self):
        import tensorflow as tf

        self.model = tf.keras.layers.TFSMLayer(
            self.model_path, call_endpoint="serving_default"
        )

    def analyze(self, img_path: str):
        mask = self.predict_image(img_path)
        self.display_image_and_heatmap(img_path, mask)

    def load_and_preprocess_image(self, image_path):
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        if img is None:
            raise ValueError("Image not found or unable to load.")
        img_resized = cv2.resize(img, (256, 256))
        img_normalized = img_resized / 255.0  # Scale pixel values to [0, 1]
        img_input = img_normalized.reshape(1, 256, 256, 1)
        return img_input

    def predict_image(self, image_path):
        img_input = self.load_and_preprocess_image(image_path)
        y_pred = self.model(img_input)

        y_pred_tensor = y_pred["output_0"]

        y_pred_binary = (y_pred_tensor > 0.5).numpy().astype(np.uint8)
        return y_pred_binary[0, :, :, 0]

    def display_image_and_heatmap(self, image_path, mask):
        import matplotlib.pyplot as plt
        import matplotlib

        matplotlib.use("Agg")
        import uuid
        import os

        segmented_image_path = (
            f"{settings.BASE_DIR}/media/reports/segmentation/{uuid.uuid4()}.jpg"
        )
        os.makedirs(os.path.dirname(segmented_image_path), exist_ok=True)

        original_image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        original_image_resized = cv2.resize(original_image, (256, 256))

        heatmap = cv2.applyColorMap((mask * 255).astype(np.uint8), cv2.COLORMAP_JET)

        plt.figure(figsize=(10, 5))

        plt.subplot(1, 2, 1)
        plt.imshow(original_image_resized, cmap="gray")
        plt.title("Original Image")
        plt.axis("off")

        plt.subplot(1, 2, 2)
        plt.imshow(original_image_resized, cmap="gray", alpha=0.5)
        plt.imshow(heatmap, alpha=0.5)
        plt.title("Heatmap Mask")
        plt.axis("off")

        plt.tight_layout()
        plt.savefig(segmented_image_path)

        plt.close()

        self.segmented_image_path = segmented_image_path
