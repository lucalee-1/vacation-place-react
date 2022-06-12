import { Navigate } from 'react-router-dom';
import { useLoginStatus } from '../hooks/useLoginStatus';
import { BallTriangle } from 'react-loader-spinner';

const PrivateRoute = ({children}) => {
  const { loggedIn, loading } = useLoginStatus();

  if (loading) {
    return <BallTriangle height={70}
    width={70}
    color='#8ac8f4'
    ariaLabel='loading'/>
  }

  return loggedIn ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
