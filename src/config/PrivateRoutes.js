import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children, auth}) => {
    return auth ? children : <Navigate replace to='/login' />;
}

const mapStateToProps = state => {
    return {
        auth: state.auth.isLogin
    };
}

export default connect(mapStateToProps, null) (PrivateRoutes)
