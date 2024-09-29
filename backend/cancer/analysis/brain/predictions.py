import numpy as np
import os

from PIL import Image

from django.conf import settings
from cancer.models import BrainCancerReport


class BrainAnalysis:
    def __init__(self, *args, **kwargs):
        self.model_path = f"{settings.BASE_DIR}/models/brain_tumor"

        self.class_dict = {"glioma": 0, "meningioma": 1, "notumor": 2, "pituitary": 3}
        self.classes = ["glioma", "meningioma", "notumor", "pituitary"]
        self.label = list(self.class_dict.keys())

        self.load_model()
        self.analyze(*args, **kwargs)

    def load_model(self):
        from keras.layers import TFSMLayer

        self.model = TFSMLayer(self.model_path, call_endpoint="serving_default")

    def analyze(self, img_path: str, report_id: str):
        predicted_label, probs, max_prob, max_prob_idx = self.predict(img_path)
        result_image_path, stats_image_path = self.save_plots(
            img_path, predicted_label, probs, max_prob_idx
        )

        report = BrainCancerReport.objects.get(id=report_id)
        report.result_image = "/media/" + result_image_path.split("media/")[-1]
        report.stats_image = "/media/" + stats_image_path.split("media/")[-1]
        report.probs = probs.tolist()
        report.predicted_label = predicted_label
        report.max_prob = max_prob
        report.status = BrainCancerReport.Status.COMPLETE
        report.save()

    def predict(self, img_path: str):
        img = Image.open(img_path)
        img = img.convert("RGB")
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
        import matplotlib

        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        import uuid

        # Define the paths for the saved images
        result_image_path = (
            f"{settings.BASE_DIR}/media/reports/brain/{uuid.uuid4()}.jpg"
        )
        os.makedirs(os.path.dirname(result_image_path), exist_ok=True)
        stats_image_path = f"{settings.BASE_DIR}/media/reports/brain/{uuid.uuid4()}.jpg"
        os.makedirs(os.path.dirname(stats_image_path), exist_ok=True)

        # Open the original image
        original_img = Image.open(img_path)

        # Plot and save the original image with predicted label
        plt.imshow(original_img)
        plt.title(
            f"Predicted: {predicted_label} with probability: {probs[max_prob_idx]:.2f}"
        )
        plt.axis("off")  # Hide axis for the image
        plt.savefig(result_image_path)
        plt.close()

        # Create bar plot for probabilities
        plt.figure(figsize=(8, 6))
        bars = plt.barh(self.label, probs)
        plt.xlabel("Probability", fontsize=15)
        plt.title(f"Predicted: {predicted_label}", fontsize=15)

        ax = plt.gca()
        ax.bar_label(bars, fmt="%.2f")

        # Save the bar plot
        plt.savefig(stats_image_path)
        plt.close()

        return result_image_path, stats_image_path
