import React, { useEffect } from 'react';

const Message = ({ type, text, onRemove }) => {
  const bgColor = type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';

  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 3000);

    // Cleanup the timeout when the component is unmounted or the message is removed
    return () => clearTimeout(timer);
  }, [onRemove]);

  return (
    <div className={`mt-4 text-center p-2 rounded-lg ${bgColor}`}>
      {text}
    </div>
  );
};

export default Message;
