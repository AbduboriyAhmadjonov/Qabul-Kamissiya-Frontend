// src/components/Common/UniversityCard.jsx
import React from 'react';

const UniversityCard = ({ university }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300">
      <img
        className="w-full h-48 object-cover"
        src={university.logoUrl || '/images/placeholder-logo.png'}
        alt={university.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-blue-800">
          {university.name}
        </div>
        <p className="text-gray-700 text-base">
          {university.description.substring(0, 100)}...
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {university.specializations.split(',')[0]}
        </span>
        {/* Add a button to view more */}
      </div>
    </div>
  );
};

export default UniversityCard;
