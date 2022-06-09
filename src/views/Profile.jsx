import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
  };
 
  return (
    <div>
      <h2>{name}</h2>
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
};

export default Profile;
