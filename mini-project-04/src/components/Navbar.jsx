import React from 'react';
import "./Navbar.css";
import { MdOutlineLiveTv } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { PDFDownloadLink } from '@react-pdf/renderer';
import DownloadList from './DownloadList';
//import logo from "../assets/JAS-Movie-logo-removebg-preview.png";

const Navbar = ({ wishlist, removeMovie, watched, removeWatched }) => {

    const handleMovies = (movies) => {
        if (movies.length === 0) {
            return (
                <p className="text-sm">
                    No movies added yet
                </p>
            );
        }
    }



    return (
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">JAS Movies</a>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                    <MdOutlineLiveTv className='text-xl' />
                    {/*<span className="badge badge-sm indicator-item">0</span>*/}
                </div>
              </div>
                <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                <div className="card-body">
                  <span className="text-lg font-bold">Watchlist</span>
                    <ul className="text-sm max-h-40 overflow-y-auto">
                        {wishlist.map((movie) => (
                            <li key={movie.title} className="py-1 border-b flex justify-between items-center">
                                <span>{movie.title}</span>
                                <button onClick={() =>  removeMovie(movie.title)} className="btnD text-xs px-2 py-1">Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="card-actions">
                        <PDFDownloadLink
                            document={<DownloadList movies={wishlist} listTitle="My Watchlist" />}
                            fileName="watchlist.pdf"
                        >
                            {({ loading }) => (
                                <button className="btnD btn-primary btn-block" disabled={loading || wishlist.length === 0}>
                                    {loading ? 'Preparing...' : 'Download List'}
                                </button>
                            )}
                        </PDFDownloadLink>
                  </div>
                </div>
              </div>
            </div>

              <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                      <div className="indicator">
                          <svg xmlns="http://www.w3.org/2000/svg" stroke='currentColor' fill="currentColor" viewBox="0 0 576 512" className="h-[1em] w-[1em]"> <path d="M572.52 241.4C518.29 135.5 407.8 64 288 64S57.71 135.5 3.48 241.4a48.07 48.07 0 0 0 0 29.2C57.71 376.5 168.2 448 288 448s230.29-71.5 284.52-177.4a48.07 48.07 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 144 144 0 0 1-144 144zm0-240a96 96 0 1 0 96 96 96 96 0 0 0-96-96z"/> </svg>
                      </div>
                  </div>
                  <div
                      tabIndex={0}
                      className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                      <div className="card-body">
                          <span className="text-lg font-bold">Already watched</span>
                          <ul className="text-sm max-h-40 overflow-y-auto">
                              {watched.map((movie) => (
                                  <li key={movie.title} className="py-1 border-b flex justify-between items-center">
                                      <span>{movie.title}</span>
                                      <button onClick={() =>  removeWatched(movie.title)} className="btnD text-xs px-2 py-1">Remove</button>
                                  </li>
                              ))}
                          </ul>
                          <div className="card-actions">
                              <PDFDownloadLink
                                  document={<DownloadList movies={watched} listTitle="Already Watched" />}
                                  fileName="already-watched.pdf"
                              >
                                  {({ loading }) => (
                                      <button className="btnD btn-primary btn-block" disabled={loading || watched.length === 0}>
                                          {loading ? 'Preparing...' : 'Download List'}
                                      </button>
                                  )}
                              </PDFDownloadLink>
                          </div>
                      </div>
                  </div>
              </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <FaRegUser className='text-xl' />
                    {/*<img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                */}</div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                  </a>
                </li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
    );
}

export default Navbar;