import { FETCH_USER } from '../actions/types.js';

//responsible for checking whether user is sign-in or not
export default function(state = null, action){
    switch(action.type){
        case FETCH_USER:
            return action.payload || false; 
        default:
            return state;
    }
}