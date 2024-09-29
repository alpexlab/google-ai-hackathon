from PIL import Image
import numpy as np
import os

from django.conf import settings
from cancer.models import BrainCancerReport


class BrainSegmentation:
    def __init__(self, *args, **kwargs) -> None:
        self.model_path = f"{settings.BASE_DIR}/models/brain-segmentation"

        self.load_model()
        # self.analyze(*args, **kwargs)

    def load_model(self):
        from keras.layers import TFSMLayer

        self.model = TFSMLayer(self.model_path, call_endpoint="serving_default")

    def preprocess_image(self, image_path: str, target_size: tuple):
        pass

    def analyze(self, image_path: str, report_id: str):
        predicted_mask = self.predict(image_path)
        segmented_image_path = self.save_plots(image_path, predicted_mask)

        report = BrainCancerReport.objects.get(id=report_id)
        report.segmented_image = "/media/" + segmented_image_path.split("media/")[-1]

        report.save()

    def predict(self, image_path: str):
        pass

    def save_plots(self, image_path: str, predicted_mask):
        pass
