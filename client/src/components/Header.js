import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {

    renderContent(){
        switch(this.props.auth){
            case null: 
                return;
            case false:
                return <li><a href="/auth/google">Login with Google</a></li>
            default:
                return [
                    <li key="1"><Payments /></li>,

                    <li key="2" style={{margin: '0 10px' }}>
                        Credits: {this.props.auth.credits}
                    </li>,

                    <li key="3"><a href="/api/logout">Logout</a></li>
                ]
        }
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper blue lighten-1" >
                    <Link 
                        to={ this.props.auth ? '/surveys' : '/'} 
                        className="left brand-logo"
                        style={{marginLeft: '50px'}}
                    >
                        eSurvey
                    </Link>

                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

//state here is the entire information stored in redux
function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Header);