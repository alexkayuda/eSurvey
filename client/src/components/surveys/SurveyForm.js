
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

import validateEmails from '../../utils/validateEmails';

class SurveyForm extends Component{

    renderFields() {
        return (
            <div>
               <Field label="Survey Title" type="text" name="title" icon="title" 
                component={SurveyField} />
               <Field label="Subject Line" type="text" name="subject" icon="subject" 
                component={SurveyField} />
               <Field label="Email Body" type="text" name="body" icon="edit"
                component={SurveyField} />
               <Field label="Recipient List" type="text" name="recipients" icon="email"
                component={SurveyField} />
            </div>
        );
    }

    render(){
        return (
            <div>
                <form onSubmit={this.props.handleSubmit( () => this.props.onSurveySubmit() )}
                    style={{ border: '3px solid black', margin: '30px 40px', padding: '40px'}}>

                    { this.renderFields() }
                    
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link> 
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">arrow_forward</i>
                    </button>
                </form>
                
            </div>
        )
    }
}

function validate(values) {

    const errors = {};

    if(!values.title) {
        errors.title = 'You must provide a title';
    }

    if(!values.subject) {
        errors.subject = 'You must provide a subject';
    }

    if(!values.body) {
        errors.body = 'You must provide a body';
    }

    if(!values.emails){
        errors.emails = 'You must provide an email';
    } else {
        errors.emails = validateEmails(values.recipients || '');
    }

    return errors; 
}

export default reduxForm({ 
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
 })(SurveyForm);