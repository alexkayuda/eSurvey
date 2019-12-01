import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {

    render() {
        return (
            <div>
                <footer className="page-footer blue lighten-1">
                    <div className="container">
                        <div className="row">
                            <div className="col l4 s12">
                                <h6 className="white-text">Follow us on social media</h6>
                            </div>
                            <div className="col l5 s12">
                                <ul>
                                    <li><a className="grey-text text-lighten-3 hoverable" href="https://www.facebook.com">Facebook</a></li>
                                    <li><a className="grey-text text-lighten-3 hoverable" href="https://www.instagram.com">Instagram</a></li>
                                    <li><a className="grey-text text-lighten-3 hoverable" href="https://twitter.com">Twitter</a></li>
                                    <li><a className="grey-text text-lighten-3 hoverable" href="https://www.linkedin.com">LinkedIn</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

export default Footer;