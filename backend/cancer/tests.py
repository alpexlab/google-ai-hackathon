import os
import requests
from django.test import TestCase
from django.conf import settings

class CancerImageDownloadTests(TestCase):
    def setUp(self):
        # Directory to save the downloaded images temporarily
        self.download_dir = os.path.join(settings.BASE_DIR, 'test_images')
        os.makedirs(self.download_dir, exist_ok=True)

    def set_image_links(self, img_links):
        """Sets the image links dynamically."""
        self.image_links = img_links

    def test_download_images(self):
        """Test downloading images for provided cancer types."""

        # Ensure that image links are set before running the test
        if not hasattr(self, 'image_links') or not self.image_links:
            self.fail("Image links not set. Use set_image_links to pass img_links.")

        for cancer_type, url in self.image_links.items():
            response = requests.get(url, stream=True)
            if response.status_code == 200:
                file_path = os.path.join(self.download_dir, f"{cancer_type}.jpg")
                with open(file_path, "wb") as file:
                    for chunk in response.iter_content(chunk_size=8192):
                        file.write(chunk)

                # Check that file was downloaded and exists
                self.assertTrue(os.path.exists(file_path))
                print(f"{cancer_type.capitalize()} image downloaded successfully.")
            else:
                self.fail(f"Failed to download {cancer_type} image. Status code: {response.status_code}")

    def tearDown(self):
        """Clean up the downloaded files after tests."""
        for file_name in os.listdir(self.download_dir):
            file_path = os.path.join(self.download_dir, file_name)
            if os.path.isfile(file_path):
                os.remove(file_path)
        os.rmdir(self.download_dir)


"""
We have to use it this way :-
from myapp.tests import CancerImageDownloadTests

# Instantiate the test case
test_case = CancerImageDownloadTests()

# Set up the links you want to test with
img_links = {
    "lung_cancer": "https://example.com/lung_cancer.jpg",
    "breast_cancer": "https://example.com/breast_cancer.jpg",
    "skin_cancer": "https://example.com/skin_cancer.jpg"
}

# Set the image links dynamically
test_case.set_image_links(img_links)

# Run the test method
test_case.test_download_images()

"""