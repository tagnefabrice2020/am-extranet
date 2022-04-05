import React, {Suspense} from "react";
import {Routes, Route} from "react-router-dom";
import routes from "../routes";
import { AppSpinner } from ".";
import { connect } from "react-redux";
import PrivateRoutes from "../config/PrivateRoutes";

const AppContent = (props) => {
    return (
        <Suspense fallback={AppSpinner}>
            <Routes>
                {routes.map((route, index) => {
                    return <Route 
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                name={route.name}
                                element={
                                    route.auth ?
                                        <PrivateRoutes isLogin={props.auth.isLogin}>
                                            <route.element {...props} />
                                        </PrivateRoutes> : <route.element {...props} />
                            }
                    />
                })}
            </Routes>
        </Suspense>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, null) (AppContent);