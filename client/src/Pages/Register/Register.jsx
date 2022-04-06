import { useRef, useState } from 'react';
import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const emailRef = useRef();
  const passRef = useRef();
  const userRef = useRef();
  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const handleFinish = async e => {
    e.preventDefault();
    setPassword(passRef.current.value);
    setUsername(userRef.current.value);
    try {
      await axiosInstance.post('/auth/register', { email, password, username });
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className='register'>
      <div className='top'>
        <div className='wrapper'>
          <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png' alt='' />

          <button className='loginButton' onClick={() => navigate('/login', { replace: true })}>
            Sign In
          </button>
        </div>
      </div>
      <div className='container'>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime</h2>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        {!email ? (
          <div className='input'>
            <input type='email' placeholder='Email Address' ref={emailRef} />

            <button className='registerButton' onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className='input'>
            <input type='text' placeholder='username' ref={userRef} />
            <input type='password' placeholder='Password' ref={passRef} />
            <button className='registerButton' onClick={e => handleFinish(e)}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Register;
