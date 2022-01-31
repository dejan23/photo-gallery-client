/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import { getRequest } from '../../utils/axios.util';

function ImagesList() {
  const [images, setImages] = useState([]);

  useEffect(async () => {
    const response = await getRequest('/images');
    setImages(response.data.images);
  }, []);

  return (
    <div className="p-5 flex flex-row justify-center relative">
      {images.length ? (
        images.map((el) => (
          <div key={el.src} className="m-5 cursor-pointer">
            <img
              className=" transition-transform hover:-translate-y-1 hover:scale-110"
              alt=""
              src={el.src}
            />
          </div>
        ))
      ) : (
        <div>No images</div>
      )}
    </div>
  );
}

export default ImagesList;
