import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <footer>
        <nav>
          <span onClick={() => navigate('/')}>Explore</span>
          <span onClick={() => navigate('/profile')}>Profile</span>
          <span onClick={() => navigate('/create-listing')}>New Listing</span>
        </nav>
      </footer>
    </div>
  );
};

export default Navbar;
