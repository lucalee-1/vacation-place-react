import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        setLoading(false);
        navigate('/');
        toast.success(`Welcome back, ${auth.currentUser.displayName}!`);
      }
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        toast.error('Wrong user credentials');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many failed login attemps. Please wait and try again later.');
      } else {
        toast.error('Something went wrong ');
      }
    }
  };

  if (loading) {
    return <BallTriangle height={70} width={70} color="#8ac8f4" ariaLabel="loading" />;
  }
  return (
    <>
      <div>
        <header>
          <h3>Sign In</h3>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
              required
            />
            <div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
                minLength={6}
                required
              />
              <button type="button" onClick={() => setShowPassword((prevState) => !prevState)}>
                Show
              </button>
            </div>
            <Link to="/forgot-password">Forgot Password</Link>
            <div>
              <button type="submit">Sign In</button>
            </div>
          </form>
          <Link to="/signup">Sign Up Instead</Link>
        </main>
      </div>
    </>
  );
};

export default SignIn;
