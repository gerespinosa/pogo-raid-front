import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PokemonSelector from './components/PokemonSelector';

function ModalPage() {
    let { name } = useParams();
    let upperCaseName = name.toUpperCase();

    const [receivedPokemon, setReceivedPokemon] = useState({});
    const [weather, setWeather] = useState(null);
    const [weatherURL, setWeatherURL] = useState('');
    const [boostedTypes, setBoostedTypes] = useState([]);
    const [activeMega, setActiveMega] = useState('no');

    useEffect(() => {
        async function setPokemon() {
            try {
                let fetchName = upperCaseName;
                if (name.startsWith('Mega')) {
                    const megaName = name.substring(5).toUpperCase();
                    if (megaName === 'CHARIZARD Y' || megaName === 'CHARIZARD X') {
                        fetchName = 'CHARIZARD';
                    } else if (megaName === 'MEWTWO Y' || megaName === 'MEWTWO X') {
                        fetchName = 'MEWTWO';
                    }
                    else {
                        fetchName = megaName;
                    }
                }
                const response = await fetch(`https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex/name/${fetchName}.json`);
                const receivedPokemon = await response.json();
                setReceivedPokemon(receivedPokemon);
                console.log(receivedPokemon);
            } catch (error) {
                console.log(error);
            }
        }
    
        setPokemon();
    }, [upperCaseName, name]);
    

    const getImage = () => {
        if (name.startsWith('Mega')) {
            const megaName = name.substring(5).toUpperCase();
            if (megaName === 'CHARIZARD Y') {
                return receivedPokemon.megaEvolutions?.[`CHARIZARD_MEGA_Y`]?.assets?.image;
            }
            else if (megaName === 'CHARIZARD X') {
                return receivedPokemon.megaEvolutions?.[`CHARIZARD_MEGA_X`]?.assets?.image;
            }
            else if (megaName === 'MEWTWO Y') {
                return receivedPokemon.megaEvolutions?.[`MEWTWO_MEGA_Y`]?.assets?.image;
            }
            else if (megaName === 'MEWTWO X') {
                return receivedPokemon.megaEvolutions?.[`MEWTWO_MEGA_X`]?.assets?.image;
            }
        }
        return receivedPokemon.assets?.image;
    };

    const getShinyImage = () => {
        if (name.startsWith('Mega')) {
            const megaName = name.substring(5).toUpperCase();
            if (megaName === 'CHARIZARD Y') {
                return receivedPokemon.megaEvolutions?.[`CHARIZARD_MEGA_Y`]?.assets?.shinyImage;
            }
            else if (megaName === 'CHARIZARD X') {
                return receivedPokemon.megaEvolutions?.[`CHARIZARD_MEGA_X`]?.assets?.shinyImage;
            }
            else if (megaName === 'MEWTWO Y') {
                return receivedPokemon.megaEvolutions?.[`MEWTWO_MEGA_Y`]?.assets?.shinyImage;
            }
            else if (megaName === 'MEWTWO X') {
                return receivedPokemon.megaEvolutions?.[`MEWTWO_MEGA_X`]?.assets?.shinyImage;
            }
            return receivedPokemon.megaEvolutions?.[`${megaName}_MEGA`]?.assets?.shinyImage;
        }
        return receivedPokemon.assets?.shinyImage;
    };

    const getWeather = (weather) => {
        switch (weather) {
            case "sunnyclear":
                setBoostedTypes(["grass", "fire", "ground"]);
                setWeather("Sunny/Clear");
                setWeatherURL("https://christiancountynow.sagacom.com/files/2023/09/Mostly-sunny-1200-2023-1200x768.jpg");
                return;
            case "rainy":
                setBoostedTypes(["water", "electric", "bug"]);
                setWeather("Rainy");
                setWeatherURL("https://centralca.cdn-anvilcms.net/media/images/2019/01/02/images/Rainy_Weather_pix.max-1200x675.jpg")
                return;
            case "snowy":
                setBoostedTypes(["ice", "steel"]);
                setWeather("Snow");
                setWeatherURL("https://st2.depositphotos.com/1363168/9872/i/950/depositphotos_98723840-stock-photo-winter-background-with-snowy-weather.jpg")
                return;
            case "fog":
                setBoostedTypes(["dark", "ghost"]);
                setWeather("Fog");
                setWeatherURL("https://wpcdn.us-east-1.vip.tn-cloud.net/www.wmdt.com/content/uploads/2021/01/fog-1.jpg")
                return;
            case "partlycloudy":
                setBoostedTypes(["normal", "rock"]);
                setWeather("Partly Cloudy");
                setWeatherURL("https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/iStock-104472907-ec1d53a7c5724086414f13ae0dab8e1b.jpg")
                return;
            case "cloudy":
                setBoostedTypes(["fairy", "fighting", "poison"]);
                setWeather("Cloudy");
                setWeatherURL("https://t4.ftcdn.net/jpg/05/19/21/73/360_F_519217384_tFwN8gAbpr4BKegQPiDcGpFp1m9MYzdf.jpg");
                return;
            case "windy":
                setBoostedTypes(["flying", "dragon", "psychic"]); 
                setWeather("Windy");
                setWeatherURL("https://media.nbcmiami.com/2022/04/GettyImages-523709228-1-e1702663994367.jpg");
                return;
            default:
        }
    };

    const handleChange = (event) => {
        event.preventDefault();
        const weatherValue = event.target.weatherCondition.value;
        const megaValue = event.target.activeMega.value;

        getWeather(weatherValue);
        setActiveMega(megaValue);
    };

    return (
        <div>
            <div className='flex flex-col items-center justify-center p-4 w-full'> 
            <div className='flex flex-col items-center relative w-fit justify-center'>
                <img src={getImage()} alt="pokemon" className='rounded-full bg-sky-200 border-4 border-grey-200 w-48 h-48' />
                <img src={getShinyImage()} alt="pokemon" className={receivedPokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 -right-10 w-24 h-24 rounded-full bg-sky-100 border-2 border-grey-200'} />
            </div>
            <h1 className='text-3xl'>{name}</h1>
            </div>
            <div className='flex items-center justify-center gap-20 bg-yellow-500'>
                <form className='flex gap-20' onSubmit={handleChange} >
                    <div>
                        <h1>Weather condition: </h1>
                        <select name="weatherCondition" id="weatherCondition">
                            <option value="sunnyclear">Sunny/Clear</option>
                            <option value="rainy">Rainy</option>
                            <option value="snowy">Snow</option>
                            <option value="fog">Fog</option>
                            <option value="partlycloudy">Partly cloudy</option>
                            <option value="cloudy">Cloudy</option>
                            <option value="windy">Windy</option>
                        </select>
                    </div>
                    <div>
                        <h1>Active mega: </h1>
                        <select name="activeMega" id="activeMega">
                            <option value="no">No active mega</option>
                            <option value="mega-gengar">Mega Gengar</option>
                        </select>
                    </div>
                    <button type="submit">Set</button>
                </form>
            </div>
            <div className='flex flex-col items-center justify-center gap-20 w-full'>
                <PokemonSelector name={upperCaseName} activeMega={activeMega} weather={weather} />
                <PokemonSelector name={upperCaseName} activeMega={activeMega} weather={weather} />
                <PokemonSelector name={upperCaseName} activeMega={activeMega} weather={weather} />
                <PokemonSelector name={upperCaseName} activeMega={activeMega} weather={weather} />
                <PokemonSelector name={upperCaseName} activeMega={activeMega} weather={weather} />
                <PokemonSelector name={upperCaseName} activeMega={activeMega} weather={weather} />
            </div>
        </div>
    );
}

export default ModalPage;
