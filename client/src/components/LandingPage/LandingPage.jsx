import { Link } from 'react-router-dom';
import style from "../LandingPage/LandingPage.module.css"
const InitialPage = () => {
 
    return (
        <div className={style.btn} >
            <div className={style.img} >
              <div className={style.button} >
                <Link to='/home'  >Start</Link>
                </div>
            </div>
         
        </div>
    )
}

export default InitialPage