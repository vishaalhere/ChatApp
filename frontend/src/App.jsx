import { useState, useEffect, useRef } from "react";
import { login, logout, getCurrentUser, register } from "./authService";
import "./App.css"; // Import a CSS file for additional styling if needed
import LoginRegister from "./LoginRegister";
import Chat from "./Chat";
import { delay } from "./helper";

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
  const [usersCount, setUsersCount] = useState(0);
  const initialTabs = [
    { id: 0, name: "User0", profilePic: "https://via.placeholder.com/40" },
  ];

  const [tabs, setTabs] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {

      if (!localStorage.getItem("usersCount")) {
        localStorage.setItem("usersCount", 1);
      } else {
        let usersCountLocal = localStorage.getItem("usersCount");
        setUsersCount(+usersCountLocal);
      }
      let selectedTabLocal = 0;

      if (!localStorage.getItem("selectedTab")) {
        setSelectedTab(0);
        localStorage.setItem("selectedTab", 0);
      } else {
        selectedTabLocal = localStorage.getItem("selectedTab");
        setSelectedTab(+selectedTabLocal);
      }


      let usersCountLocal = localStorage.getItem("usersCount");
      let tabsLocal = [];
      if (!usersCountLocal) {
        tabsLocal = [...initialTabs];
        setTabs(initialTabs);
      } else {
        tabsLocal = Array.from({ length: usersCountLocal }, (v, i) => {
          return {
            id: i,
            name: `User${i}`,
            profilePic: "https://via.placeholder.com/40",
          };
        });

        setTabs(tabsLocal);
      }
      setIsLoggedIn(true);
      const storedMessages =
        JSON.parse(localStorage.getItem(tabsLocal[selectedTabLocal].name)) || [];
      setMessages(storedMessages);
    }

  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      socketRef.current = new WebSocket(
        `ws://${import.meta.env.VITE_SERVER_IP}:8080`
      );

      socketRef.current.onopen = () => {
        console.log("WebSocket connection established");
      };

      socketRef.current.onmessage = async (event) => {
        const receivedMessage = event.data;
        setIsTyping(true)
        await delay(400)
        saveMessage({ text: receivedMessage, type: "received" });
        setIsTyping(false);
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

  const saveMessage = (message) => {
    const selectedTabLocal = localStorage.getItem("selectedTab");
    let usersCountLocal = localStorage.getItem("usersCount");

    let tabsLocal = [];
      if (!usersCountLocal) {
        tabsLocal = [...initialTabs];
      } else {
        tabsLocal = Array.from({ length: usersCountLocal }, (v, i) => {
          return {
            id: i,
            name: `User${i}`,
            profilePic: "https://via.placeholder.com/40",
          };
        });
      }
    
    const storedMessages =
      JSON.parse(localStorage.getItem(tabsLocal[selectedTabLocal].name)) || [];
    const updatedMessages = [...storedMessages, message];
    localStorage.setItem(
      tabsLocal[selectedTabLocal].name,
      JSON.stringify(updatedMessages)
    );
    setMessages(updatedMessages);
  };

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
    setTabs([]);
  };

  const sendMessage = () => {
    if (socketRef.current && input.trim() !== "") {
      const message = { text: input, type: "sent" };
      saveMessage(message);
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
      setMessages={setMessages}
      tabs={tabs}
      setTabs={setTabs}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      usersCount={usersCount}
      setUsersCount={setUsersCount}
    />
  );
}

export default App;
