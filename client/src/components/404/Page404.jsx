import { Link } from 'react-router-dom';
import style from "../404/Page404.module.css"

const Page404 = () => {
  return (
    <div className={style.container} >
      <div className={style.infocontainer}>
            <h4 className={style.title} >Error - 404</h4>
     
            <h3 className={style.title} >Se ha Producido un error, por favor volver a        <Link  to='/home'>Home
            
            </Link></h3>
        <div >
        </div>
      </div>
    </div>
  )
}

export default Page404