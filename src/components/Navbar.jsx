import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <footer>
      <nav>
        <ul>
          <li onClick={() => navigate('/')}>
            <p>Explore</p>
          </li>         
          <li onClick={() => navigate('/profile')}>
            <p>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Navbar;
