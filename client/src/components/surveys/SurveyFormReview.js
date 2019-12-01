
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ( {onCancel, formValues, submitSurvey, history} ) => {
    return (
        <div style={{ border: '3px solid black', margin: '30px 40px', padding: '40px'}}>
            <h4>Please the information below:</h4>
            <div>
                <div>
                    <label style={{fontSize: "20px"}}>Survey Title</label>
                    <div style={{fontStyle: 'italic'}}>{formValues.title}</div>
                </div>
                <div>
                    <label style={{fontSize: "20px"}}>Subject Line</label>
                    <div style={{fontStyle: 'italic'}}>{formValues.subject}</div>
                </div>
                <div>
                    <label style={{fontSize: "20px"}}>Email Body</label>
                    <div style={{fontStyle: 'italic'}}>{formValues.body}</div>
                </div>
                <div>
                    <label style={{fontSize: "20px"}}>Recipient List</label>
                    <div style={{fontStyle: 'italic'}}>{formValues.recipients}</div>
                </div>
            </div>
            <button className="yellow darken-3 white-text btn-flat" onClick={onCancel}>
                Back
            </button>
            <button className="green btn-flat right white-text" onClick={ () => submitSurvey(formValues, history)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>

        </div>
    )
}

function mapStateToProps(state){
    //console.log(state);
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));