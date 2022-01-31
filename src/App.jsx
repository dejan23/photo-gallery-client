import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ImagesUpload from './components/ImagesUpload';
import ImagesList from './components/ImagesList';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="bg-blue-50 h-screen w-screen sm:px-8 md:px-16 sm:py-8">
      <Navbar />
      <main className="container mx-auto max-w-screen-lg">
        <Routes>
          <Route path="/" element={<ImagesList />} />
          <Route path="/upload" element={<ImagesUpload />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
