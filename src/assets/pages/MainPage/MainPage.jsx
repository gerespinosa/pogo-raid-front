import React, { useState, useEffect } from 'react';

function MainPage() {
    const [mega, setMega] = useState([]);
    const [legendary, setLegendary] = useState([]);
    const [tier3, setTier3] = useState([]);
    const [tier1, setTier1] = useState([]);

    useEffect(() => {
        async function getPokemon() {
            try {
                const response = await fetch('https://pokemon-go-api.github.io/pokemon-go-api/api/raidboss.json');
                const data = await response.json();
                setMega(data.currentList.mega);
                setLegendary(data.currentList.lvl5);
                setTier3(data.currentList.lvl3);
                setTier1(data.currentList.lvl1);
            } catch (error) {
                console.log(error);
            }
        }

        getPokemon();

    }, []);

    const onAvatarClick = (name) => {
        const width = window.screen.width / 2;
        const height = window.screen.height / 2;
        const left = width /2;
        const top = height /2;

        window.open(`/${name}`, 'noopener,noreferrer', `width=${width},height=${height},left=${left},top=${top}`);
    };

    return (
        <div className='flex flex-col items-center justify-center gap-10 p-4'>
            <div className='flex items-center justify-center gap-20'>   
            {mega.map((pokemon, index) => (
                <div key={index} className='flex flex-col items-center relative w-fit' onClick={() => onAvatarClick(pokemon.names.English)}>
                    <img src={pokemon.assets.image} alt="pokemon-image" className='rounded-full bg-sky-200 border-4 border-grey-200 w-48 h-48' />
                    <img src={pokemon.assets.shinyImage} alt="pokemon-image-shiny" className={pokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 -right-10 w-24 h-24 rounded-full bg-sky-100 border-2 border-grey-200'}  />
                    <h1>{pokemon.names.English}</h1>
                </div>
            ))}
            {legendary.map((pokemon, index) => (
                <div key={index} className='flex flex-col items-center relative w-fit' onClick={() => onAvatarClick(pokemon.names.English)}>
                    <img src={pokemon.assets.image} alt="pokemon-image" className='rounded-full bg-sky-200 border-4 border-grey-200 w-48 h-48' />
                    <img src={pokemon.assets.shinyImage} alt="pokemon-image-shiny" className={pokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 -right-10 w-24 h-24 rounded-full bg-sky-100 border-2 border-grey-200'}  />
                    <h1>{pokemon.names.English}</h1>
                </div>
            ))}
            </div>
            <div className='flex items-center justify-center gap-20'>
            {tier3.map((pokemon, index) => (
                <div key={index} className='flex flex-col items-center relative w-fit' onClick={() => onAvatarClick(pokemon.names.English)}>
                    <img src={pokemon.assets.image} alt="pokemon-image" className='rounded-full bg-sky-200 border-4 border-grey-200 w-32 h-32' />
                    <img src={pokemon.assets.shinyImage} alt="pokemon-image-shiny" className={pokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 -right-10 w-16 h-16 rounded-full bg-sky-100 border-2 border-grey-200'}  />
                    <h1>{pokemon.names.English}</h1>
                </div>
            ))}
            </div>
            <div className='flex items-center justify-center gap-20'>
            {tier1.map((pokemon, index) => (
                <div key={index} className='flex flex-col items-center relative w-fit' onClick={() => onAvatarClick(pokemon.names.English)}>
                    <img src={pokemon.assets.image} alt="pokemon-image" className='rounded-full bg-sky-200 border-4 border-grey-200 w-32 h-32' />
                    <img src={pokemon.assets.shinyImage} alt="pokemon-image-shiny" className={pokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 -right-10 w-16 h-16 rounded-full bg-sky-100 border-2 border-grey-200'}  />
                    <h1>{pokemon.names.English}</h1>
                </div>
            ))}
            </div>
        </div>
    );
}

export default MainPage;
