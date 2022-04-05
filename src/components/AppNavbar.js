import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import { logout } from "../redux/Auth/AuthActionCreators";
import AppLogo from "./AppLogo";

const AppNavbar = ({logout}) => {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light relative">
            <AppLogo style={{position: `absolute`, left: `50%`, top: `20px`, transform: `translate(-50%, 0%)` }} />
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" data-widget="pushmenu" to="#" role="button"><i className="fas fa-bars"></i></Link>
                </li>
            </ul>

            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">          
                {/* Notifications Dropdown Menu 
                <li className="nav-item dropdown">
                    <Link className="nav-link" data-toggle="dropdown" to="#">
                        <i className="far fa-bell"></i>
                        <span className="badge badge-danger navbar-badge">15</span>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span className="dropdown-item dropdown-header">15 Notifications</span>
                        <div className="dropdown-divider"></div>
                        <Link to="#" className="dropdown-item">
                            <i className="fas fa-envelope mr-2"></i> 4 new messages
                            <span className="float-right text-muted text-sm">3 mins</span>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link to="#" className="dropdown-item">
                            <i className="fas fa-users mr-2"></i> 8 friend requests
                            <span className="float-right text-muted text-sm">12 hours</span>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link to="#" className="dropdown-item">
                            <i className="fas fa-file mr-2"></i> 3 new reports
                            <span className="float-right text-muted text-sm">2 days</span>
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link to="#" className="dropdown-item dropdown-footer">See All Notifications</Link>
                    </div>
                </li> */}
            
                <li className="nav-item">
                    <Link className="nav-link text-decoration-underline" onClick={() => logout()} data-widget="control-sidebar" data-slide="true" to="#" role="button" style={{color: `red`}}>
                        Déconnexion
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    };
}

export default connect(null, mapDispatchToProps) (AppNavbar);