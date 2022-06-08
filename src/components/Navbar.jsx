import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div>
      <footer>
        <nav>
          <div>
            <span onClick={() => navigate('/')}>Explore</span>
          </div>
          <div>
            <span onClick={() => navigate('/profile')}>Profile</span>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Navbar;
