/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Alert from './../Alert/Alert';
import FieldActivity from './fields/FieldActivity';

import { cleanActivity, createActivity } from '../../redux/actions/activities';
import { filterCountries } from './../../redux/actions/countries';

import style from './CreateActivity.module.css';
import styleAlert from '../Alert/Alert.module.css';

const CreateActivity = () => {

  const dispatch = useDispatch();
 
  const countries = useSelector(state => state.countries.filteredCountries);
  const createdActivity = useSelector(state => state.activities.newActivity);

  let [searchParams] = useSearchParams();

  const containerAlert = useRef(null);
  const containerLoading = useRef(null);
  const diffText = useRef(null);

  const inputDuration = useRef(null);
  const selectedSeason = useRef(null);
  const selectedCountries = useRef(null);
  const inputDifficulty = useRef(null);

  const [newActivity, setNewActivity] = useState({
    name: { text: '', error: false },
    difficulty: '1',
    duration: { hours: '', error: false },
    season: { name: '', error: false },
    countries: { all: [], error: false }
  });

  const [alertInfo, setAlertInfo] = useState({ title: '', text: '', textBTN: '', type: '' });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { name, difficulty, duration, season, countries } = newActivity;
    if (!name.text || !difficulty || !Number(duration.hours) || !season.name || !countries.all.length) {
      if (!name.text) {
        setNewActivity(state => { return { ...state, name: { text: state.name.text, error: true } } });
      }
      if (!Number(duration.hours)) {
        setNewActivity(state => { return { ...state, duration: { hours: state.duration.hours, error: true } } });
      }
      if (!season.name) {
        setNewActivity(state => { return { ...state, season: { name: state.season.name, error: true } } });
      }
      if (!countries.all.length) {
        setNewActivity(state => { return { ...state, countries: { all: state.countries.all, error: true } } });
      }
      return showAlert('Error!', 'All inputs are required.', 'OK', 'error');
    }
    showLoading();
    const activity = {
      name: newActivity.name.text,
      difficulty: newActivity.difficulty,
      duration: newActivity.duration.hours,
      season: newActivity.season.name,
      countries: newActivity.countries.all
    }
    dispatch(createActivity(activity));
  }

  const clearForm = () => {
    setNewActivity({
      name: { text: '', error: false },
      difficulty: '1',
      duration: { hours: '', error: false },
      season: { name: '', error: false },
      countries: { all: [], error: false }
    });
    selectedSeason.current.selectedIndex = 0;
    selectedCountries.current.selectedIndex = 0;
    inputDifficulty.current.value = 1;
    changeLblDifficulty(1);
  }

  const showLoading = () => {
    containerLoading.current.classList.add(style.display);
  }

  const handleChangeName = (e) => {
    const value = e.target.value;
    if (!value) {
      setNewActivity(state => { return { ...state, name: { text: value, error: true } } });
      return;
    }
    setNewActivity(state => { return { ...state, name: { text: value, error: false } } });
  }

  const handleChangeDifficulty = (e) => {
    const difficulty = e.target.value
    setNewActivity(state => { return { ...state, difficulty } });
    changeLblDifficulty(difficulty);
  }

  const changeLblDifficulty = (difficulty) => {
    const difficulties = [
      { name: 'Begginer', className: style.veryEasy },
      { name: 'Amateur', className: style.easy },
      { name: 'Normal', className: style.normal },
      { name: 'Professional', className: style.hard },
      { name: 'Expert', className: style.extreme }
      //tienen que definirse si no da error
    ];
    diffText.current.innerText = difficulties[difficulty - 1].name;
    diffText.current.className = difficulties[difficulty - 1].className;
  }

  const hanldeChangeDuration = (e) => {
    const value = e.target.value;
    if (!value) {
      return setNewActivity(state => { return { ...state, duration: { hours: value, error: true } } });
    }
    setNewActivity(state => { return { ...state, duration: { hours: value, error: false } } });
  }

  const hanldeSeasonChange = (e) => {
    const value = e.target.value;
    setNewActivity(state => { return { ...state, season: { name: value, error: false } } });
  }

  const handleCountrySelect = (e) => {
    const country = e.target.value;
    const existsCountry = newActivity.countries.all.find(c => c === country);
    if (existsCountry) return showAlert('Error!', 'You can\'t add the same country twice.', 'OK', 'error');
    setNewActivity(state => { return { ...state, countries: { all: [...newActivity.countries.all, country], error: false } } });
  }


  const dontAllowLeters = (e) => {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
  }

  const showAlert = (title, text, textBTN, type) => {
    setAlertInfo({ title, text, textBTN, type, showed: true });
  }

  useEffect(() => {
    if (newActivity.duration.hours > 24) setNewActivity(state => { return { ...state, duration: { hours: 24, error: false } } });
    if (newActivity.duration.hours < 0) setNewActivity(state => { return { ...state, duration: { hours: 0, error: false } } });
  }, [newActivity.duration.hours]);

  useEffect(() => {
    if (alertInfo.showed) {
      const alert = containerAlert.current.children[0];
      containerAlert.current.classList.add(style.showVisibility);
      alert.classList.add(`${styleAlert.openPopUp}`);
      
    }
  }, [alertInfo]);

  useEffect(() => {
    if (createdActivity.created) {
      containerLoading.current.classList.remove(style.display);
      showAlert('Activity Created', 'Activity has been created successfully =)', 'OK', 'success');
      clearForm();
      // dispatch(cleanActivity()); //Con esto se quita que cuando se ACTUALICE la pagina en modo de desarollo se no aparezca la alerta. 
    } else if (createdActivity.info.error) {
      containerLoading.current.classList.remove(style.display);
      showAlert('Error', createdActivity.info.error, 'OK', 'error')
    }
  }, [createdActivity]);

  useEffect(() => {
    const queryCountry = searchParams.get('country');
    if (queryCountry && countries?.length) {
      const country = countries.find(c => c.id === queryCountry);
      if (country) setNewActivity(state => { return { ...state, countries: { all: [queryCountry], error: false } } });
    }
  }, [countries]);

  useEffect(() => {
    dispatch(filterCountries({ order: 'ASC_ALPHABETICALLY' }));
    return () => {
      dispatch(cleanActivity());
    }
  }, []);
//style.containerLoading es cargando
  return (
    <>
      <div ref={containerLoading} className={style.containerLoading}>
      
       
      </div>
      <div >
        <div >
          <div className={style.container__content__title} >
            <h3 >New Activity</h3>
          </div>
          <form className={style.texto} action="" method="post" onSubmit={handleOnSubmit}>

            <FieldActivity 
              field={newActivity.name}
              id='name'
              text='Name'
              textWrong='Please, type a name for the activity'  
              
              >
              <input className={style.container__form}  autoComplete='off' value={newActivity.name.text} onChange={handleChangeName} type="text" placeholder='Name' id='name' />
            </FieldActivity>

            <div >
              <label className={style.texto}   htmlFor="difficulty">Difficulty</label>
              <input ref={inputDifficulty} defaultValue={1} onChange={handleChangeDifficulty} id='difficulty' type="range" min='1' max='5' />
              <p ref={diffText}  >Begginer</p>
            </div>

            <FieldActivity
              field={newActivity.duration}
              id='duration'
              text='Duration in hours (Max: 24)'
              textWrong='Please, type a duration for the activity'>
              <input className={style.container__form} value={newActivity.duration.hours} ref={inputDuration} onKeyPress={dontAllowLeters} onChange={hanldeChangeDuration} min={0} max={24} type="number" placeholder='Duration' id='duration' />
            </FieldActivity>
            
            <FieldActivity
              field={newActivity.season}
              id='season'
              text='Season'
              textWrong='Please, choose a season for the activity'>
              <select className={style.container__form}  ref={selectedSeason}  onChange={hanldeSeasonChange} defaultValue={'None'} name="continent" id='continent'>
                <option disabled value="None">Select Season</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
              </select>
            </FieldActivity>

            <FieldActivity
              field={newActivity.countries}
              id='countries'
              text='Select a Country'
              textWrong='Please, choose at least one country for the activity'>
              <select className={style.container__form} ref={selectedCountries} onChange={handleCountrySelect} defaultValue={'None'} name="countries" id='countries'>
                <option disabled value="None">Select a Country</option>
                {countries?.map((country) => {
                  return <option key={country.id} value={country.id}>{country.name}</option>
                })}
              </select>
              <div>
                <div >
                  <h4 className={style.text} >Selected Countries</h4>
                  <div >
                    {newActivity.countries.all.length ?
                      <div >
                        {newActivity.countries?.all.map(country => {
                          const actualCountry = countries?.find((c) => c.id === country)
                          if (actualCountry) {
                            return (
                              <div className={style.cardsContainers}  key={actualCountry.id} >
                                     <span className={style.name} >{actualCountry.name}</span>
                                <img className={style.img} src={actualCountry.flag} alt={`${actualCountry.id} flag`} />
                            
                              </div>)
                          }
                          return <div ></div>
                        })}
                      </div> : <p >None</p>}
                  </div>
                </div>
              </div>
            </FieldActivity>

            <div  >
              <button  className={style.btn_Act}  type="submit">Create Activity</button>
            </div>
          </form>
        </div>
      </div>
      <div className={styleAlert.img}  ref={containerAlert}>
        <Alert 
          title={alertInfo.title}
          text={alertInfo.text}
          textBTN={alertInfo.textBTN}
          type={alertInfo.type}
          background={containerAlert}
        />
      </div>
    </>
  )
}

export default CreateActivity;