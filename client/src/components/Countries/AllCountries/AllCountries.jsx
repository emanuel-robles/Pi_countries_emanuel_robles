import { Link } from 'react-router-dom';
import Card from '../../Card/Card';
import style from "../AllCountries/AllCountries.module.css"


const AllCountries = ({ filteredCountries, limit }) => {

    const countries = [];

    for (let i = limit.min; i <= limit.max; i++) {
        const country = filteredCountries[i];
        if (!country) break;
        countries.push(country);
    }

    return (
        <div className={style.country}  >
            <> {filteredCountries[0]?.error ?
                // cuando no se encontró el país
                <div>
                    <h3 >There is no country with those filters =( <p>Try something else!</p></h3>
                </div>
                // cuando si existe el pais
                :
                countries.map((country) => {
                    return (
                        <div key={country.id}  >
                            <Link to={`/details/${country.id}`}>
                                <Card 
                                    name={country.name}
                                    continent={country.continent}
                                    flag={country.flag}
                                />
                            </Link>
                        </div>
                    )
                }
                )
            }
            </>
        </div>
    )
}

export default AllCountries