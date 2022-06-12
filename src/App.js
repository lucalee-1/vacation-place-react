import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Explore from './views/Explore';
import Category from './views/Category';
import ListingDetails from './views/ListingDetails';
import CreateListing from './views/CreateListing';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import ForgotPassword from './views/ForgotPassword';
import Profile from './views/Profile';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function App() {
  return (
    <>      
      <div className="main-container">
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </div>
      <ToastContainer limit={3} transition={Slide} hideProgressBar={true}/>
    </>
  );
}

export default App;
