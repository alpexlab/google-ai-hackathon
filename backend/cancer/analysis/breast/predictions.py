import torch
from torchvision import transforms
from torchvision.models import resnet18, densenet121
from PIL import Image

from django.conf import settings


class BreastAnalysis:
    def __init__(self):
        self.model_path = f"{settings.BASE_DIR}/models/breast.pth"
        self.model_arch = "resnet"

        self.load_model()

    def load_model(self):
        if self.model_arch == "resnet":
            model = resnet18()
        elif self.model_arch == "densenet":
            model = densenet121()
        else:
            raise ValueError("Unsupported model architecture")

        model.load_state_dict(
            torch.load(self.model_path, map_location=torch.device("cpu"))
        )
        model.eval()
        self.model = model

    def preprocess_image(self, image_path: str):
        transform = transforms.Compose(
            [
                transforms.Resize((224, 224)),
                transforms.ToTensor(),
                transforms.Normalize(
                    mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]
                ),
            ]
        )

        image = Image.open(image_path).convert("RGB")
        image = transform(image).unsqueeze(0)
        return image

    def predict(self, image_path: str):
        image_tensor = self.preprocess_image(image_path)

        with torch.no_grad():
            output = self.model(image_tensor)
            predicted_class = torch.argmax(output, dim=1)

        return predicted_class.item()
