import style from "../fields/FieldAside.module.css"

const FieldAside = ({ id, text, children }) => {
    return (
        <div className={style.name} >
            <label htmlFor={id}>{text}</label>
            {children}
        </div>
    )
}

export default FieldAside