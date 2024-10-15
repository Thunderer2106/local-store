// SuccessPage.js

import React from 'react';

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="text-center p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-600">Thank you for your purchase. Your payment has been processed successfully.</p>
        {/* Additional success page content */}
      </div>
    </div>
  );
};

export default SuccessPage;
