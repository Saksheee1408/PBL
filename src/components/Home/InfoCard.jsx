import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoCard = ({ iconName, title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="text-center">
        <FontAwesomeIcon
          icon={iconName}
          className="text-6xl text-teal-700 my-6"
        />
      </div>
      <div className="mt-4">
        <h2 className="text-3xl text-center font-bold text-teal-900 my-5 font-quicksand">
          {title}
        </h2>
        <p className="mt-2 my-6 text-gray-700 font-medium text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
