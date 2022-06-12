import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';
import GoBackButton from '../components/GoBackButton';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('A recovery email was sent. Please check your spam folder if not received.');
    } catch (error) {
      console.log(error);
      toast.error('Recovery email could not be sent.');
    }
  };

  return (
    <div className="mb-div">
      <header>
        <h2>Forgot Password</h2>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email </label>
          <input type="email" placeholder="Email" id="email" value={email} onChange={onChange} />
          <button type="submit">Send Reset Link</button>
        </form>
        <GoBackButton />
      </main>
    </div>
  );
};

export default ForgotPassword;
