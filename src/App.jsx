import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ImagesUpload from './components/ImagesUpload';
import ImagesList from './components/ImagesList';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className=" px-8 py-8 sm:px-8 sm:py-8 md:py-0">
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
