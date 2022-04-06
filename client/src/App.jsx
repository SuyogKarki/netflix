import { Home, Watch, Login, Register } from './Pages';
import './App.scss';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './authContext/AuthContext';

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path='/' element={user ? <Home /> : <Navigate to='/register' />} />
      <Route path='/register' element={!user ? <Register /> : <Navigate to='/' />} />
      <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
      {user && (
        <>
          <Route path='/movies' element={<Home type={'movies'} />} />
          <Route path='/series' element={<Home type={'series'} />} />
          <Route path='/watch' element={<Watch />} />
        </>
      )}
    </Routes>
  );
};

export default App;
