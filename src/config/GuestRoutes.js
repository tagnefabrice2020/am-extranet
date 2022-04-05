import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const GuestRoutes =  ({children, auth}) => {
    return !auth ? children : <Navigate replace to='/' />;
}

const mapStateToProps = state => {
    return {
        auth: state.auth.isLogin
    };
}

export default connect(mapStateToProps, null) (GuestRoutes)