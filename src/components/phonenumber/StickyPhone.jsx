import React, { useState } from 'react';
import { PhoneIcon, XMarkIcon } from '@heroicons/react/24/solid';

const StickyPhone = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      onClick={!isExpanded ? toggleExpand : undefined} // Only toggle when not expanded
      className={`fixed bottom-2 right-2 text-black p-2 rounded-lg shadow-lg flex items-center space-x-2 cursor-pointer z-[9999] transition-all duration-300 ease-in-out ${
        isExpanded
          ? 'w-[40%] h-[40%] p-6 flex-col justify-center items-center'
          : 'w-auto'
      }`}
      style={{
        backgroundColor: isExpanded ? '#FF6347' : '#F87171', // Apply your colors
        minWidth: isExpanded ? '250px' : 'auto', // Ensure min width for smaller devices
      }}
    >
      {/* Close button when expanded */}
      {isExpanded && (
        <button
          onClick={toggleExpand}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700 transition duration-200"
          style={{ backgroundColor: '#F87171' }} // Color for the close button
        >
          <XMarkIcon className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      {/* Phone Icon */}
      <PhoneIcon className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />

      {/* Contact Info and Message */}
      <div className={`flex flex-col ${isExpanded ? 'items-center' : 'text-left'}`}>
        {/* Compact form */}
        {!isExpanded && (
          <>
            <span className="text-xs md:text-sm font-bold">Contact us</span>
            <span className="text-[10px] md:text-xs">Get the latest price</span>
            <a href="tel:+1234567890" className="text-[10px] md:text-xs font-bold underline">
            +91 9315214742
            </a>
          </>
        )}

        {/* Expanded content */}
        {isExpanded && (
          <div className="text-center">
            <p className="text-lg font-bold">Contact us</p>
            <p className="text-sm">Get the latest price</p>
            <a href="tel:+1234567890" className="text-md font-bold underline mt-2 block">
              +1 (234) 567-890
            </a>
            <p className="mt-4 text-lg font-bold">Owner: Sanjay Pokhriyal</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyPhone;
