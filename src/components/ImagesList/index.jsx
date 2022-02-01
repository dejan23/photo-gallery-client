/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { getRequest } from '../../utils/axios.util';

function ImagesList() {
  const [images, setImages] = useState([]);
  const [rollLength, setRollLength] = useState(0);
  let count = 0;

  useEffect(async () => {
    const response = await getRequest('/images');
    if (response?.data?.images) {
      response.data.images.map((el) => {
        count += el.heightCM;
        return count;
      });

      setRollLength(count);
      setImages(response.data.images);
    }
  }, []);

  const renderImages = () => {
    if (!images.length) <div>No photos</div>;

    return images.map((el) => (
      <li key={el.src} className="mt-5 mb-5">
        <img
          className="relative max-h-full min-w-full object-cover align-bottom"
          alt=""
          src={el.src}
        />
        <div>
          <div>Image name: {el.key}</div>
          <div>
            Image url: <a href={el.src}>Click here</a>
          </div>
          <div>
            Image size: {el.widthCM}x{el.heightCM}cm
          </div>
          <div>Created on: {dayjs(el.createdAt).format('YYYY-MM-DD')}</div>
        </div>
      </li>
    ));
  };

  return (
    <ul className="p-5 flex flex-col">
      <div>Photos in length: {rollLength}CM</div>
      {renderImages()}
    </ul>
  );
}

export default ImagesList;
