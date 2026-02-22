import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [watched, setWatched] = useState([]);

  // Fetch movie data on mount
  useEffect(() => {
    fetch("/movie.json")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  // Toggle wishlist
  const toggleWishlist = (movie) => {
    const exists = wishlist.find((m) => m.title === movie.title);
    if (exists) {
      setWishlist(wishlist.filter((m) => m.title !== movie.title));
    } else {
      setWishlist([...wishlist, movie]);
    }
  };

  // Toggle watched
  const toggleWatched = (movie) => {
    const exists = watched.find((m) => m.title === movie.title);
    if (exists) {
      setWatched(watched.filter((m) => m.title !== movie.title));
    } else {
      setWatched([...watched, movie]);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {movies.map((movie) => (
          <MovieCard
            key={movie.title}
            movie={movie}
            isWishlisted={wishlist.some((m) => m.title === movie.title)}
            isWatched={watched.some((m) => m.title === movie.title)}
            onToggleWishlist={toggleWishlist}
            onToggleWatched={toggleWatched}
          />
        ))}
      </div>
    </div>
  );
}

export default App;