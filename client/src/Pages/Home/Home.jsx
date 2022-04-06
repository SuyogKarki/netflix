import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../authContext/AuthContext';
import { Navbar, Featured, List } from '../../components';
import { axiosInstance } from '../../config';
import './Home.scss';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    const getRandomLists = async () => {
      console.log(`lists${type ? '?type=' + type : ''}${genre ? '&genre=' + genre : ''}`);
      try {
        const res = await axiosInstance.get(`lists${type ? '?type=' + type : ''}${genre ? '&genre=' + genre : ''}`, {
          headers: {
            token: `Bearer ${user.accessToken}`,
          },
        });
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [genre, type]);
  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map(list => (
        <List list={list} />
      ))}
    </div>
  );
};
export default Home;
