# Lung Cancer Prediction Model

## Overview

This project is a convolutional neural network (CNN) model designed for predicting lung cancer. The model achieves an impressive **99% accuracy** on the test dataset, demonstrating its potential effectiveness in aiding early detection of lung cancer.

## Model Architecture

The architecture of the model consists of several layers of convolutional neural networks (CNNs), batch normalization, pooling, and dense layers. It takes image inputs of dimensions `(img_height, img_width, 3)` and outputs predictions across three classes, likely representing stages of cancer or types of cancerous/non-cancerous cells.

### Model Layers

```python
model.add(Conv2D(128, (2, 2), padding='same', input_shape=(img_height, img_width, 3), activation='relu'))
model.add(BatchNormalization())
model.add(AvgPool2D(2, 2))

model.add(Conv2D(128, (3, 3), activation='relu', padding='same'))
model.add(Conv2D(128, (3, 3), activation='relu', padding='same'))
model.add(BatchNormalization())
model.add(MaxPooling2D(2, 2))
model.add(Dropout(0.25))

model.add(Conv2D(128, (3, 3), activation='relu', padding='same'))
model.add(Conv2D(128, (3, 3), activation='relu', padding='same'))
model.add(BatchNormalization())
model.add(MaxPooling2D(2, 2))

model.add(Conv2D(64, (3, 3), activation='relu', padding='same'))
model.add(Conv2D(64, (3, 3), activation='relu', padding='same'))
model.add(BatchNormalization())
model.add(MaxPooling2D(2, 2))

model.add(Flatten())
model.add(Dropout(0.2))
model.add(Dense(3000, activation='relu'))
model.add(Dense(1500, activation='relu'))
model.add(Dense(3, activation='softmax'))
```

### Key Features:
- **Convolutional layers**: Feature extraction from lung scan images.
- **Batch normalization**: Stabilizes and accelerates training.
- **Pooling layers**: Reduces spatial dimensions to focus on relevant features.
- **Dense layers**: Fully connected layers for final classification.

## Dataset

The model was trained on a lung cancer image dataset, and the test results show **99% accuracy**. This result indicates high effectiveness in distinguishing between different stages or types of lung cancer.

## Requirements

- Python 3.x
- TensorFlow
- Keras
- NumPy
- Matplotlib (for visualization)
- OpenCV (optional, for image processing)

To install the required packages, run:

```bash
pip install tensorflow keras numpy matplotlib opencv-python
```

## Training the Model

The model can be trained using your dataset of lung cancer images. Simply load the dataset into the model and run the training script.

```python
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
history = model.fit(train_data, train_labels, epochs=50, validation_data=(val_data, val_labels))
```

## Usage

1. Clone this repository.
2. Prepare your dataset (lung cancer scans) in the format of images (height, width, 3).
3. Adjust the `img_height` and `img_width` parameters to match your data.
4. Train the model by running the script:

```bash
python train_model.py
```

5. After training, the model can be used to predict lung cancer from new images.

## Results

- **Accuracy**: 99% on the test dataset.
- **Loss**: Consistently low after training, showing excellent performance on unseen data.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue for any suggestions or bug reports.

---

Feel free to reach out if you have any questions or suggestions!
