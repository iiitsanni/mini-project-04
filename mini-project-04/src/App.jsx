import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie data on mount
  useEffect(() => {
    fetch("/movie.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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
      {loading && <p className="text-center text-lg mt-10">Loading movies...</p>}
      {error && <p className="text-center text-red-500 text-lg mt-10">Error loading movies: {error}</p>}
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