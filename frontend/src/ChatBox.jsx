/* eslint-disable react/prop-types */

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
    <div className={`flex-grow flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-white">
        <div className="flex items-center">
            <div className="text-xl cursor-pointer" onClick={() => setShowChat(false)}>
            ← 
            </div>

          <img
            src={tabs[selectedTab]?.profilePic}
            alt="Profile"
            className="w-8 h-8 rounded-full mr-2"
          />
          <div>
            {tabs.length && (
              <div className="font-bold">{tabs[selectedTab].name}</div>
            )}
            <div className="text-sm text-green-500">
              {isTyping ? "Typing..." : "Online"}
            </div>
          </div>
        </div>
      </div>

      {/* Chat messages */}
      <div className="flex-grow flex flex-col overflow-y-auto p-4">
        {messages?.length > 0 &&
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-2 ${
                msg.type === "sent" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg py-2 px-4 shadow ${
                  msg.type === "sent"
                    ? "bg-blue-500 text-white self-end"
                    : "bg-gray-200 text-black"
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
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
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
  );
};

export default ChatBox;
