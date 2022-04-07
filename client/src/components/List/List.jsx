import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { useRef, useState } from 'react';
import { ListItem } from '..';
import './List.scss';

const List = ({ list }) => {
  const [isMoved, setIsMoved] = useState(false);
  const [offset, setOffset] = useState(0);

  const listRef = useRef();
  const handleClick = d => {
    setIsMoved(true);
    if (d === 'left' && offset < 0) {
      listRef.current.style.transform = `translateX(${offset + 230}px)`;
      setOffset(prev => prev + 230);
    } else if (d === 'right' && offset > -(2300 - window.innerWidth)) {
      listRef.current.style.transform = `translateX(${offset - 230}px)`;
      setOffset(prev => prev - 230);
    }
  };
  return (
    <div className='list'>
      <span className='listTitle'>{list.title}</span>
      <div className='wrapper'>
        <ArrowBackIosNewOutlinedIcon className='sliderArrow left' onClick={() => handleClick('left')} style={{ display: !isMoved && 'none' }} />
        <div className='container' ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem index={i} key={i} item={item} />
          ))}
        </div>
        <ArrowForwardIosOutlinedIcon className='sliderArrow right' onClick={() => handleClick('right')} />
      </div>
    </div>
  );
};
export default List;
