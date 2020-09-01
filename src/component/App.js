import React from 'react';
import { connect } from 'react-redux';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import { addMovies, setShowFavourite  } from '../actions';

class App extends React.Component {
  componentDidMount () {
    // const {store} = this.props;
    // store.subscribe(() => {
    //   console.log("updated");
    //   this.forceUpdate();
    // })
    // make api call
    // dispatch action
    this.props.dispatch(addMovies(data));

    // console.log('state ',this.props.store.getState());
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if(index !== -1)
      return true;
    return false;
  }
  changeTab = (val) => {
    this.props.dispatch(setShowFavourite(val));
  }
  render () {
    const { movies, search } = this.props;
    const { list , favourites , showFavourites } =  movies;
    console.log('render ',this.props);

    const displayMovies = showFavourites ? favourites : list;

    return (
      <div className="App">
        <Navbar search={search}/>
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
              dispatch={this.props.dispatch}
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

// class AppWrapper extends React.Component {

//   render() { return (
//     <StoreContext.Consumer>
//       {(store) => <App store={store}/>}
//     </StoreContext.Consumer>
//   ); }

// }

function mapStateToProps(state) {
  return {
    movies: state.movies, 
    search: state.search
  };
}

const connectedAppComponent = connect(mapStateToProps)(App);
export default connectedAppComponent;
