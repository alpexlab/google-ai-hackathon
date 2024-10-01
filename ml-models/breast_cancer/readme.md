# Cancer Detection System

## Overview

This project implements a cancer detection system using deep learning techniques for both prediction and segmentation tasks. The system achieves high accuracy in identifying cancerous conditions through a well-defined architecture. The prediction model achieves an accuracy of **93%** on the test dataset.

## Key Features

- **Prediction Model**: A convolutional neural network (CNN) for binary classification to predict cancer presence.
- **Segmentation Model**: Utilizes advanced techniques to segment relevant areas in medical images.
- **High Accuracy**: Achieves **93% accuracy** for cancer prediction.

## Prediction Architecture

The architecture for the prediction model is as follows:

```python
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D, Dropout, Flatten, Dense

# Defining the base model
cancer_model = Sequential()

# First Layer
cancer_model.add(Conv2D(filters=32, kernel_size=(3, 3), input_shape=(128, 128, 3), activation='relu'))
cancer_model.add(MaxPooling2D(pool_size=(2, 2)))

# Second Layer
cancer_model.add(Conv2D(filters=64, kernel_size=(3, 3), padding='same', activation='relu'))
cancer_model.add(MaxPooling2D(pool_size=(2, 2)))

# Third Layer
cancer_model.add(Conv2D(filters=128, kernel_size=(3, 3), padding='same', activation='relu'))
cancer_model.add(MaxPooling2D(pool_size=(2, 2)))
cancer_model.add(Dropout(0.4))

# Fourth Layer
cancer_model.add(Conv2D(filters=256, kernel_size=(3, 3), padding='same', activation='relu'))
cancer_model.add(MaxPooling2D(pool_size=(2, 2)))
cancer_model.add(Dropout(0.2))

# Flattening the layers
cancer_model.add(Flatten())

# Adding the dense layer
cancer_model.add(Dense(256, activation='relu'))
cancer_model.add(Dense(128, activation='relu'))
cancer_model.add(Dense(1, activation='sigmoid'))

cancer_model.summary()
```

## Segmentation Architecture

*Add the segmentation model architecture here if applicable.*

## Usage

1. Clone this repository.
2. Install required dependencies.
3. Prepare your dataset.
4. Train the prediction and segmentation models.
5. Use the trained models to make predictions on new data.

## Results

- **Prediction Accuracy**: Achieves **93% accuracy** in predicting cancer presence based on input images.
- **Segmentation Performance**: *[Include performance metrics for segmentation if available]*.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue for any suggestions or bug reports.

---

Feel free to reach out if you have any questions or suggestions!
