import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });

  const { name, email, password } = formData;
  const navigate = useNavigate;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div>
        <header>
          <h3>Sign Up</h3>
        </header>
        <main>
          <form>
            <div>
              <input
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
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
              <button>Sign Up</button>
            </div>
          </form>
          <Link to="/signin">Sign In Instead</Link>
        </main>
      </div>
    </>
  );
};

export default SignUp;
