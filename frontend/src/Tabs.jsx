/* eslint-disable react/prop-types */
import React from 'react';

const Tabs = ({
    tabs,
    selectedTab,
    handleTabClick,
    handleLogout,
    addUser,
    className
}) => {
  return (
    <div className={`w-1/4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border-r border-gray-300 flex flex-col shadow-lg ${className}`}>
        <div className="p-4 border-b border-gray-300 bg-white flex justify-between items-center shadow-sm">
            <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-full shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
            >
                Logout
            </button>
            <button
                onClick={addUser}
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
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
                        className={`flex items-center p-4 my-2 mx-2 cursor-pointer rounded-lg shadow-sm transition duration-300 ease-in-out transform ${
                            selectedTab === tab.id ? "bg-blue-200 shadow-md" : "bg-white hover:shadow-md hover:scale-105"
                        }`}
                    >
                        <img
                            src={tab.profilePic}
                            alt="Profile"
                            className="w-10 h-10 rounded-full mr-3 shadow-inner"
                        />
                        <div>
                            <div className="font-bold text-gray-800">{tab.name}</div>
                            <div className="text-sm text-gray-500">Online</div>
                        </div>
                    </div>
                ))}
        </div>
    </div>
  )
}

export default Tabs
