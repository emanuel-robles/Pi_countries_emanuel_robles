import { useRef } from 'react';

import imgOK from '../../img/ok_Icon.png';
import imgError from '../../img/error_icon.png';

import style from './Alert.module.css'
import styleBackground from '../CreateActivity/CreateActivity.module.css';
const Alert = ({ title, text, textOK, background, type }) => {

    const alert = useRef();

    const handleOnClick = (e) => {
        e.preventDefault();
        background.current.classList.toggle(styleBackground.showVisibility)
        alert.current.classList.toggle(`${style.openPopUp}`);
    }

    return (
        <div  ref={alert} >
            <img className={style.img}  src={type === 'success' ? imgOK : imgError} alt={'Icon'} />
            <h3 >{title}</h3>
            <p>{text}</p>
            <label  onClick={handleOnClick}  href='#' >{textOK}</label>
       
        </div>
    )
}

export default Alert