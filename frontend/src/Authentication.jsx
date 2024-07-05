import { useState, useEffect, useRef } from 'react';
import 'tailwindcss/tailwind.css';

function Chat() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket(`ws://${import.meta.env.VITE_SERVER_IP}:8080`);

    socketRef.current.onmessage = (event) => {
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages, event.data];
        localStorage.setItem('chatMessages', JSON.stringify(newMessages));
        return newMessages;
      });
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && input.trim()) {
      socketRef.current.send(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-gray-50">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg flex flex-col">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Chat Room</h2>
        </div>
        <div className="flex-grow h-64 overflow-y-auto mb-4 p-2 border rounded-lg bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-2 rounded-md ${index % 2 === 0 ? 'bg-blue-100' : 'bg-green-100'}`}
            >
              {msg}
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
