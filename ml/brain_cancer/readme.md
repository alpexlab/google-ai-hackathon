# Brain Cancer Detection System

## Overview

This project focuses on brain cancer detection using deep learning techniques. We initially experimented with MobileNet and linear architectures to evaluate their performance in identifying brain cancer. After careful consideration, we chose to proceed with the linear architecture due to its faster inference speed and lower model load.

## Key Features

- **Efficient Model Selection**: Comparison between MobileNet and linear architectures for brain cancer detection.
- **Fast Inference Speed**: The linear architecture provides quicker predictions, making it suitable for real-time applications.
- **Low Model Load**: Reduced memory requirements allow for easier deployment in resource-constrained environments.

## Model Architecture

### Linear Architecture

The linear architecture is designed for optimal performance and resource efficiency. Below is a basic outline of the architecture:

```python
from keras.models import Sequential
from keras.layers import Dense, Flatten

# Defining the linear model
brain_cancer_model = Sequential()

# Adding layers to the linear architecture
brain_cancer_model.add(Flatten(input_shape=(128, 128, 3)))
brain_cancer_model.add(Dense(512, activation='relu'))
brain_cancer_model.add(Dense(256, activation='relu'))
brain_cancer_model.add(Dense(1, activation='sigmoid'))

# Model summary
brain_cancer_model.summary()
```

### MobileNet Architecture

*Optional: Include MobileNet architecture details here if applicable.*

## Usage

1. Clone this repository.
2. Install required dependencies.
3. Prepare your dataset of brain images.
4. Train the linear model for brain cancer detection.
5. Use the trained model for making predictions on new data.

## Results

- The linear architecture demonstrates superior speed and efficiency for brain cancer detection.
- *[Include any performance metrics or comparison results between MobileNet and linear architecture if available]*.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue for any suggestions or bug reports.

---

Feel free to reach out if you have any questions or suggestions!
