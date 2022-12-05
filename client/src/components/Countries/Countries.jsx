import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getCountries } from "../../redux/actions/countries";
import Pagination from './Pagination/Pagination';
import AllCountries from './AllCountries/AllCountries';
import style from "../Countries/Countries.module.css"

const useFetchCountries = (restart = false) => {
    const dispatch = useDispatch();

    const filteredCountries = useSelector(state => state.countries.filteredCountries);
    const loaded = useSelector(state => state.countries.loaded);

    useEffect(() => {
        if (!loaded || restart) dispatch(getCountries());
    }, [loaded,restart,dispatch]);

    return { filteredCountries, loaded }
}


const Countries = () => {
    const [limit, setLimit]= useState({min:0,max:8});
    const[pageNumber,setPageNumber]=useState(1);
    const {filteredCountries, loaded}= useFetchCountries();

    useEffect( ()=>{
        setLimit({min:0, max:8});
        setPageNumber(1);
    },[filteredCountries]);
    
//filterescountry es mayor que 0
// diseñar pagina de error
    return (
        <main className={style.container} >
            <div >
                <h3 className={style.titleContainer} >Countries</h3>
            </div>
            
            {loaded && filteredCountries.length ?
                <AllCountries
                    filteredCountries={filteredCountries}
                    limit={limit}
                />
                :
                <div >
                  Page
                </div>
            }
            {loaded ?
                <Pagination
                    countries={filteredCountries}
                    setLimit={setLimit}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                /> : <></>}
        </main>
    )
}

export default Countries;