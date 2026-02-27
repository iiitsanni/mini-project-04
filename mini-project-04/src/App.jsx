import { useState, useEffect, useMemo } from "react";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination.jsx";
import Loader from "./components/Loader.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiMovie2AiFill } from "react-icons/ri";


function App() {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });
  const [watched, setWatched] = useState(() => {
    const saved = localStorage.getItem("watched");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortOrder, setSortOrder] = useState("year-desc");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch movie data on mount
  useEffect(() => {
    const MIN_LOADING_MS = 2000; // Minimum loading time in ms
    const start = Date.now();

    fetch("/movie.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => setError(err.message))
      .finally(() => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, MIN_LOADING_MS - elapsed);
        setTimeout(() => setLoading(false), remaining);
      });
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

    if (sortOrder === "year-desc") result = [...result].sort((a, b) => b.releasing_year - a.releasing_year);
    else if (sortOrder === "year-asc") result = [...result].sort((a, b) => a.releasing_year - b.releasing_year);
    else if (sortOrder === "rating-desc") result = [...result].sort((a, b) => b.imdb_rating - a.imdb_rating);
    else if (sortOrder === "rating-asc") result = [...result].sort((a, b) => a.imdb_rating - b.imdb_rating);
    else if (sortOrder === "title-asc") result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    else if (sortOrder === "title-desc") result = [...result].sort((a, b) => b.title.localeCompare(a.title));

    return result;
  }, [movies, searchQuery, selectedGenre, selectedAgeGroup, selectedYear, sortOrder]);

  const MOVIES_PER_PAGE = 12;
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
    const endIndex = startIndex + MOVIES_PER_PAGE;
    return filteredMovies.slice(startIndex, endIndex);
  }, [filteredMovies, currentPage]);

  // Toast when no movies match filters
  useEffect(() => {
    if (!loading && !error && filteredMovies.length === 0) {
      toast.warn("No movies found for the specified filters.");
    }
  }, [filteredMovies.length, loading, error]);

  // Reset to page 1 when filters change
  const handleSearchChange = (val) => { setSearchQuery(val); setCurrentPage(1); };
  const handleGenreChange = (val) => { setSelectedGenre(val); setCurrentPage(1); };
  const handleAgeGroupChange = (val) => { setSelectedAgeGroup(val); setCurrentPage(1); };
  const handleYearChange = (val) => { setSelectedYear(val); setCurrentPage(1); };
  const handleSortChange = (val) => { setSortOrder(val); setCurrentPage(1); };

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Persist wishlist and watched to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  // Toggle wishlist
  const toggleWishlist = (movie) => {
    const exists = wishlist.find((m) => m.title === movie.title);
    if (exists) {
      setWishlist(wishlist.filter((m) => m.title !== movie.title));
      toast.info(`"${movie.title}" removed from wishlist`);
    } else {
      setWishlist([...wishlist, movie]);
      toast.success(`"${movie.title}" added to wishlist`);
    }
  };

  // Toggle watched
  const toggleWatched = (movie) => {
    const exists = watched.find((m) => m.title === movie.title);
    if (exists) {
      setWatched(watched.filter((m) => m.title !== movie.title));
      toast.info(`"${movie.title}" removed from watched`);
    } else {
      setWatched([...watched, movie]);
      toast.success(`"${movie.title}" added to watched`);
    }
  };

  const removeMovie = (title) => {
      const newList = wishlist.filter((m) => m.title !== title);
        setWishlist(newList);
  };
  const removeWatched = (title) => {
      const newWatched = watched.filter((m) => m.title !== title);
        setWatched(newWatched);
  }
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', background: '#031926' }}> 
        <Loader />
      </div>
    );
  }

  return (
    <>
      <ToastContainer position="bottom-right" autoClose={2000} theme="dark" />
      <div className='navbar-wrapper'>
        <Navbar wishlist={wishlist} removeMovie={removeMovie} watched={watched} removeWatched={removeWatched}/>
      </div>
    <div className='background flex flex-col items-center text-center px-6 py-10 bg-[#031926]'>
        <div className='justify-center align-middle'>
            <div className='flex flex-col items-center justify-center'>
            <RiMovie2AiFill className='text-6xl md:text-8xl mb-6 mt-15 text-[#77ACA2] justify-center'  />
        </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#77ACA2] m-10">Welcome to <span className="text-[#F4E9CD]"> JAS Movies!</span></h1>
        <p className='text-lg md:text-xl text-[#77ACA2] max-w-3xl m-10'> Browse, search, and filter your favorite movies. Add the ones you love to your Watchlist or mark them as Already Watched. You can even download your lists as PDFs to keep track of your movie adventures!</p>
    </div>
        <div className="min-h-screen bg-[#031926] p-6 ">
        {loading && (<Loader />)}
        {error && <p className="text-center text-red-500 text-lg mt-10">Error loading movies: {error}</p>}
        {!loading && !error && (
          <div className="flex justify-center mb-6 bg-[#031926]">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              selectedGenre={selectedGenre}
              onGenreChange={handleGenreChange}
              genres={genres}
              selectedAgeGroup={selectedAgeGroup}
              onAgeGroupChange={handleAgeGroupChange}
              ageGroups={ageGroups}
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
              years={years}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
            />
          </div>
        )}
        {filteredMovies.length === 0 && !loading && !error ? (
          <p className="text-center text-lg mt-20" style={{ color: '#ffffff' }}>
            No movies found for the specified filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto bg-[#031926]">
            {paginatedMovies.map((movie) => (
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
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}

        />
      </div>
    </div>
      <div className='footer'>
        <Footer />
      </div>

    </>
  );
}

export default App;