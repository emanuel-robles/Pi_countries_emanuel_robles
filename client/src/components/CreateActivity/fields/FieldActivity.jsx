

const FieldActivity = ({ field, id, text, textWrong, children }) => {

    return (
        <div >
            <label  htmlFor={id}>{text}</label>
            {children}
            {field.error && <label htmlFor={id} >{textWrong}</label>}
        </div>
    )
}

export default FieldActivity;