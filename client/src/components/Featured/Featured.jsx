import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import './Featured.scss';
import { useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../../config';
import { AuthContext } from '../../authContext/AuthContext';

const Featured = ({ type, setGenre }) => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState({});
  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axiosInstance.get('/movies/find/random?type=' + type, {
          headers: {
            token: `Bearer ${user.stsTokenManager.accessToken}`,
          },
        });
        setContent(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomContent();
  }, [type]);
  return (
    <div className='featured'>
      {type && (
        <div className='category'>
          <span>{type === 'movies' ? 'Movies' : 'Series'}</span>
          <select name='genre' id='genre' onChange={e => setGenre(e.target.value)}>
            <option>Genre</option>
            <option value='adventure'>Adventure</option>
            <option value='comedy'>Comedy</option>
            <option value='crime'>Crime</option>
            <option value='fantasy'>Fantasy</option>
            <option value='historical'>Historical</option>
            <option value='horror'>Horror</option>
            <option value='romance'>Romance</option>
            <option value='sci-fi'>Sci-fi</option>
            <option value='thriller'>Thriller</option>
            <option value='western'>Western</option>
            <option value='animation'>Animation</option>
            <option value='drama'>Drama</option>
            <option value='documentary'>Documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt='' />
      <div className='info'>
        <img src={content.imgTitle} alt='' />
        <span className='desc'>{content.desc}</span>
        <div className='buttons'>
          <button className='play'>
            <PlayArrowIcon />
            <span>Play</span>
          </button>
          <button className='more'>
            <InfoOutlinedIcon />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Featured;
