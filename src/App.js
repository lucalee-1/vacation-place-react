import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './views/Explore';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
      <h1>App</h1>
    </>
  );
}

export default App;
