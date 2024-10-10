import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqItems = [
    {
      question: 'How can I access a demo of the application?',
      answer: (
        <>
          You can log in using the email: <b>guest@gmail.com</b> and password: <b>guest123</b>.
          Download sample images from{' '}
          <a
            className='text-blue-500 underline'
            href='https://drive.google.com/drive/folders/1W0aSYHvNeEFNJRDn4VgLAqZq0hG4LPos?usp=drive_link'
            target='_blank'
          >
            here
          </a>
        </>
      ),
    },
    {
      question: 'What problem does this application solve?',
      answer:
        'The application addresses the challenge of early cancer detection and accurate diagnosis. It helps healthcare providers identify high-risk patients, analyze MRI scans for cancer presence, and provides insights into tumor segmentation, improving detection rates and enhancing patient outcomes.',
    },
    {
      question: 'How do we approach solving this problem?',
      answer:
        'The application uses a set of trained algorithms to analyze input data and predict cancer-related outcomes.',
    },
    {
      question: 'What technologies are used in this application?',
      answer:
        'The tech stack include Gemini API, TensorFlow, OpenCV, Matplotlib, React, Django, and Docker',
    },
    {
      question: 'How accurate are the predictions?',
      answer:
        'The accuracy depends on the quality of the input data. The model has been trained with high-quality datasets to provide reliable results.',
    },
    {
      question: 'Can this model be integrated with other applications?',
      answer: 'Yes, the application provides an API for seamless integration with other systems.',
    },
    {
      question: 'How is GenAI helpful in solving this problem?',
      answer:
        'GenAI offers personalized treatment recommendations based on patient data. The GenAI chatbot provides real-time access to the latest research and treatment insights. A survival calculator powered by GenAI estimates patient survival rates based on specific parameters to aid prognosis and treatment decisions.',
    },
  ];

  return (
    <div className='flex'>
      <div className='w-[600px] m-6'>
        <h2 className='text-2xl font-semibold mb-4'>Frequently Asked Questions</h2>
        <Accordion type='multiple' className='space-y-4'>
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
