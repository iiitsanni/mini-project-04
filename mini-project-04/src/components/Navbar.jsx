import React from 'react';
import "./Navbar.css";
import { MdOutlineLiveTv } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";



const Navbar = () => {
    return (
        <section className='navbar'>
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
                  <span className="text-info">Subtotal: 0 Movies</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">Download List</button>
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
                <li><a>Already watched</a></li>
                <li><a>Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
        </section>
    );
}

export default Navbar;