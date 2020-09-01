import { combineReducers } from 'redux'

import { 
     ADD_MOVIES , 
     ADD_FAVOURITE, 
     REMOVE_FAVOURITE, 
     SET_SHOW_FAVOURITE,
     ADD_SEARCH_RESULT, 
     ADD_MOVIE_TO_LIST
    } from '../actions/index'

const initialMoviesState = {
    list: [],
    favourites: []
}
export function movies (state = initialMoviesState, action){
    // if (action.type === ADD_MOVIES){
    //     return {
    //         ...state,
    //         list: action.movies
    //     }
    // }else {
    //     return state;
    // }

    switch (action.type) {
        case ADD_MOVIES:
            return {
                ...state,
                list: action.movies
            }
        case ADD_FAVOURITE:
            return {
                ...state,
                favourites: [action.movie, ...state.favourites]
            }
        case REMOVE_FAVOURITE: {
            var favourites = state.favourites.filter(function(ele){ return action.movie !== ele; });
            console.log(favourites);
            return {
                ...state,
                favourites
            }
        }
        case SET_SHOW_FAVOURITE: 
            return {
                ...state,
                showFavourites: action.val
            }
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                list: [action.movie, ...state.list]
            };
        default:
            return state;
    }
}
const initialSearchState = {
    result: [],
    showSearchResults: false
};
export function search (state = initialSearchState, action) {
    
    switch (action.type) {
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                result: action.movie,
                showSearchResults: true
            }
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                showSearchResults: false
            };
        default:
            return state;
    }    
}


// const initialRootState = {
//     movies: initialMoviesState,
//     search: initialSearchState
// };
// export default function rootReducer (state = initialRootState, action) {
//     return {
//         movies: movies(state.movies, action),
//         search: search(state.search, action)
//     }
// }

export default combineReducers({
    movies,
    search
});