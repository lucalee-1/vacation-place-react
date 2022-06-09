import { Navigate } from 'react-router-dom';
import { useLoginStatus } from '../hooks/useLoginStatus';

const PrivateRoute = ({children}) => {
  const { loggedIn, loading } = useLoginStatus();

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return loggedIn ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
