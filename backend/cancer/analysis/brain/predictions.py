import tensorflow as tf
from keras.layers import TFSMLayer

from django.conf import settings


class BrainAnalysis:
    def __init__(self):
        self.model_path = f"{settings.BASE_DIR}/models/brain_tumor"

        self.class_dict = {"glioma": 0, "meningioma": 1, "notumor": 2, "pituitary": 3}
        self.classes = ["glioma", "meningioma", "notumor", "pituitary"]

        self.load_model()

    def load_model(self):
        self.model = TFSMLayer(self.model_path, call_endpoint="serving_default")

    def predict(self, img_path: str):
        import numpy as np
        from PIL import Image

        label = list(self.class_dict.keys())

        img = Image.open(img_path)
        resized_img = img.resize((299, 299))
        img = np.asarray(resized_img)
        img = np.expand_dims(img, axis=0)
        img = img / 255.0

        predictions = self.model(img)

        probs = predictions["dense_1"].numpy()[0]

        max_prob_idx = np.argmax(probs)
        predicted_label = label[max_prob_idx]

        return predicted_label, probs[max_prob_idx]
