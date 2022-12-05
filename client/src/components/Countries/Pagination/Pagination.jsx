import style from "../Pagination/Pagination.module.css"

const Pagination = ({ countries, setLimit, setPageNumber }) => {
    const totalPages = ((countries.length + 1) / 10);

    const handleOnClickPage = (e) => {
//previene que una pagina no se recargue 
        //probar mi aplicacion comentando la linea 8.
        e.preventDefault();

        const page = Number(e.target.innerText);
//es texto que tiene el boton son numeros, tiene que transformarlo a numero.
        if (page === 1) setLimit({ min: 0, max: 8 });
        else setLimit({
            min: ((page - 1) * 10) - 1,
            max: ((page - 1) * 10) + 8
        });
        setPageNumber(page);
    }
    

    const buttonsPage = [];
    for (let i = 0; i < totalPages; i++) {
        buttonsPage.push(i + 1);
    }

    return (
        <div className={style.pages} >
            <div >
                {buttonsPage.map((page) => <button
                className={style.btnPage}
                    onClick={handleOnClickPage}
                    key={page}>{page}</button>
                )}
            </div>
        </div>
    )
}

export default Pagination;