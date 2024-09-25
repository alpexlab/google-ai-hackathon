from keras.layers import TFSMLayer
import numpy as np
from PIL import Image
import os

from django.conf import settings


class BrainAnalysis:
    def __init__(self):
        self.model_path = f"{settings.BASE_DIR}/models/brain_tumor"

        self.class_dict = {"glioma": 0, "meningioma": 1, "notumor": 2, "pituitary": 3}
        self.classes = ["glioma", "meningioma", "notumor", "pituitary"]
        self.label = list(self.class_dict.keys())

        self.load_model()

    def load_model(self):
        self.model = TFSMLayer(self.model_path, call_endpoint="serving_default")

    def analyze(self, img_path: str):
        predicted_label, probs, max_prob, max_prob_idx = self.predict(img_path)
        result_image_path, stats_image_path = self.save_plots(
            img_path, predicted_label, probs, max_prob_idx
        )

        # Save the report here

    def predict(self, img_path: str):
        img = Image.open(img_path)
        resized_img = img.resize((299, 299))
        img = np.asarray(resized_img)
        img = np.expand_dims(img, axis=0)
        img = img / 255.0

        predictions = self.model(img)

        probs = predictions["dense_1"].numpy()[0]

        max_prob_idx = np.argmax(probs)
        predicted_label = self.label[max_prob_idx]

        return predicted_label, probs, probs[max_prob_idx], max_prob_idx

    def save_plots(
        self, img_path: str, predicted_label: str, probs: list, max_prob_idx
    ):
        import matplotlib.pyplot as plt
        import uuid

        result_image_path = f"{settings.BASE_DIR}/media/temp/lungs/{uuid.uuid4()}.jpg"
        os.makedirs(os.path.dirname(result_image_path), exist_ok=True)
        stats_image_path = f"{settings.BASE_DIR}/media/temp/lungs/{uuid.uuid4()}.jpg"
        os.makedirs(os.path.dirname(stats_image_path), exist_ok=True)

        # Create image with predicted label
        original_img = Image.open(img_path)
        plt.imshow(original_img)
        plt.title(
            f"Predicted: {predicted_label} with probability: {probs[max_prob_idx]:.2f}"
        )
        plt.savefig(result_image_path)
        plt.close()

        # Create bar plot for probabilities
        plt.figure(figsize=(8, 6))
        bars = plt.barh(self.label, probs)
        plt.xlabel("Probability", fontsize=15)
        plt.title(f"Predicted: {predicted_label}", fontsize=15)

        ax = plt.gca()
        ax.bar_label(bars, fmt="%.2f")

        plt.savefig(stats_image_path)
        plt.close()

        return result_image_path, stats_image_path
