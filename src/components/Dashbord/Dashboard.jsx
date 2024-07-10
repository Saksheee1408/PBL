import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDonate, faHandsHelping, faHistory, faInfoCircle, faPhone, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center md:pt-24 px-4 pb-10 sm:px-6 lg:px-8 pt-24">
      <h1 className="text-4xl text-primary-color font-bold mb-8">My Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full md:max-w-3xl">
        <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-md flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:bg-primary-color">
          <FontAwesomeIcon icon={faDonate} className="text-white text-4xl md:text-6xl mb-4" />
          <h2 className="text-white text-lg md:text-xl font-semibold">Donate</h2>
        </div>
        <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-md flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:bg-primary-color">
          <FontAwesomeIcon icon={faHandsHelping} className="text-white text-4xl md:text-6xl mb-4" />
          <h2 className="text-white text-lg md:text-xl font-semibold">Receive</h2>
        </div>
        <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-md flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:bg-primary-color">
          <FontAwesomeIcon icon={faHistory} className="text-white text-4xl md:text-6xl mb-4" />
          <h2 className="text-white text-lg md:text-xl font-semibold">History</h2>
        </div>
        <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-md flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:bg-primary-color">
          <FontAwesomeIcon icon={faInfoCircle} className="text-white text-4xl md:text-6xl mb-4" />
          <h2 className="text-white text-lg md:text-xl font-semibold">About Us</h2>
        </div>
        <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-md flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:bg-primary-color">
          <FontAwesomeIcon icon={faPhone} className="text-white text-4xl md:text-6xl mb-4" />
          <h2 className="text-white text-lg md:text-xl font-semibold">Contact Us</h2>
        </div>
        <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-md flex flex-col items-center transform transition-all duration-300 hover:scale-105 hover:bg-primary-color">
          <FontAwesomeIcon icon={faSignOutAlt} className="text-white text-4xl md:text-6xl mb-4" />
          <h2 className="text-white text-lg md:text-xl font-semibold">Log Out</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
