import { useState, useEffect, useRef } from 'react';
import { login, logout, getCurrentUser } from './authService';
import './App.css'; // Import a CSS file for additional styling if needed

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false); // Add state for typing indicator
  const socketRef = useRef(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      socketRef.current = new WebSocket('ws://localhost:8080');

      socketRef.current.onopen = () => {
        console.log('WebSocket connection established');
      };

      socketRef.current.onmessage = (event) => {
        const receivedMessage = event.data;
        setMessages((prev) => [...prev, { text: receivedMessage, type: 'received' }]);
        setIsTyping(false); // Hide typing indicator when message is received
      };

      socketRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      socketRef.current.onclose = () => {
        console.log('WebSocket connection closed');
      };
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [isLoggedIn]);

  const handleLogin = async () => {
    try {
      await login(email, password);
      setIsLoggedIn(true);
      setError('');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setMessages([]);
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  const sendMessage = () => {
    if (socketRef.current && input.trim() !== '') {
      setMessages((prev) => [...prev, { text: input, type: 'sent' }]);
      setIsTyping(true); // Show typing indicator when sending a message
      socketRef.current.send(input);
      setInput('');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-full max-w-xs">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 mb-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleLogin}
            className="w-full px-3 py-2 text-white bg-blue-500 rounded"
          >
            Login
          </button>
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex-grow overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 mb-2 rounded shadow ${msg.type === 'sent' ? 'bg-blue-500 text-white self-end' : 'bg-white text-black'}`}
          >
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="p-2 mb-2 text-gray-500">Server is typing...</div>
        )}
      </div>
      <div className="flex mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-grow p-2 border border-gray-300 rounded"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 ml-2 text-white bg-blue-500 rounded"
        >
          Send
        </button>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 mt-2 text-white bg-red-500 rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default App;
