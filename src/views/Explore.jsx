import { Link } from 'react-router-dom';
import beachCategoryImage from '../assets/beachCategory.jpg';

const Explore = () => {
  return (
    <div>
      <header>
        <h2>Explore</h2>
      </header>

      <main>
        <p>Categories</p>
        <div>
          <Link to="/category/beach" >
          <img className="" alt="" />
          <p>Beach</p>
          </Link>
          <Link to="/category/mountain" >
          <img className="" alt="" />
          <p>Mountain</p>
          </Link>
          <Link to="/category/city" >
          <img className="" alt="" />
          <p>City</p>
          </Link>
          <Link to="/category/luxury" >
          <img className="" alt="" />
          <p>Luxury</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
