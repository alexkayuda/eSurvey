/**
 * This file is responsible for rendering elements on a page
 *
 * CONVENTION:
 * If a given file is exporting a Class or a React component of any type - we name that file with a capital letter. 
 * Otherwise, file will start with lowercase letter
 */

import React, { Component } from 'react';

/**
 * BrowserRoute is the brain. Looks at URL and decides what components need to be displayed
 * Route used to set a connection between route and set of components visible on current page
 */
import { BrowserRouter, Route } from 'react-router-dom';

/**
 * react-redux is all about compatibility between react and redux
 */
import { connect } from 'react-redux';

/**
 * take everything from actions folder and assign it to the object called actions
 */
import * as actions from '../actions';

/**
 * Importing min version of materialize-css file to take care of styling
 * webpack (comes with create-react-app) will include this file in a bundle
 * when we create a production version of this application (of front-end application)
 */
import 'materialize-css/dist/css/materialize.min.css';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import Footer from './Footer';

class App extends Component {

    //to check if current user is signed-in or not
    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
        return (
            <div className="container">
                <BrowserRouter> 
                    <div>
                        <Header/>
                        <Route exact path = "/" component = { Landing } />
                        <Route exact path = "/surveys" component = { Dashboard } /> 
                        <Route exact path = "/surveys/new" component = { SurveyNew } />
                        <Footer/>
                    </div>
                </BrowserRouter>
            </div>
        );
    };
}

 export default connect(null, actions)(App);