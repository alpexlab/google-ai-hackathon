import numpy as np
from PIL import Image
import os

from django.conf import settings
from cancer.models import BreastCancerReport, Notifications

from cancer.analysis.breast.segmentation import BreastSegmentation


class BreastAnalysis:
    def __init__(self, *args, **kwargs) -> None:
        self.model_path = f"{settings.BASE_DIR}/models/breast"

        self.load_model()
        self.analyze(*args, **kwargs)

    def load_model(self):
        from keras.layers import TFSMLayer

        self.model = TFSMLayer(self.model_path, call_endpoint="serving_default")

    def analyze(self, image_path: str, report_id: str, doctor: str):
        prediction, pred_value = self.predict(image_path)
        result_image_path, stats_image_path = self.save_plots(
            image_path, prediction, pred_value
        )
        BreastSegmentation(image_path, report_id)

        report = BreastCancerReport.objects.get(id=report_id)
        report.result_image = "/media/" + result_image_path.split("media/")[-1]
        report.stats_image = "/media/" + stats_image_path.split("media/")[-1]

        report.status = BreastCancerReport.Status.COMPLETE
        report.save()

        Notifications.objects.create(
            doctor=doctor,
            message=f"Breast cancer analysis for {report.cancer.patient.name} (Registration No: {report.cancer.patient.id}) is completed. The report suggests {'predicted_label'} with a probability of {'max_prob:.2f'}. Please check the report for more details",
        )

    def predict(self, image_path: str):
        import cv2

        img = cv2.imread(image_path)
        img = cv2.resize(img, (128, 128))
        img = np.array(img) / 255.0

        img = np.expand_dims(img, axis=0)
        pred = self.model(img)

        pred_value = pred["dense_2"].numpy()[0][0]

        if pred_value > 0.5:
            prediction = "Malignant (Cancer)"
        else:
            prediction = "Benign (No Cancer)"

        return prediction, pred_value

    def save_plots(self, image_path: str, prediction: str, pred_value: float):
        import matplotlib

        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        import uuid

        result_image_path = (
            f"{settings.BASE_DIR}/media/reports/breast/{uuid.uuid4()}.jpg"
        )
        os.makedirs(os.path.dirname(result_image_path), exist_ok=True)
        stats_image_path = (
            f"{settings.BASE_DIR}/media/reports/breast/{uuid.uuid4()}.jpg"
        )
        os.makedirs(os.path.dirname(stats_image_path), exist_ok=True)

        original_img = Image.open(image_path)
        plt.imshow(original_img)
        plt.title(f"Predicted: {prediction} with probability: {pred_value:.2f}")
        plt.savefig(result_image_path)
        plt.close()

        # Now save an image of histogram for the 2 classes
        plt.bar(["Benign", "Malignant"], [1 - pred_value, pred_value])
        plt.ylabel("Probability")
        plt.title("Prediction")
        plt.savefig(stats_image_path)
        plt.show()
        plt.close()

        plt.imshow(cv2.cvtColor(cv2.imread(image_path), cv2.COLOR_BGR2RGB))
        plt.title(prediction)
        plt.axis("off")
        plt.show()

        return result_image_path, stats_image_path
