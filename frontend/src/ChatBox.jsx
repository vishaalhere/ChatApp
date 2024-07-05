/* eslint-disable react/prop-types */
import React from 'react';

const ChatBox = ({
  messages,
  input,
  setInput,
  sendMessage,
  isTyping,
  tabs,
  selectedTab,
  className,
  setShowChat
}) => {
  return (
    <div className={`flex-grow flex flex-col bg-gradient-to-b from-white to-gray-100 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-[10px] border-b border-gray-300 bg-white shadow-md rounded-t-lg">
        <div className="flex items-center">
          <div className="text-xl cursor-pointer mr-3 transform transition duration-300 ease-in-out hover:scale-110" onClick={() => setShowChat(false)}>
            ←
          </div>
          <img
            src={tabs[selectedTab]?.profilePic}
            alt="Profile"
            className="w-10 h-10 rounded-full shadow-md mr-3"
          />
          <div>
            {tabs.length && (
              <div className="font-bold text-lg">{tabs[selectedTab].name}</div>
            )}
            <div className={`text-sm ${isTyping ? 'text-yellow-500' : 'text-green-500'}`}>
              {isTyping ? "Typing..." : "Online"}
            </div>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-grow flex flex-col overflow-y-auto p-4 space-y-3" 
      style={{ backgroundImage: `url(/chatbg.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {messages?.length > 0 &&
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.type === "sent" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg py-2 px-4 shadow-md max-w-xs ${
                  msg.type === "sent"
                    ? "bg-blue-500 text-white self-end animate-bounce-right"
                    : "bg-gray-200 text-black self-start animate-bounce-left"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
      </div>

      {/* Input box */}
      <div className="flex p-4 border-t border-gray-300 bg-white shadow-inner rounded-b-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
