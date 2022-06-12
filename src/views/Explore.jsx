import { Link } from 'react-router-dom';

const Explore = () => {
  return (
    <div>
      <header>
        <h2>Explore</h2>
      </header>

      <main>
        <h4>Categories</h4>
        <div className='container'>
          <Link to="/category/beach" className='category-link'>
          <img className="" alt="" />
          <p>Beach</p>
          </Link>
          <Link to="/category/mountain" className='category-link'>
          <img className="" alt="" />
          <p>Mountain</p>
          </Link>
          <Link to="/category/city" className='category-link'>
          <img className="" alt="" />
          <p>City</p>
          </Link>
          <Link to="/category/luxury" className='category-link'>
          <img className="" alt="" />
          <p>Luxury</p>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
