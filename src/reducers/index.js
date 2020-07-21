import { ADD_MOVIES } from '../actions/index'

const initialMoviesState = {
    list: [],
    favourites: []
}
export default function movies (state = initialMoviesState, action){
    if (action.type === ADD_MOVIES){
        return {
            ...state,
            list: action.movies
        }
    }else {
        return state;
    }
}
