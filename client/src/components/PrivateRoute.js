import { Navigate } from 'react-router-dom';


export { PrivateRoute };

function PrivateRoute({ children }) {
    // const { user: authUser } = useSelector(x => x.auth);
    const authUser = localStorage.getItem('user');
    if (!authUser) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/signin" />
    }

    // authorized so return child components
    return children;
}