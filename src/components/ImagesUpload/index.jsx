import React from 'react';
import UploadComponent from './uploadComponent';

function Images() {
  return (
    <div className="relative h-full flex flex-col bg-white shadow-xl rounded-md">
      <UploadComponent />
    </div>
  );
}

export default Images;
