import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children, auth, roles}) => {
    if (!!auth.isLogin) {
        const authUser = typeof auth.authUser === 'string' ? JSON.parse(auth.authUser) : auth.authUser;
        
        if (!!roles && roles.length > 0) {
            if (roles.includes(authUser.group.toLowerCase())) {
                new Promise((resolve) => setTimeout(resolve, 200));
                return children;
            } else {
                return <Navigate to='/not-allowed' />
            }
        }
        new Promise((resolve) => setTimeout(resolve, 200));
        return children;
    } else {
        return  <Navigate replace to='/login' />;
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, null) (PrivateRoutes)
