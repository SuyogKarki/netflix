import './Login.scss';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { loginCall } from '../../authContext/apiCalls';
import { AuthContext } from '../../authContext/AuthContext';

export default function Login() {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = e => {
    e.preventDefault();
    loginCall({ email, password }, dispatch);
  };
  return (
    <div className='login'>
      <div className='top'>
        <div className='wrapper'>
          <img className='logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png' alt='' />
        </div>
      </div>
      <div className='container'>
        <form>
          <h1>Sign In</h1>
          <input type='email' placeholder='Email or phone number' value={email} onChange={e => setEmail(e.target.value)} />
          <input type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
          <button className='loginButton' onClick={handleLogin}>
            Sign In
          </button>
          <span>
            New to Netflix?{' '}
            <Link to='/register' className='link'>
              <b>Sign up now.</b>
            </Link>
          </span>
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a bot. <b>Learn more</b>.
          </small>
        </form>
      </div>
    </div>
  );
}
