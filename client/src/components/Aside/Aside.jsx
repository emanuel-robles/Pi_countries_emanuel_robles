/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { filterCountries } from '../../redux/actions/countries';

import style from './Aside.module.css';
import { useFetchActivities } from './../../hooks/useFetchActivities';
import FieldAside from './fields/FieldAside';
const Aside = () => {
    const dispatch = useDispatch();
    const [actualFilters, setActualFilters] = useState({
        name: '',
        order: '', // este hace referencia a alfabeticamente y por poblacion
        continent: '',
        activity: ''
    });
    const [searchedCountry, setSearchedCountry] = useState({ value: '' });

    // const activities = useSelector(state => state.activities.activities);
    const { activities } = useFetchActivities();

    const asideContainer = useRef(null);
    const orderAlphabetically = useRef(null);
    const orderContinent = useRef(null);
    const orderPopulation = useRef(null);
    const orderActivity = useRef(null);

  


    const handleClearFilters = () => {
        setSearchedCountry({ value: '' });
        orderContinent.current.selectedIndex = 0;
        orderAlphabetically.current.selectedIndex = 0;
        orderPopulation.current.selectedIndex = 0;
        orderActivity.current.selectedIndex = 0;
        setActualFilters({ name: '', order: '', continent: '', activity: '' })
  
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
      
        setActualFilters(state => { return { ...state, name: searchedCountry.value.trim() } })
    }

    const handleInputChange = (e) => {
        setSearchedCountry({ value: e.target.value })
    }

    const handleContinentSelect = (e) => {
    
        setActualFilters(state => { return { ...state, continent: e.target.value } });
    }

    const handleAlphabeticallySelect = (e) => {
 
        let order = 'None';
        if (e.target.value === 'Z-A') order = 'DES_ALPHABETICALLY';
        else if (e.target.value === 'A-Z') order = 'ASC_ALPHABETICALLY';
        orderPopulation.current.selectedIndex = 0;
        setActualFilters(state => { return { ...state, order } });
    }

    const handlePopulationSelect = (e) => {
    
        let order = 'None';
        if (e.target.value === 'Descendent') order = 'DES_POPULATION';
        else if (e.target.value === 'Ascendent') order = 'ASC_POPULATION';
        orderAlphabetically.current.selectedIndex = 0;
        setActualFilters(state => { return { ...state, order } });
    }

    const handleActivitySelect = (e) => {
        setActualFilters(state => { return { ...state, activity: e.target.value } });
    }

    useEffect(() => {
        dispatch(filterCountries(actualFilters));
    }, [actualFilters]);

    return (
        <>
    
            <aside ref={asideContainer} >
                
                <p className={style.filterContainer} >Filters:</p>
                <div >
                    <button  className={style.search}   onClick={handleClearFilters}  >Clear Filters</button>
                </div>
                <div >
                    <div className={style.name} >
                        <label htmlFor="filter">By Name</label>
                    </div>
                    <div >
                        <form onSubmit={handleOnSubmit} >
                            <input onChange={handleInputChange} value={searchedCountry.value} type="text" placeholder='Country name' id='filter' />
                            <a onClick={handleOnSubmit} href="#"><i ></i></a>
                        </form>
                    </div>
                </div>

                <FieldAside 
                    id={'continent'}
                    text={'Order by Continent'}
                >
                    <select  className={style.container__form}  onChange={handleContinentSelect} ref={orderContinent} defaultValue={'All'}  id="continent">
                        {Array.from(['All', 'Africa', 'Antarctica', 'Asia', 'Europe', 'South America', 'North America', 'Oceania']).map((continent) => {
                            return <option key={continent} value={continent}>{continent}</option>
                        })
                        }
                    </select>
                </FieldAside>

                <FieldAside
                    id={'orderAlphabetically'}
                    text={'Order Alphabetically'}
                >
                    <select className={style.container__form} onChange={handleAlphabeticallySelect} ref={orderAlphabetically} defaultValue={'None'}  id="orderAlphabetically">
                        <option value='None'>None</option>
                        {Array.from(['A-Z', 'Z-A']).map((order) => {
                            return <option key={order} value={order}>{order}</option>
                        })
                        }
                    </select>
                </FieldAside>

                <FieldAside
                    id={'orderPopulation'}
                    text={'Order by Population'}
                >
                    <select className={style.container__form} ref={orderPopulation} onChange={handlePopulationSelect} defaultValue={'None'}  id="orderPopulation">
                        <option value="None">None</option>
                        {Array.from(['Ascendent', 'Descendent']).map((order) => {
                            return <option key={order} value={order}>{order}</option>
                        })
                        }
                    </select>
                </FieldAside>

                <FieldAside
                    id={'activities'}
                    text={'Order by Activity'}
                >
                    <select className={style.container__form} onChange={handleActivitySelect} ref={orderActivity} defaultValue={'All'}  id="activities">
                        <option value="All">All</option>
                        {activities.all.map((activity) => {
                            return <option key={activity.id} value={activity.name}>{activity.name}</option>
                        })
                        }
                    </select>
                </FieldAside>
            </aside>
        </>
    )
}

export default Aside