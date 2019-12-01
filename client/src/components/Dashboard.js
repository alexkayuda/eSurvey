import React from 'react';
import { Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';
import ScrollArea from 'react-scrollbar';

const Dashboard = () => {
    return (
        <div>
            <ScrollArea>
                <SurveyList /> 
            </ScrollArea>
            <div className="fixed-action-btn">
                <Link to="/surveys/new" className="btn-floating btn-large waves-effect waves-light dark-green" >
                    <i className="material-icons">add_box</i>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;