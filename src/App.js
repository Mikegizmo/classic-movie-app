import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorite from "./components/AddFavorites";
import RemoveFavorites from "./components/RemoveFavorites";

const App = () => {
  const [ movies, setMovies ] = useState([]);
  const [ favorites, setFavorites ] = useState([]);
  const [ searchValue, setSearchValue ] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=78f0a869`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
    setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('classic-movie-app-favorites'));

    setFavorites(movieFavorites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('classic-movie-app-favorites', JSON.stringify(items));
  }

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter((favorite) => favorite.imdbID !== movie.imdbID);

    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center my-3'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div className='row'>
        <MovieList 
          movies={movies} 
          handleFavoritesClick={addFavoriteMovie}
          favoriteComponent={AddFavorite} 
        />
      </div>
      <div className='row d-flex align-items-center my-3'>
        <MovieListHeading heading='Favorites'/>
      </div>
      <div className='row'>
        <MovieList 
          movies={favorites} 
          handleFavoritesClick={removeFavoriteMovie}
          favoriteComponent={RemoveFavorites} 

        />
      </div>
    </div>
  );
};

export default App;