import Sidebar from '@/components/ui/sidebar';
import { deleteNotification, getNotifications } from '@/services/backend';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // shadcn button
import { Check } from 'lucide-react'; // Import Check icon

const Notifications = () => {
  const [messages, setMessages] = useState<
    {
      id: string;
      message: string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchMessages() {
      const res = await getNotifications();
      setMessages(res);
      setLoading(false);
    }
    fetchMessages();
  }, []);

  const handleSeen = async (id: string) => {
    await deleteNotification(id);
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id)); // remove seen notification from list
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className='flex-1 p-6'>
        <h1 className='text-2xl font-bold mb-4'>Notifications</h1>

        {loading ? (
          <div className='flex justify-center'>
            <p>Loading...</p>
          </div>
        ) : messages.length > 0 ? (
          <div className='space-y-4'>
            {messages.map((message) => (
              <div
                key={message.id}
                className='flex items-center justify-between p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-200'
              >
                <p className='text-sm'>{message.message}</p>
                <Button
                  variant='outline'
                  onClick={() => handleSeen(message.id)}
                  className='p-1 rounded-full flex items-center'
                >
                  <Check className='h-4 w-4 mr-1' />
                  <span className='text-xs'>Mark as Seen</span>
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className='text-center text-gray-500'>No new notifications.</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
