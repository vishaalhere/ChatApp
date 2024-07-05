/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';

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
  usersCount,
  setUsersCount,
}) => {

  const [showBackButton, setShowBackButton] = useState(false); // State to track whether to show back button

  // useEffect(() => {
  //   localStorage.setItem(`chats_${tabs[selectedTab].name}`, JSON.stringify(messages));
  // }, []); // Initialize tabs

  // useEffect(() => {
  //   // Load chats from localStorage if available
  //   const storedChats = localStorage.getItem(`chats_${tabs[selectedTab].name}`);
  //   if (storedChats) {
  //     setMessages(JSON.parse(storedChats));
  //   }
  // }, [selectedTab]); // Reload messages when selectedTab changes

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
    setMessages(JSON.parse(localStorage.getItem(`${tabs[tabId].name}`)));
    localStorage.setItem('selectedTab', tabId);
    setShowBackButton(true); // Show back button when a tab is clicked
  };

  const handleBackButtonClick = () => {
    setSelectedTab(0); // Go back to the first tab
    setShowBackButton(false); // Hide back button after going back
  };

  const addUser = () => {
    const newTab = {
      id: tabs.length,
      name: `User${tabs.length}`,
      profilePic: 'https://via.placeholder.com/40',
    };
    setTabs([...tabs, newTab]);
    // setSelectedTab(tabs.length); // Switch to the newly added tab
    localStorage.setItem(`${newTab.name}`, JSON.stringify([])); // Initialize empty chat for the new user
    setMessages([]);

    let newUsersCount = +localStorage.getItem('usersCount') + 1;
    setUsersCount(newUsersCount);
    localStorage.setItem('usersCount', newUsersCount);
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Tabs */}
      <div className="w-1/4 bg-gray-200 border-r border-gray-300 flex flex-col">
        <div className="p-4 border-b border-gray-300 bg-white flex justify-between">
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded"
          >
            Logout
          </button>
          <button
            onClick={addUser}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded"
          >
            +
          </button>
        </div>
        <div className="overflow-y-auto">
          {tabs?.length > 0 && tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center p-4 cursor-pointer ${
                selectedTab === tab.id ? 'bg-gray-300' : ''
              }`}
            >
              <img
                src={tab.profilePic}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <div className="font-bold">{tab.name}</div>
                <div className="text-sm text-gray-500">Online</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
          <div className="flex items-center">
            <img
              src={tabs[selectedTab]?.profilePic}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              {tabs.length && <div className="font-bold">{tabs[selectedTab].name}</div>}
              <div className="text-sm text-green-500">
                {isTyping ? 'Typing...' : 'Online'}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded"
          >
            Logout
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-grow flex flex-col overflow-y-auto p-4">
          {messages?.length > 0 &&
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 ${
                  msg.type === 'sent' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`rounded-lg py-2 px-4 shadow ${
                    msg.type === 'sent'
                      ? 'bg-blue-500 text-white self-end'
                      : 'bg-gray-200 text-black'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
        </div>

        {/* Input box */}
        <div className="flex p-4 border-t border-gray-300 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-grow p-2 border border-gray-300 rounded"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 ml-2 text-white bg-blue-500 rounded"
          >
            Send
          </button>
        </div>
      </div>

      {/* Back button for small screens */}
      {/* {showBackButton && (
        <button
          onClick={handleBackButtonClick}
          className="fixed top-4 left-4 text-blue-500 bg-white p-2 rounded-full shadow-md z-10 block lg:hidden"
        >
          {'< Back'}
        </button>
      )} */}
    </div>
  );
};

export default Chat;
