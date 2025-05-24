import { useEffect, useState } from 'react';
import NotificationService from '../services/NotificationService';

const Notification = () => {
  const [notifications, setNotifications] = useState<
    { message: string; type: string }[]
  >([]);

  useEffect(() => {
    const unsubscribe = NotificationService.subscribe((notification) => {
      setNotifications((prev) => [...prev, notification]);

      setTimeout(() => {
        setNotifications((prev) => prev.slice(1));
      }, 3000);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all">
      {notifications.map((n, i) => (
        <div
          key={i}
          className={`p-4 rounded-md mb-2 border transition-all opacity-0 transform translate-y-4 animate-notify ${n.type === 'success' ? 'bg-green-100 text-green-900 border-green-900' : n.type === 'error' ? 'bg-red-100 text-red-900 border-red-900' : 'bg-blue-100 text-blue-900 border-blue-900'}`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
