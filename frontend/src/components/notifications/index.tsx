import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotificationIcon = ({ count }: { count: number }) => {
  let count_str = count.toString();
  if (count > 9) {
    count_str = '9+';
  }
  return (
    <div className='relative inline-block'>
      <Link to='/notifications'>
        <Bell className='w-8 h-8 text-white' />
      </Link>
      {count > 0 && (
        <span className='absolute top-0 right-0 rounded-full bg-red-600 text-white text-xs font-bold px-1'>
          {count_str}
        </span>
      )}
    </div>
  );
};

export default NotificationIcon;
