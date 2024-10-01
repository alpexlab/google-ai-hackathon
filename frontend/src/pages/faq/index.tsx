import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

const FAQ = () => {
  const faqItems = [
    {
      question: 'What is the purpose of this application?',
      answer:
        'This application is designed to provide predictions for cancer reports using a machine learning model.',
    },
    {
      question: 'How does the machine learning model work?',
      answer:
        'The model uses a set of trained algorithms to analyze input data and predict cancer-related outcomes.',
    },
    {
      question: 'Is the data used secure?',
      answer: 'Yes, all input data is encrypted and handled securely to ensure user privacy.',
    },
    {
      question: 'How accurate are the predictions?',
      answer:
        'Accuracy depends on the quality of the input data. The model has been trained with high-quality datasets to provide reliable results.',
    },
    {
      question: 'Can I integrate this model with other applications?',
      answer: 'Yes, the application provides an API for seamless integration with other systems.',
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
