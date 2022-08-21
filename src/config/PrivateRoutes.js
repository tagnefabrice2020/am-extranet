import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({children, auth, roles}) => {
    if (!!auth.isLogin) {
        const authUser = typeof auth.authUser === 'string'? JSON.parse(auth.authUser) : auth.authUser;
        console.log(typeof authUser)
        if (!!roles && roles.length > 0) {
            if (roles.includes(authUser.group.toLowerCase())) {
                return children;
            } else {
                console.log(!!roles)
                return <Navigate to='/not-allowed' />
            }
        }
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
