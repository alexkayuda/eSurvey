import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer.js';
import surveyReducer from './surveyReducer.js';

//name of the key that will be stored in a state
export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    survey: surveyReducer
}); 
 
