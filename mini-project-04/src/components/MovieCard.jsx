import { useState } from "react";
import { FaHeart, FaRegHeart, FaEye, FaRegEye } from "react-icons/fa";

// Displays a single movie card with poster, rating, badges, and wishlist/watched buttons
const MovieCard = ({ movie, isWishlisted, isWatched, onToggleWishlist, onToggleWatched }) => {
  const [imgError, setImgError] = useState(false);

  const starsOut5 = (movie.imdb_rating / 2).toFixed(1);
  const fullStars = Math.floor(movie.imdb_rating / 2);
  const hasHalf = (movie.imdb_rating / 2) - fullStars >= 0.3;

  const StarFull = () => (
    <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" className="h-[1em] w-[1em]" fill="white">
      <path d="M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z" />
    </svg>
  );

  const StarHalf = () => (
    <svg viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" className="h-[1em] w-[1em]" fill="white">
      <path d="M288 439.6l-130.9 68.7C152.2 510.8 147.1 512 142.2 512c-18.59 0-35.17-16.66-31.61-37.45l25.04-145.5L29.72 226.1C10.68 207.6 21.2 175.3 47.47 171.5l146.4-21.29l65.43-132.4c5.883-11.91 17.33-17.8 28.73-17.8c.0234 0-.0234 0 0 0L288 439.6z" />
    </svg>
  );

  return (
    <div className="shadow-[0px_4px_16px_0px_rgba(0,0,0,0.3)] h-[420px] group gap-[0.5em] rounded-[1.5em] relative flex justify-end flex-col p-[1.5em] z-[1] overflow-hidden cursor-pointer">

      {movie.image_url && !imgError ? (
        <>
          <img
            src={movie.image_url}
            alt={movie.title}
            className="absolute top-0 left-0 h-full w-full object-cover z-[0]"
            onError={() => setImgError(true)}
          />
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black via-black/70 to-transparent z-[0]" />
        </>
      ) : (
        <div className="absolute top-0 left-0 h-full w-full bg-[#111111]" />
      )}

      <div className="absolute top-3 right-3 z-[3] flex gap-2">
        <button
          className={`btn btn-circle btn-sm ${isWishlisted ? "btn-error" : "btn-ghost bg-black/40 hover:bg-error/80 text-white"}`}
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(movie); }}
        >
          {isWishlisted ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
        </button>
        <button
          className={`btn btn-circle btn-sm ${isWatched ? "btn-success" : "btn-ghost bg-black/40 hover:bg-success/80 text-white"}`}
          onClick={(e) => { e.stopPropagation(); onToggleWatched(movie); }}
        >
          {isWatched ? <FaEye size={14} /> : <FaRegEye size={14} />}
        </button>
      </div>

      <div className="container text-white z-[2] relative flex flex-col gap-[0.5em]">
        <div className="h-fit w-full">
          <h1
            className="text-[1.4em] tracking-[.2em] uppercase"
            style={{
              fontWeight: 900,
              WebkitTextFillColor: "transparent",
              WebkitTextStrokeWidth: "1px",
              textShadow: "0 0 7px #fff",
            }}
          >
            {movie.title}
          </h1>
          <p
            className="text-[1em]"
            style={{
              fontWeight: 900,
              WebkitTextFillColor: "transparent",
              WebkitTextStrokeWidth: "1px",
              textShadow: "0 0 7px #fff",
            }}
          >
            By {movie.director}
          </p>
        </div>

        <div className="flex items-center h-fit w-full gap-[1.5em]">
          <div className="w-fit h-fit flex gap-[0.5em]">
            {[...Array(5)].map((_, i) => {
              if (i < fullStars) return <StarFull key={i} />;
              if (i === fullStars && hasHalf) return <StarHalf key={i} />;
              return (
                <svg key={i} viewBox="0 0 576 512" xmlns="http://www.w3.org/2000/svg" className="h-[1em] w-[1em]" fill="white" opacity="0.3">
                  <path d="M316.7 17.8l65.43 132.4l146.4 21.29c26.27 3.796 36.79 36.09 17.75 54.59l-105.9 102.1l25.05 145.5c4.508 26.31-23.23 45.9-46.49 33.7L288 439.6l-130.9 68.7C133.8 520.5 106.1 500.9 110.6 474.6l25.05-145.5L29.72 226.1c-19.03-18.5-8.516-50.79 17.75-54.59l146.4-21.29l65.43-132.4C271.1-6.083 305-5.786 316.7 17.8z" />
                </svg>
              );
            })}
          </div>
          <div className="w-fit h-fit text-white text-[1.1em] font-light">
            <p>{starsOut5}/5 stars</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center h-fit w-fit gap-[0.5em]">
          <div className="border-2 border-white rounded-[0.5em] text-white text-[0.85em] font-normal px-[0.5em] py-[0.05em] hover:bg-white hover:text-[#222222] duration-300 cursor-pointer">
            <p>{movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1)}</p>
          </div>
          <div className="border-2 border-white rounded-[0.5em] text-white text-[0.85em] font-normal px-[0.5em] py-[0.05em] hover:bg-white hover:text-[#222222] duration-300 cursor-pointer">
            <p>{movie.releasing_year}</p>
          </div>
          <div className="border-2 border-white rounded-[0.5em] text-white text-[0.85em] font-normal px-[0.5em] py-[0.05em] hover:bg-white hover:text-[#222222] duration-300 cursor-pointer">
            <p>{movie.age_group}</p>
          </div>
          <div className="border-2 border-white rounded-[0.5em] text-white text-[0.85em] font-normal px-[0.5em] py-[0.05em] hover:bg-white hover:text-[#222222] duration-300 cursor-pointer">
            <p>{movie.language}</p>
          </div>
        </div>
      </div>

      <p className="block text-white font-light relative h-[0em] group-hover:h-[7em] leading-[1.2em] duration-500 overflow-hidden z-[2] text-[0.9em]">
        {movie.short_description}
        <br />
        <span className="text-white/60 text-[0.85em]">{movie.runtime} | Budget: {movie.budget}</span>
      </p>
    </div>
  );
};

export default MovieCard;