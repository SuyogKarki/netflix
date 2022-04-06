import './ListItem.scss';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config';
import { useNavigate } from 'react-router-dom';

const ListItem = ({ index, item }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axiosInstance.get(`/movies/${item}`, {
          headers: {
            token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyM2Q0MThmN2M1OTBiNTU5Mjk5M2RmYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODMzNzQ4MSwiZXhwIjoxNjQ4NzY5NDgxfQ.PqA_P-pqO8Gs6Q48CFGEKpqG9el31pyN8Nb2fUZ_RKQ`,
          },
        });
        setMovie(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMovie();
  }, [item]);

  return (
    <div
      className='listItem'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onClick={() => navigate('/watch', { state: { movie: movie } })}
    >
      <img src={movie.img} alt='' />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay loop />
          <div className='itemInfo'>
            <div className='icons'>
              <PlayArrowIcon className='icon' />
              <AddIcon className='icon' />
              <ThumbUpOutlinedIcon className='icon' />
              <ThumbDownAltOutlinedIcon className='icon' />
            </div>
            <div className='itemInfoTop'>
              <span>{movie.duration}</span>
              <span className='limit'>+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className='desc'>{movie.desc}</div>
            <div className='genre'>{movie.genre}</div>
          </div>
        </>
      )}
    </div>
  );
};
export default ListItem;
