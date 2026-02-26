import React from 'react';
import "./Navbar.css";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
//import logo from "../assets/JAS-Movie-logo-removebg-preview.png";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DownloadList from "./DownloadList";

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
        <>
        <div className="drawer drawer-end">
            <input id="wishlist-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className="navbar bg-base-100 shadow-sm">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">JAS Movies</a>
                    </div>

                    <div className="flex-none">
                        <label
                            htmlFor="wishlist-drawer"
                            className="btn btn-ghost btn-circle drawer-button"
                        >
                            <FaRegHeart className='text-xl' />
                        </label>
                        <label
                            htmlFor="watched-drawer"
                            className="btn btn-ghost btn-circle"
                        >
                                <svg xmlns="http://www.w3.org/2000/svg" stroke='currentColor' fill="currentColor" viewBox="0 0 576 512" className="h-[1em] w-[1em]"> <path d="M572.52 241.4C518.29 135.5 407.8 64 288 64S57.71 135.5 3.48 241.4a48.07 48.07 0 0 0 0 29.2C57.71 376.5 168.2 448 288 448s230.29-71.5 284.52-177.4a48.07 48.07 0 0 0 0-29.2zM288 400a144 144 0 1 1 144-144 144 144 0 0 1-144 144zm0-240a96 96 0 1 0 96 96 96 96 0 0 0-96-96z"/> </svg>
                        </label>
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
                </div>
    <div className="drawer-side z-50">
        <label htmlFor="wishlist-drawer"
            className="drawer-overlay"
        > </label>

        <div className="menu bg-base-200 min-h-full w-80 p-6 flex flex-col">
            <h2 className="text-xl font-bold mb-4 flex flex-row justify-between items-center border-b pb-2">
                Watchlist
                <label htmlFor="wishlist-drawer" className="cursor-pointer">
                    <IoIosClose />
                </label>
            </h2>


            <ul className="space-y-2 flex-grow">
                {wishlist.map((movie) => (
                    <li
                        key={movie.title}
                        className="flex flex-row justify-between items-center border-b pb-2"
                    >
                        <span>{movie.title}</span>
                        <button
                            onClick={() =>
                                removeMovie(movie.title)
                            }
                            className="btnD text-xs px-2 py-1"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <div className="mt-auto">
                <PDFDownloadLink
                    document={<DownloadList movies={wishlist} listTitle="My Wishlist" />}
                    fileName="MyWishlist.pdf"
                    className="btnD btn-primary w-full text-center "
                >
                    {({ loading }) =>
                        loading ? "Generating PDF..." : "Download List"
                    }
                </PDFDownloadLink>
            </div>
        </div>
    </div>
        </div>
        <div className="drawer drawer-end">
            <input id="watched-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content"></div>

        <div className="drawer-side">
            <label htmlFor="watched-drawer" className="drawer-overlay"></label>

            <div className="menu bg-base-200 min-h-full w-80 p-6 flex flex-col ">
                <h2 className="text-xl font-bold mb-4 flex flex-row justify-between items-center border-b pb-2">Already Watched <label htmlFor="watched-drawer" className="cursor-pointer">
                    <IoIosClose />
                </label></h2>

                <ul className="space-y-2 flex-grow">
                    {watched.map((movie) => (
                        <li
                            key={movie.title}
                            className="flex flex-row justify-between items-center border-b pb-2"
                        >
                            <span>{movie.title}</span>
                            <button
                                onClick={() => removeWatched(movie.title)}
                                className="btnD text-xs px-2 py-1"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <PDFDownloadLink
                    document={<DownloadList movies={watched} listTitle="My Already watched List" />}
                    fileName="MyAlreadyWatched.pdf"
                    className="btnD btn-primary w-full text-center"
                >
                    {({ loading }) =>
                        loading ? "Generating PDF..." : "Download List"
                    }
                </PDFDownloadLink>
            </div>
        </div>
        </div>
</>
);};
export default Navbar;