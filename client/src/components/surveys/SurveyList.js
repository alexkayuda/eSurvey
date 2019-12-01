import React, {Component} from 'react';
import {connect} from 'react-redux';
import { fetchSurveys, deleteSurvey } from '../../actions';

class SurveyList extends Component {

    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderSurveys(){
        if(this.props.surveys.length === 0){
            return (
                    <img 
                        src="/EmptySurveyList.png" 
                        alt="Empty List"
                        style={{marginLeft: '100px'}}>
                    </img>
            )
        }

        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card blue-grey lighten-4" key={survey._id}>
                    <div className="card-content">
                        <button 
                            onClick={() => this.props.deleteSurvey(survey._id)} 
                            className="btn-floating btn-medium waves-effect waves-light dark-green right">
                                <i className="material-icons">delete_sweep</i>
                        </button>
                        <span className="card-title"> {survey.title} </span>
                        <p> {survey.body} </p>
                        <p className="right"> 
                            Sent On: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action teal lighten-1">
                        <a>Yes: {survey.yes} </a>
                        <a>No: {survey.no} </a>
                    </div>
                </div>
            );
        })
    }

    render() {
        return (
            <div>
               {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return { surveys: state.survey};
}

export default connect(mapStateToProps, {fetchSurveys, deleteSurvey})(SurveyList);