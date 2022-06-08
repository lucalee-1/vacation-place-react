import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div>
        <header>
          <h3>Sign In</h3>
        </header>
        <main>
          <form onSubmit={handleSubmit}>
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
                required
              />
              <button type="button" onClick={() => setShowPassword((prevState) => !prevState)}>
                Show
              </button>
            </div>
            <Link to="/forgot-password">Forgot Password</Link>
            <div>
              <button>Sign In</button>
            </div>
          </form>
          <Link to="/signup">Sign Up Instead</Link>
        </main>
      </div>
    </>
  );
};

export default SignIn;
