import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import './Watch.scss';
import video from '../../assets/video.mp4';
import { Link, useLocation } from 'react-router-dom';

const Watch = () => {
  const location = useLocation();
  return (
    <div className='watch'>
      <Link to='/'>
        <div className='back'>
          <ArrowBackIosNewOutlinedIcon />
          Home
        </div>
      </Link>
      <video className='video' autoPlay progress controls src={location.state.movie.video} />
    </div>
  );
};
export default Watch;
