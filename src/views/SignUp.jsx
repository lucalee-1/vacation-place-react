import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { BallTriangle } from 'react-loader-spinner';
import { db } from '../firebase.config';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const { name, email, password } = formData;
  const [loading, setLoading] = useState(false);

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataNoPw = { ...formData };
      delete formDataNoPw.password;
      formDataNoPw.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataNoPw);

      setLoading(false);

      navigate('/');
      toast.success(`Welcome to Vacation Place, ${name}!`);
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('The email address is already in use');
      } else if (error.code === 'auth/invalid-email') {
        toast.error('The email address is not valid.');
      } else if (error.code === 'auth/operation-not-allowed') {
        toast.error('Operation not allowed.');
      } else if (error.code === 'auth/weak-password') {
        toast.error('The password is too weak.');
      } else {
        toast.error('Something went wrong with registration');
      }
    }
  };
  if (loading) {
    return <BallTriangle height={70} width={70} color="#8ac8f4" ariaLabel="loading" />;
  }
  return (
    <>
      <div className="mb-div">
        <header>
          <h3>Sign Up</h3>
        </header>
        <main>
          <form onSubmit={onSubmit}>
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
                minLength={6}
                required
              />
              <button type="button" onClick={() => setShowPassword((prevState) => !prevState)}>
                Show
              </button>
            </div>
            <Link to="/forgot-password">Forgot Password</Link>
            <div>
              <button type="submit">Sign Up</button>
            </div>
          </form>
          <Link to="/signin">Sign In Instead</Link>
        </main>
      </div>
    </>
  );
};

export default SignUp;
