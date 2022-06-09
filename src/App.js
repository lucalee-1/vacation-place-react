import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Explore from './views/Explore';
import Category from './views/Category';
import ListingDetails from './views/ListingDetails';
import CreateListing from './views/CreateListing';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Profile from './views/Profile';

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/category/:categoryName/:listingId" element={<ListingDetails />} />
          <Route path="/category/:categoryName/:listingId" element={<ListingDetails />} />
          <Route path="/create-listing" element={<CreateListing />} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
