export const documentationContent: {
  [key: string]: JSX.Element;
} = {
  frontend: (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Frontend</h2>
      <p className='text-gray-700'>
        Details on the frontend architecture, technologies used, and how to interact with the
        Canceralyze application.
      </p>
    </div>
  ),
  models: (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Deep Learning Models</h2>
      <p className='text-gray-700'>
        Information about the deep learning models used in Canceralyze for cancer detection and
        segmentation
      </p>
    </div>
  ),
  backend: (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Backend</h2>
      <p className='text-gray-700'>
        Details on the backend architecture, APIs, and cloud infrastructure used in Canceralyze.
      </p>
    </div>
  ),
  genai: (
    <div>
      <h2 className='text-2xl font-semibold mb-4'>Gen AI</h2>
      <p className='text-gray-700'>
        Learn more about GenAI, the AI-powered chatbot that provides personalized treatment
        recommendations and survival rate estimates.
      </p>
    </div>
  ),
};
