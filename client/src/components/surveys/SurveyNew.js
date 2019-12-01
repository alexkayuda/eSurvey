
 import React, { Component } from 'react';
 import { reduxForm } from 'redux-form';
 import SurveyForm from './SurveyForm'
 import SurveyFormReview from './SurveyFormReview';

 class SurveyNew extends Component{

    state = { showFormReview: false};

    renderContent() {
        if(this.state.showFormReview === true){
            return <SurveyFormReview 
                        onCancel={ () => {
                            return this.setState( { showFormReview: false } );
                        }}
                    />
        } else {
            return <SurveyForm 
                        onSurveySubmit={ () => {
                            return this.setState( { showFormReview: true } );
                        }}
                    />
        }
    }

     render(){
         return (
             <div> { this.renderContent() } </div>
         )
     }
 }

 export default reduxForm({
     form: 'surveyForm',
     destroyOnUnmount: true
 })(SurveyNew);