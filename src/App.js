// App.js
import React, { useState, useCallback } from "react";
import MovieCard from "./MovieCard";
import SearchIcon from "./search_icon_img.png";
import "./App.css";

//const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=4c32c503";
//const API_URL = "/.netlify/functions/omdbProxy";

const MOVIES_PER_PAGE = 6;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState([]);

  const searchMovies = useCallback(async (title, page, sortOrder) => {
    if (title.trim() === "") {
      setMovies([]);
      return;
    }

    let totalResults = 0;
    let fetchedMovies = [];

    while (fetchedMovies.length < 60 && page <= 10) {
      const isLocal = process.env.NODE_ENV === "development";

      const API_URL = isLocal
        ? `http://localhost:8888/.netlify/functions/omdbProxy`
        : `http://www.omdbapi.com/?i=tt3896198&apikey=4c32c503`;

      const response = await fetch(`${API_URL}&s=${title}&page=${page}`);

      // const response = await fetch(`${API_URL}&s=${title}&page=${page}`);
      const data = await response.json();

      if (data.Search) {
        fetchedMovies = [...fetchedMovies, ...data.Search];
        totalResults = data.totalResults;
      }

      page++;
    }

    if (fetchedMovies.length > 0) {
      let sortedMovies = [...fetchedMovies];

      if (sortOrder === "latest") {
        sortedMovies = sortedMovies.sort(
          (a, b) => new Date(b.Year) - new Date(a.Year)
        );
      } else if (sortOrder === "oldest") {
        sortedMovies = sortedMovies.sort(
          (a, b) => new Date(a.Year) - new Date(b.Year)
        );
      }

      setMovies(sortedMovies);
      setTotalPages(Math.ceil(totalResults / MOVIES_PER_PAGE));
    } else {
      setMovies([]);
      setTotalPages(0);
    }
  }, []);

  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);
    setCurrentPage(1);
    searchMovies(searchTerm, 1, selectedSortOrder);
  };

  const handleSearchClick = () => {
    setCurrentPage(1);
    searchMovies(searchTerm, 1, sortOrder);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const displayedPages = Math.min(totalPages, 10);

    return Array.from({ length: displayedPages }, (_, index) => (
      <button
        key={index + 1}
        onClick={() => handlePageChange(index + 1)}
        className={index + 1 === currentPage ? "active" : ""}
      >
        {index + 1}
      </button>
    ));
  };

  return (
    <div className="app">
      <h1>FilmBase</h1>

      <div className="search-bar">
        <div className="search">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
          />
        </div>
        <img
          src={SearchIcon}
          alt="search"
          className="search-icon"
          onClick={handleSearchClick}
        />
        <div className="sort">
          <select value={sortOrder} onChange={handleSortChange}>
            <option>Sort</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      {movies.length > 0 ? (
        <>
          <div className="container">
            {movies
              .slice(
                (currentPage - 1) * MOVIES_PER_PAGE,
                currentPage * MOVIES_PER_PAGE
              )
              .map((movie) => (
                <MovieCard key={movie?.imdbID} movie={movie} />
              ))}
          </div>
          <div className="pagination">{renderPageButtons()}</div>
        </>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
