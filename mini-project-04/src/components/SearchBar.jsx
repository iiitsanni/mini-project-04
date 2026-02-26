import React from 'react';
import styled from 'styled-components';

// Search input and filter dropdowns for genre, age group, year, and sorting
const SearchBar = ({
  searchQuery, onSearchChange,
  selectedGenre, onGenreChange, genres,
  selectedAgeGroup, onAgeGroupChange, ageGroups,
  selectedYear, onYearChange, years,
  sortOrder, onSortChange,
}) => {
  return (
    <StyledWrapper>
      <div className="search-filter-group">
        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
            </g>
          </svg>
          <input
            id="query"
            className="input"
            type="search"
            placeholder="Search..."
            name="searchbar"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="filter-select"
          value={selectedAgeGroup}
          onChange={(e) => onAgeGroupChange(e.target.value)}
        >
          <option value="">All Ages</option>
          {ageGroups.map((ag) => (
            <option key={ag} value={ag}>{ag}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>

        <select
          className="filter-select"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="year-desc">Year: Newest First</option>
          <option value="year-asc">Year: Oldest First</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="title-asc">Title: A → Z</option>
          <option value="title-desc">Title: Z → A</option>
        </select>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .search-filter-group {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .group {
    display: flex;
    line-height: 28px;
    align-items: center;
    position: relative;
    max-width: 190px;
  }

  .input {
    font-family: "Montserrat", sans-serif;
    width: 100%;
    height: 45px;
    padding-left: 2.5rem;
    box-shadow: 0 0 0 1.5px #2b2c37, 0 0 25px -17px #000;
    border: 0;
    border-radius: 12px;
    background-color: #16171d;
    outline: none;
    color: #bdbecb;
    transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: text;
    z-index: 0;
  }

  .input::placeholder {
    color: #bdbecb;
  }

  .input:hover {
    box-shadow: 0 0 0 2.5px #2f303d, 0px 0px 25px -15px #000;
  }

  .input:active {
    transform: scale(0.95);
  }

  .input:focus {
    box-shadow: 0 0 0 2.5px #2f303d;
  }

  .search-icon {
    position: absolute;
    left: 1rem;
    fill: #bdbecb;
    width: 1rem;
    height: 1rem;
    pointer-events: none;
    z-index: 1;
  }

  .filter-select {
    font-family: "Montserrat", sans-serif;
    height: 45px;
    padding: 0 1rem;
    box-shadow: 0 0 0 1.5px #2b2c37, 0 0 25px -17px #000;
    border: 0;
    border-radius: 12px;
    background-color: #16171d;
    outline: none;
    color: #bdbecb;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .filter-select:hover {
    box-shadow: 0 0 0 2.5px #2f303d, 0px 0px 25px -15px #000;
  }

  .filter-select option {
    background-color: #16171d;
    color: #bdbecb;
  }
`;

export default SearchBar;
