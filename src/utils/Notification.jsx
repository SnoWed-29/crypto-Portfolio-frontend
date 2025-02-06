import React, { useState, useEffect } from 'react';

function Notification({ message, duration = 3000,color }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 ${color} text-white px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  );
}

export default Notification;