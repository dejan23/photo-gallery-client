import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav className="relative flex flex-wrap items-center px-2 py-3 bg-lightBlue-500 mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            to="/"
          >
            Photo Gallery
          </Link>
          <button
            className=" cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <i className="fas fa-bars" />
          </button>
        </div>
        <div
          className={`lg:flex flex-grow items-center ${
            navbarOpen ? ' flex' : ' hidden'
          }`}
        >
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
            <li className="nav-item">
              <Link
                className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75"
                to="/upload"
              >
                <i className="fas fa-upload text-lg leading-lg  opacity-75" />
                <span className="ml-2">Upload</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
