import React from 'react';

const MovieCard = ({ movie }) => {
  // Add a check to ensure 'movie' is not undefined or null
  if (!movie) {
    return null; // or handle the case where 'movie' is undefined or null
  }

  const { imdbID, Year, Poster, Title } = movie;

  return (
    <div className="movie" key={imdbID}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"} alt={Title} />
      </div>
    </div>
  );
}

export default MovieCard;
