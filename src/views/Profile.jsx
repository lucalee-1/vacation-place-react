import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import{toast} from 'react-toastify'

const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  
  const { name, email } = user;
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
    toast.success("Successfully logged out.")
  };
 
  return (
    <div>
      <h2>Hi, {name}</h2>
      <p>{email}</p>
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
      <Link to='/create-listing'><p>Create a new listing</p></Link>
    </div>
  );
};

export default Profile;
