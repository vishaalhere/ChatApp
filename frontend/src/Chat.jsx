/* eslint-disable react/prop-types */

import { useState } from "react";
import Tabs from "./Tabs";
import ChatBox from "./ChatBox";

const Chat = ({
  messages,
  setMessages,
  input,
  setInput,
  sendMessage,
  isTyping,
  handleLogout,
  tabs,
  setTabs,
  selectedTab,
  setSelectedTab,
  setUsersCount,
}) => {
  const [showChat, setShowChat] = useState(false);

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
    setMessages(JSON.parse(localStorage.getItem(`${tabs[tabId].name}`)));
    localStorage.setItem("selectedTab", tabId);
    setShowChat(true);
  };

  const addUser = () => {
    const newTab = {
      id: tabs.length,
      name: `User${tabs.length}`,
      profilePic: "https://via.placeholder.com/40",
    };
    setTabs([...tabs, newTab]);
    // setSelectedTab(tabs.length); // Switch to the newly added tab
    localStorage.setItem(`${newTab.name}`, JSON.stringify([])); // Initialize empty chat for the new user
    setMessages([]);

    let newUsersCount = +localStorage.getItem("usersCount") + 1;
    setUsersCount(newUsersCount);
    localStorage.setItem("usersCount", newUsersCount);
  };

  return (
    <>
      {/* ==============Mobile Design===============  */}
      <div className="md:hidden flex flex-row h-screen">
        <Tabs
          className={` !w-screen ${showChat ? " !hidden " : ""}`}
          tabs={tabs}
          selectedTab={selectedTab}
          handleTabClick={handleTabClick}
          handleLogout={handleLogout}
          addUser={addUser}
        />
        <ChatBox
          className={` ${showChat ? "  " : " hidden "}`}
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isTyping={isTyping}
          tabs={tabs}
          selectedTab={selectedTab}
          setShowChat={setShowChat}
        />
      </div>

      {/* ==============Desktop/Laptops Design===============  */}
      <div className="md:flex hidden flex-row h-screen ">
        {/* Tabs */}
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          handleTabClick={handleTabClick}
          handleLogout={handleLogout}
          addUser={addUser}
        />

        {/* Chat */}
        <ChatBox
          messages={messages}
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          isTyping={isTyping}
          tabs={tabs}
          selectedTab={selectedTab}
          setShowChat={setShowChat}
        />
      </div>
    </>
  );
};

export default Chat;
