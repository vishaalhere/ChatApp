import { useState, useEffect, useRef } from "react";
import { login, logout, getCurrentUser, register } from "./authService";
import "./App.css"; // Import a CSS file for additional styling if needed
import LoginRegister from "./LoginRegister";
import Chat from "./Chat";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Add state for confirm password
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Add state for register mode
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Add state for typing indicator
  const [username, setUsername] = useState(""); // Add state for username
  const socketRef = useRef(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      socketRef.current = new WebSocket(
        `ws://${import.meta.env.VITE_SERVER_IP}:8080`
      );

      socketRef.current.onopen = () => {
        console.log("WebSocket connection established");
      };

      socketRef.current.onmessage = (event) => {
        const receivedMessage = event.data;
        setMessages((prev) => [
          ...prev,
          { text: receivedMessage, type: "received" },
        ]);
        setIsTyping(false); // Hide typing indicator when message is received
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket connection closed");
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
      setError("");
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await register(email, password, username);
      setIsRegistering(false);
      setError("");
    } catch (err) {
      setError("Failed to register. Please try again.");
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
    if (socketRef.current && input.trim() !== "") {
      setMessages((prev) => [...prev, { text: input, type: "sent" }]);
      setIsTyping(true); // Show typing indicator when sending a message
      socketRef.current.send(input);
      setInput("");
    }
  };

  if (!isLoggedIn) {
    return (
      <LoginRegister
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        username={username}
        setUsername={setUsername}
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        error={error}
      />
    );
  }

  return (
    <Chat
      messages={messages}
      input={input}
      setInput={setInput}
      sendMessage={sendMessage}
      isTyping={isTyping}
      handleLogout={handleLogout}
    />
  );
}

export default App;
