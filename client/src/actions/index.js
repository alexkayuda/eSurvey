/**
 * axios is used to make ajax requests
 */
import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

/**
 * this is known as action creator
 */
export const fetchUser = () => {
    return async function (dispatch){
        const response = await axios.get('/api/current_user');
        dispatch( { type: FETCH_USER, payload: response.data } );
    }
};

export const handleToken = (token) => {
    return async function (dispatch){
        const response = await axios.post('/api/stripe', token);
        dispatch( { type: FETCH_USER, payload: response.data } ) 
    }
}

export const submitSurvey = (values, history) => {
    return async function (dispatch){
        const response = await axios.post('/api/surveys', values);
        history.push('/surveys');
        dispatch({type: FETCH_USER, payload: response.data});
    }
};

export const fetchSurveys = () => {
    return async function(dispatch){
        const response = await axios.get('/api/surveys');
        dispatch({ type: FETCH_SURVEYS, payload: response.data});
    }
};

export const deleteSurvey = (surveyId) => {
    return async function(dispatch){
        const response = await axios.post('/api/survey/delete', {surveyId});
        dispatch({ type: FETCH_SURVEYS, payload: response.data});
    }
};