import { useState } from 'react';
import Sidebar from '@/components/ui/sidebar';
import airplane from '@/assets/airplane.svg';
import spinner from '@/assets/spinner.gif';
import { getChatResponse } from '@/services/backend';

type _MESSAGE = {
  sender: 'user' | 'bot';
  content: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<_MESSAGE[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSendMessage = async () => {
    const question = input.trim();
    setLoading(true);
    setInput('');

    if (!question) return;

    const newMessage: _MESSAGE = { sender: 'user', content: question };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    let response = 'Gemini is not available right now. Please try again later';
    try {
      setMessages((prevMessages) => [...prevMessages, { sender: 'bot', content: 'Thinking...' }]);
      response = await getChatResponse(question);
    } catch (error) {
      console.error('Error:', error);
    }

    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      if (lastMessage.sender === 'bot' && lastMessage.content === 'Thinking...') {
        prevMessages.pop();
      }
      return [...prevMessages, { sender: 'bot', content: response }];
    });

    setLoading(false);
  };

  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      <div className='w-full flex flex-col flex-1'>
        {/* Header */}
        <div className='bg-white text-gray-800 p-4 shadow-md flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Chat</h1>
          <span className='text-sm italic text-gray-500'>Powered by Gemini</span>
        </div>

        {/* Chat Window */}
        <div className='flex-grow bg-white m-4 flex flex-col rounded-lg shadow-lg overflow-hidden'>
          <div className='p-4 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded scrollbar-track-rounded'>
            {messages.length === 0 ? (
              // Display card when there are no messages
              <div className='flex justify-center items-center h-full'>
                <div className='bg-white shadow-lg rounded-lg p-6 text-center border border-gray-300'>
                  <h2 className='text-xl font-semibold text-blue-600'>Learn About Cancer</h2>
                  <p className='mt-3 text-gray-700'>
                    Here are some resources to help you understand cancer better:
                  </p>
                  <ul className='mt-4 space-y-3 text-left'>
                    <li className='flex items-center'>
                      <div className='w-2.5 h-2.5 bg-blue-500 rounded-full mr-2'></div>
                      Early detection is key!
                    </li>
                    <li className='flex items-center'>
                      <div className='w-2.5 h-2.5 bg-blue-500 rounded-full mr-2'></div>
                      Symptoms to watch for.
                    </li>
                    <li className='flex items-center'>
                      <div className='w-2.5 h-2.5 bg-blue-500 rounded-full mr-2'></div>
                      Lifestyle changes that can help.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} my-2`}
                >
                  <div
                    className={`rounded-md p-1 px-4 max-w-xs ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                    } shadow-md relative`}
                    style={{ wordWrap: 'break-word' }}
                  >
                    <p className='text-sm leading-relaxed'>{message.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className='p-4 bg-white border-t flex items-center gap-2'>
            <input
              className='flex-grow border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out'
              type='text'
              value={input}
              placeholder='Type your message...'
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (!loading) handleSendMessage();
                }
              }}
            />
            <button
              className='bg-green-400 hover:bg-green-500 text-white rounded-lg px-4 py-2 transition duration-200 ease-in-out shadow-md transform hover:scale-105'
              onClick={handleSendMessage}
              disabled={loading}
            >
              {loading ? (
                <img className='w-[20px]' src={spinner} alt='Loading...' />
              ) : (
                <img src={airplane} alt='send' className='w-6 h-6' />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
