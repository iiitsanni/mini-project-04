import { useState, useEffect, useMemo } from "react";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

function App() {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortOrder, setSortOrder] = useState("");

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

  const genres = useMemo(
    () => [...new Set(movies.map((m) => m.genre).filter(Boolean))].sort(),
    [movies]
  );

  const ageGroups = useMemo(() => {
    const order = ["G", "PG", "PG-13", "R", "NC-17"];
    const found = new Set(movies.map((m) => m.age_group).filter(Boolean));
    return order.filter((ag) => found.has(ag));
  }, [movies]);

  const years = useMemo(
    () => [...new Set(movies.map((m) => m.releasing_year).filter(Boolean))].sort((a, b) => b - a),
    [movies]
  );

  const filteredMovies = useMemo(() => {
    const q = searchQuery.toLowerCase();
    let result = movies.filter((m) => {
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.director.toLowerCase().includes(q);
      const matchesGenre = !selectedGenre || m.genre === selectedGenre;
      const matchesAgeGroup = !selectedAgeGroup || m.age_group === selectedAgeGroup;
      const matchesYear = !selectedYear || String(m.releasing_year) === selectedYear;
      return matchesSearch && matchesGenre && matchesAgeGroup && matchesYear;
    });

    if (sortOrder === "rating-desc") result = [...result].sort((a, b) => b.imdb_rating - a.imdb_rating);
    else if (sortOrder === "rating-asc") result = [...result].sort((a, b) => a.imdb_rating - b.imdb_rating);
    else if (sortOrder === "title-asc") result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    else if (sortOrder === "title-desc") result = [...result].sort((a, b) => b.title.localeCompare(a.title));

    return result;
  }, [movies, searchQuery, selectedGenre, selectedAgeGroup, selectedYear, sortOrder]);

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
  const removeMovie = (title) => {
      setWishlist([movies.filter((m) => m.title !== movie.title)]);
  }

  return (
      <>
          <div className='navbar'>
         <Navbar wishlist={wishlist} removeMovie={removeMovie}/>
          </div>
        <div className="min-h-screen bg-base-100 p-6">
          {loading && <p className="text-center text-lg mt-10">Loading movies...</p>}
          {error && <p className="text-center text-red-500 text-lg mt-10">Error loading movies: {error}</p>}
          {!loading && !error && (
            <div className="flex justify-center mb-6">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                genres={genres}
                selectedAgeGroup={selectedAgeGroup}
                onAgeGroupChange={setSelectedAgeGroup}
                ageGroups={ageGroups}
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
                years={years}
                sortOrder={sortOrder}
                onSortChange={setSortOrder}
              />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredMovies.map((movie) => (
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
          <div className='footer'>
              <Footer/>
          </div>
          </>
  );
}

export default App;