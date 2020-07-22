import { ADD_MOVIES , ADD_FAVOURITE, REMOVE_FAVOURITE } from '../actions/index'

const initialMoviesState = {
    list: [],
    favourites: []
}
export default function movies (state = initialMoviesState, action){
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
        default:
            return state;
    }
}

