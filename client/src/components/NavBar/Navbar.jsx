/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import style from './Navbar.module.css';

const Navbar = () => {
  // const navigate = useNavigate();
  const listRef = useRef(null);

  const handleOnClick = () => {
    listRef.current.classList.toggle(style.visible);
  }

  return (
    <nav  >
      <Link to='/home'>
   
      </Link>
      <div className={style.navbar} >
        <ul ref={listRef} className={style.btnsContainer} >
          <li>
            <NavLink className={style.btn} onClick={handleOnClick}  to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink className={style.btn} onClick={handleOnClick} to='/create-activities'>Create Activity</NavLink>
          </li>
          <li>
            <NavLink className={style.btn}  onClick={handleOnClick}  to='/about'>About</NavLink>
          </li>
        </ul>
        <div >
          <a onClick={handleOnClick} href='#'><i ></i></a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;