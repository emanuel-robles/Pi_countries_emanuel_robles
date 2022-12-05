import React from 'react'
import style from "../Card/Card.module.css"


const Card = ({ name, flag, continent }) => {
    return (
        <div   >
            <div >
                <img className={style.img} src={flag} alt={`${name} flag`} />
            </div>
            <div >
                <h4 className={style.h4} >{name}</h4>
                <h4 className={style.h4} >Continent</h4>
                <p className={style.h4} >{continent}</p>
            </div>
        </div>
    )
}

export default Card