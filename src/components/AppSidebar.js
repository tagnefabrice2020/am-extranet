import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import '../../src/assets/dist/js/menu.js';

const parseData = (data) => {
    if (!data) return {};
    if (typeof data === 'object') return data;
    if (typeof data === 'string') return JSON.parse(data);
    return {};
}

const AppSidebar = ({ user }) => {
    
    const userInfo = parseData(user);
    const location = useLocation();
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <Link to="/" className="brand-link" style={{ display: 'block', textAlign: 'center', margin: 'auto' }}>
                <span className="brand-text">Amexpert Commande</span>
            </Link>

            {/* Sidebar */}
            <div className="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition"><div className="os-resize-observer-host observed"><div className="os-resize-observer" style={{ left: 0 + 'px', right: 'auto' }}></div></div><div className="os-size-auto-observer observed" style={{ height: `calc(100% + 1px)`, float: 'left' }}><div className="os-resize-observer"></div></div><div className="os-content-glue" style={{ margin: 0 + 'px' - 8 + 'px' }}></div><div className="os-padding">
                <div className="os-viewport os-viewport-native-scrollbars-invisible">
                    <div className="os-content" style={{ height: `100%`, width: `100%` }}>
                        {/* Sidebar user panel (optional) */}
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex justify-content-center align-items-center">
                            <div className="info">
                                <Link to="/" className="d-block text-decoration-underline">Bienvenue, {userInfo.last_name ? userInfo.last_name : null}</Link>
                            </div>
                        </div>

                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
                                with font-awesome or any other icon font library */}
                                <li className="nav-item menu-open">
                                    <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                        <i className="nav-icon fas fa-tachometer-alt"></i>
                                        <p>Tableau de Bord</p>
                                    </NavLink>
                                </li>
                                <li className={location.pathname === '/ajouter/un/rendez-vous' || location.pathname === '/rendez-vous' ? 'nav-item sub-menu menu-is-opening menu-open' : 'sub-menu nav-item'}>
                                    <Link to="#" className={location.pathname === '/ajouter/un/rendez-vous' || location.pathname === '/rendez-vous' ? 'nav-link active' : 'nav-link'}>
                                        <i className="nav-icon fas fa-th"></i>
                                        <p>RDV/Commande</p>
                                        <i className="fas fa-angle-left right"></i>
                                    </Link>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/ajouter/un/rendez-vous" className={location.pathname === '/ajouter/un/rendez-vous' ? 'nav-link nav-active' : 'nav-link'}>
                                                <i className="far fa-calendar-plus nav-icon"></i>
                                                <p>Ajoutez un RDV</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/rendez-vous" className={location.pathname === '/rendez-vous' ? 'nav-link nav-active' : 'nav-link'}>
                                                <i className="far fa-calendar nav-icon"></i>
                                                <p>RDV</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className={location.pathname === '/ajouter/utilisateur' || location.pathname === '/utilisateurs' ? 'sub-menu nav-item menu-is-opening menu-open' : 'sub-menu nav-item'}>
                                    <Link to="#" className={location.pathname === '/ajouter/utilisateur' || location.pathname === '/utilisateurs' ? 'nav-link active' : 'nav-link'}>
                                        <i className="nav-icon fas fa-users"></i>
                                        <p>
                                            Utilisateurs
                                        </p><i className="fas fa-angle-left right"></i>
                                    </Link>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/ajouter/utilisateur" className={location.pathname === '/ajouter/utilisateur' ? 'nav-link nav-active' : 'nav-link'}>
                                                <i className="fas fa-user-plus nav-icon"></i>
                                                <p>Ajouter un utilisateur</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/utilisateurs" className={location.pathname === '/utilisateurs' ? 'nav-link nav-active' : 'nav-link'}>
                                                <i className="fas fa-list nav-icon"></i>
                                                <p>Utilisateurs</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item menu-open">
                                    <NavLink to="/exporter" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                                        <i className="nav-icon fas fa-tachometer-alt"></i>
                                        <p>Exporter</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                        {/* .sidebar-menu */}
                    </div>
                </div>
            </div>
                <div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
                    <div className="os-scrollbar-track">
                        <div className="os-scrollbar-handle" style={{ width: `100%`, transform: 'translate(0px, 0px)' }}></div>
                    </div>
                </div>
                <div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
                    <div className="os-scrollbar-track">
                        <div className="os-scrollbar-handle" style={{ height: `31.7881%`, transform: 'translate(0px, 0px)' }}></div>
                    </div>
                </div>
                <div className="os-scrollbar-corner"></div>
            </div>
            {/* /.sidebar */}
        </aside>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.authUser
    };
}

export default connect(mapStateToProps, null)(AppSidebar);