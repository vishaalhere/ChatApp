/* eslint-disable react/prop-types */

const Tabs = ({
    tabs,
    selectedTab,
    handleTabClick,
    handleLogout,
    addUser,
    className
}) => {
  return (
    <div className={`w-1/4 bg-gray-200 border-r border-gray-300 flex flex-col ${className}`}>
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
            {tabs?.length > 0 &&
              tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center p-4 cursor-pointer ${
                    selectedTab === tab.id ? "bg-gray-300" : ""
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
  )
}

export default Tabs