export const documentationContent: {
  [key: string]: JSX.Element;
} = {
  frontend: (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Frontend</h2>
      <p className='text-gray-700'>
        The frontend of the application is built using <strong>React</strong> with{' '}
        <strong>TypeScript</strong>, styled using <strong>TailwindCSS</strong> and{' '}
        <strong>Shadcn</strong>. It offers a user-friendly interface for doctors to interact with
        the cancer detection and treatment tools.
      </p>
      <h3 className='text-xl font-semibold mt-4'>Setup Instructions</h3>
      <ol className='list-decimal list-inside text-gray-600'>
        <li>
          Clone the repository using{' '}
          <code>git clone https://github.com/alpexlab/google-ai-hackathon.git</code>
        </li>
        <li>
          Navigate to the frontend directory using <code>cd frontend</code>
        </li>
        <li>
          Copy the sample environment variables with <code>cp .env.sample .env</code>
        </li>
        <li>
          Run <code>make</code> to install dependencies and start the development server at{' '}
          <code>http://localhost:5173</code>
        </li>
      </ol>
    </div>
  ),
  backend: (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Backend</h2>
      <p className='text-gray-700'>
        The backend of the application is developed using <strong>Django</strong> with the{' '}
        <strong>Django REST Framework</strong>, and utilizes <strong>Postgres</strong> and{' '}
        <strong>Supabase</strong> for data management. It handles API requests and provides the
        necessary endpoints for the frontend to interact with the database and models.
      </p>
      <h3 className='text-xl font-semibold mt-4'>Setup Instructions</h3>
      <ol className='list-decimal list-inside text-gray-600'>
        <li>
          Clone the repository using{' '}
          <code>git clone https://github.com/alpexlab/google-ai-hackathon.git</code>
        </li>
        <li>
          Navigate to the backend directory using <code>cd backend</code>
        </li>
        <li>
          Copy the sample environment variables with <code>cp .env.sample .env</code>
        </li>
        <li>
          Run <code>make migrate</code> to apply database migrations
        </li>
        <li>
          Run <code>make createsuperuser</code> to create a superuser
        </li>
        <li>
          Run <code>make</code> to install dependencies and start the development server at{' '}
          <code>http://localhost:8000</code>
        </li>
      </ol>
    </div>
  ),
  genai: (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Gen AI</h2>
      <p className='text-gray-700'>
        The GenAI component of the application leverages Gemini to assist doctors by providing
        personalized treatment recommendations and survival rate estimates based on patient data.
        The chatbot interface allows for seamless interaction, enabling quick access to critical
        information.
      </p>
      <h3 className='text-xl font-semibold mt-4'>Gemini-Based RAG with PDF Parser</h3>
      <p className='text-gray-700'>
        This project incorporates the Gemini model to create a Retrieval-Augmented Generation (RAG)
        system, allowing users to interact with and extract information from PDF documents through a
        chatbot interface.
      </p>
      <h3 className='text-xl font-semibold mt-4'>Key Features</h3>
      <ul className='list-disc list-inside text-gray-600'>
        <li>Efficient PDF Document Loading</li>
        <li>Contextual Question Answering</li>
        <li>Chatbot Interface for User Interaction</li>
        <li>Concise Answers with a Friendly Closure</li>
      </ul>
      <h3 className='text-xl font-semibold mt-4'>Setup Instructions</h3>
      <ol className='list-decimal list-inside text-gray-600'>
        <li>Clone the repository.</li>
        <li>Set up your Google API key for accessing the Gemini model.</li>
        <li>Place your PDF documents in the specified directory.</li>
        <li>
          Run <code>python chatbot.py</code> to load PDFs and interact with the chatbot.
        </li>
        <li>
          Ask questions related to the content of the loaded PDFs and receive contextual answers.
        </li>
      </ol>
    </div>
  ),
  models: (
    <div>
      <div className='max-w-full overflow-x-hidden p-4'>
        <h2 className='text-2xl font-semibold mb-4'>Cancer Detection System</h2>
        <p className='text-gray-700'>
          This module contains implementations for cancer detection using deep learning techniques
          across various architectures. The project includes lung cancer prediction, brain cancer
          detection, and segmentation tasks, leveraging advanced models to achieve high accuracy and
          efficiency.
        </p>

        <h3 className='text-xl font-semibold mt-4'>Key Features</h3>
        <ul className='list-disc list-inside text-gray-600'>
          <li>
            <strong>Lung Cancer Prediction</strong>: Achieves <strong>99% accuracy</strong> on the
            test dataset using a robust CNN architecture designed for effective feature extraction
            and classification.
          </li>
          <li>
            <strong>Brain Cancer Detection</strong>: This component compares MobileNet and linear
            architectures. The linear architecture was selected due to its faster inference speed
            and lower model load, making it suitable for real-time applications.
          </li>
          <li>
            <strong>Segmentation Model</strong>: Implements advanced segmentation techniques for
            precise localization of cancerous areas in medical images, enhancing diagnostic
            capabilities.
          </li>
        </ul>

        <h3 className='text-xl font-semibold mt-4'>Performance Metrics</h3>
        <ul className='list-disc list-inside text-gray-600'>
          <li>
            <strong>Lung Cancer Prediction Accuracy</strong>: <strong>99%</strong>
          </li>
          <li>
            <strong>Brain Cancer Detection Accuracy</strong>: <strong>93%</strong>
          </li>
        </ul>

        <h3 className='text-xl font-semibold mt-4'>Usage</h3>
        <ol className='list-decimal list-inside text-gray-600'>
          <li>Clone this repository.</li>
          <li>Install required dependencies.</li>
          <li>Prepare your dataset of images for lung and brain cancer.</li>
          <li>Train the respective models for prediction and segmentation tasks.</li>
          <li>Use the trained models to make predictions on new data.</li>
          <li>
            Trained ML Models can be found{' '}
            <a href='https://drive.google.com/drive/folders/146msuaPwvn0FJyjuxS03WKCSPSH5cn3F?usp=sharing'>
              here
            </a>
            .
          </li>
        </ol>
      </div>

      <div className='max-w-full overflow-x-hidden p-4'>
        <h2 className='text-2xl font-semibold mt-4'>Brain Cancer Detection System</h2>
        <p>
          This project focuses on brain cancer detection using deep learning techniques. We
          initially experimented with MobileNet and linear architectures to evaluate their
          performance in identifying brain cancer. After careful consideration, we chose to proceed
          with the linear architecture due to its faster inference speed and lower model load.
        </p>

        <h3 className='text-xl font-semibold mt-4'>Key Features</h3>
        <ul className='list-disc list-inside text-gray-600'>
          <li>
            <strong>Efficient Model Selection</strong>: Comparison between MobileNet and linear
            architectures for brain cancer detection.
          </li>
          <li>
            <strong>Fast Inference Speed</strong>: The linear architecture provides quicker
            predictions, making it suitable for real-time applications.
          </li>
          <li>
            <strong>Low Model Load</strong>: Reduced memory requirements allow for easier deployment
            in resource-constrained environments.
          </li>
        </ul>

        <h3 className='text-xl font-semibold mt-4'>Model Architecture</h3>
        <h4>Linear Architecture</h4>
        <pre className='whitespace-pre-wrap break-words'>
          <code>
            from keras.models import Sequential from keras.layers import Dense, Flatten # Defining
            the linear model brain_cancer_model = Sequential() # Adding layers to the linear
            architecture brain_cancer_model.add(Flatten(input_shape=(128, 128, 3)))
            brain_cancer_model.add(Dense(512, activation='relu')) brain_cancer_model.add(Dense(256,
            activation='relu')) brain_cancer_model.add(Dense(1, activation='sigmoid')) # Model
            summary brain_cancer_model.summary()
          </code>
        </pre>

        <h4>MobileNet Architecture</h4>
        <p>*Optional: Include MobileNet architecture details here if applicable.*</p>

        <h3 className='text-xl font-semibold mt-4'>Usage</h3>
        <ol className='list-decimal list-inside text-gray-600'>
          <li>Clone this repository.</li>
          <li>Install required dependencies.</li>
          <li>Prepare your dataset of brain images.</li>
          <li>Train the linear model for brain cancer detection.</li>
          <li>Use the trained model for making predictions on new data.</li>
        </ol>

        <h3 className='text-xl font-semibold mt-4'>Results</h3>
        <ul className='list-disc list-inside text-gray-600'>
          <li>
            The linear architecture demonstrates superior speed and efficiency for brain cancer
            detection.
          </li>
          <li>
            *[Include any performance metrics or comparison results between MobileNet and linear
            architecture if available]*.
          </li>
        </ul>
      </div>

      <div className='max-w-full overflow-x-hidden p-4'>
        <h2 className='text-2xl font-semibold mt-4'>Breast Cancer Detection</h2>
        <p>
          This project implements a cancer detection system using deep learning techniques for both
          prediction and segmentation tasks. The system achieves high accuracy in identifying
          cancerous conditions through a well-defined architecture. The prediction model achieves an
          accuracy of <strong>93%</strong> on the test dataset.
        </p>

        <h3 className='text-xl font-semibold mt-4'>Key Features</h3>
        <ul className='list-disc list-inside text-gray-600'>
          <li>
            <strong>Prediction Model</strong>: A convolutional neural network (CNN) for binary
            classification to predict cancer presence.
          </li>
          <li>
            <strong>Segmentation Model</strong>: Utilizes advanced techniques to segment relevant
            areas in medical images.
          </li>
          <li>
            <strong>High Accuracy</strong>: Achieves <strong>93% accuracy</strong> for cancer
            prediction.
          </li>
        </ul>

        <h3 className='text-xl font-semibold mt-4'>Prediction Architecture</h3>
        <pre className='whitespace-pre-wrap break-words'>
          <code>
            from keras.models import Sequential from keras.layers import Conv2D, MaxPooling2D,
            Dropout, Flatten, Dense # Defining the base model cancer_model = Sequential() # First
            Layer cancer_model.add(Conv2D(filters=32, kernel_size=(3, 3), input_shape=(128, 128, 3),
            activation='relu')) cancer_model.add(MaxPooling2D(pool_size=(2, 2))) # Second Layer
            cancer_model.add(Conv2D(filters=64, kernel_size=(3, 3), padding='same',
            activation='relu')) cancer_model.add(MaxPooling2D(pool_size=(2, 2))) # Third Layer
            cancer_model.add(Conv2D(filters=128, kernel_size=(3, 3), padding='same',
            activation='relu')) cancer_model.add(MaxPooling2D(pool_size=(2, 2)))
            cancer_model.add(Dropout(0.4)) # Fourth Layer cancer_model.add(Conv2D(filters=256,
            kernel_size=(3, 3), padding='same', activation='relu'))
            cancer_model.add(MaxPooling2D(pool_size=(2, 2))) cancer_model.add(Dropout(0.2)) #
            Flattening the layers cancer_model.add(Flatten()) # Adding the dense layer
            cancer_model.add(Dense(256, activation='relu')) cancer_model.add(Dense(128,
            activation='relu')) cancer_model.add(Dense(1, activation='sigmoid'))
            cancer_model.summary()
          </code>
        </pre>

        <h3 className='text-xl font-semibold mt-4'>Segmentation Architecture</h3>
        <p>*Add the segmentation model architecture here if applicable.*</p>

        <h3 className='text-xl font-semibold mt-4'>Usage</h3>
        <ol className='list-decimal list-inside text-gray-600'>
          <li>Clone this repository.</li>
          <li>Install required dependencies.</li>
          <li>Prepare your dataset.</li>
          <li>Train the prediction and segmentation models.</li>
          <li>Use the trained models to make predictions on new data.</li>
        </ol>

        <h3 className='text-xl font-semibold mt-4'>Results</h3>
        <ul className='list-disc list-inside text-gray-600'>
          <li>
            <strong>Prediction Accuracy</strong>: Achieves <strong>93%</strong> accuracy on the test
            dataset.
          </li>
          <li>
            <strong>Segmentation Performance</strong>: *[Include segmentation performance metrics
            here if available]*.
          </li>
        </ul>
      </div>

      <div className='max-w-full overflow-x-hidden p-4'>
        <h2 className='text-2xl font-semibold mt-4'>Lung Cancer Detection Model</h2>
        <p>
          This section describes the architecture for the lung cancer detection model, which
          achieves an impressive accuracy of 99%.
        </p>

        <h3 className='text-xl font-semibold mt-4'>Key Features</h3>
        <ul className='list-disc list-inside text-gray-600'>
          <li>
            <strong>Deep Learning Architecture</strong>: Designed specifically for lung cancer
            detection using advanced techniques.
          </li>
          <li>
            <strong>High Accuracy</strong>: The model achieves an accuracy of <strong>99%</strong>{' '}
            on the test dataset.
          </li>
        </ul>

        <h3 className='text-xl font-semibold mt-4'>Model Architecture</h3>
        <pre className='whitespace-pre-wrap break-words'>
          <code>
            from keras.models import Sequential from keras.layers import Conv2D, MaxPooling2D,
            Dropout, Flatten, Dense # Defining the CNN model lung_cancer_model = Sequential() #
            First Layer lung_cancer_model.add(Conv2D(filters=32, kernel_size=(3, 3),
            input_shape=(128, 128, 3), activation='relu'))
            lung_cancer_model.add(MaxPooling2D(pool_size=(2, 2))) # Second Layer
            lung_cancer_model.add(Conv2D(filters=64, kernel_size=(3, 3), padding='same',
            activation='relu')) lung_cancer_model.add(MaxPooling2D(pool_size=(2, 2))) # Third Layer
            lung_cancer_model.add(Conv2D(filters=128, kernel_size=(3, 3), padding='same',
            activation='relu')) lung_cancer_model.add(MaxPooling2D(pool_size=(2, 2)))
            lung_cancer_model.add(Dropout(0.4)) # Flattening the layers
            lung_cancer_model.add(Flatten()) # Adding the dense layer
            lung_cancer_model.add(Dense(128, activation='relu')) lung_cancer_model.add(Dense(1,
            activation='sigmoid')) lung_cancer_model.summary()
          </code>
        </pre>

        <h3 className='text-xl font-semibold mt-4'>Usage</h3>
        <ol className='list-decimal list-inside text-gray-600'>
          <li>Clone this repository.</li>
          <li>Install required dependencies.</li>
          <li>Prepare your dataset of lung images.</li>
          <li>Train the lung cancer prediction model.</li>
          <li>Use the trained model to make predictions on new data.</li>
        </ol>

        <h3 className='text-xl font-semibold mt-4'>Results</h3>
        <ul className='list-disc list-inside text-gray-600'>
          <li>
            <strong>Accuracy</strong>: Achieves an impressive <strong>99% accuracy</strong> on the
            test dataset.
          </li>
          <li>
            <strong>Model Performance</strong>: *[Include performance metrics like precision,
            recall, etc. if available]*.
          </li>
        </ul>
      </div>
    </div>
  ),
};
