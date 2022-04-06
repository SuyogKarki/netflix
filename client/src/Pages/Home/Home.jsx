import { useEffect, useState } from 'react';
import { Navbar, Featured, List } from '../../components';
import { axiosInstance } from '../../config';
import './Home.scss';

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      console.log(`lists${type ? '?type=' + type : ''}${genre ? '&genre=' + genre : ''}`);
      try {
        const res = await axiosInstance.get(`lists${type ? '?type=' + type : ''}${genre ? '&genre=' + genre : ''}`, {
          headers: {
            token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2Q0MThmN2M1OTBiNTU5Mjk5M2RmYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODMzNzQ4MSwiZXhwIjoxNjQ4NzY5NDgxfQ.PqA_P-pqO8Gs6Q48CFGEKpqG9el31pyN8Nb2fUZ_RKQ`,
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
