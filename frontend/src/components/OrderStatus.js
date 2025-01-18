import React from 'react';

const statusMapping = {
  Pending: { percentage: 33, text: 'Pending' },
  Shipped: { percentage: 66, text: 'Shipped' },
  Delivered: { percentage: 100, text: 'Delivered' },
};

export default function OrderStatus({ status }) {
  const { percentage } = statusMapping[status];

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="relative bg-gray-200 h-2 rounded">
        <div
          className={`absolute top-0 left-0 h-full ${
            percentage === 100 ? 'bg-green-500' : 'bg-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Status Steps */}
      <div className="flex justify-between mt-2 text-sm">
        {Object.entries(statusMapping).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center">
            <span
              className={`mt-1 ${
                status === key || value.percentage <= percentage
                  ? 'text-blue-500'
                  : 'text-gray-500'
              }`}
            >
              {value.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
