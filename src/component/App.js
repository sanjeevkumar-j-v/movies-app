import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourite  } from '../actions';

class App extends React.Component {
  componentDidMount () {
    const {store} = this.props;
    store.subscribe(() => {
      console.log("updated");
      this.forceUpdate();
    })
    // make api call
    // dispatch action
    store.dispatch(addMovies(data));

    // console.log('state ',this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);

    if(index !== -1)
      return true;
    return false;
  }
  changeTab = (val) => {
    this.props.store.dispatch(setShowFavourite(val));
  }
  render () {
    const { movies } = this.props.store.getState();
    const { list , favourites , showFavourites } =  movies;
    console.log('render ',this.props.store.getState());

    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites ? '' : 'active-tabs'}`} onClick={() => this.changeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites ? 'active-tabs' : ''}`} onClick={() => this.changeTab(true)}>Favourite</div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard 
              movie={movie} 
              key={`movies-${index}`} 
              dispatch={this.props.store.dispatch}
              isFavourite = {this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          <div>
            {displayMovies.length === 0 ? 'No favourite movies to display' : null}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
