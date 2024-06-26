import React from 'react';

const typeIconsMap = {
    normal: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/1.png?raw=true",
    fighting: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/2.png?raw=true",
    flying: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/3.png?raw=true",
    poison: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/4.png?raw=true",
    ground: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/5.png?raw=true",
    rock: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/6.png?raw=true",
    bug: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/7.png?raw=true",
    ghost: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/8.png?raw=true",
    steel: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/9.png?raw=true",
    fire: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/10.png?raw=true",
    water: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/11.png?raw=true",
    grass: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/12.png?raw=true",
    electric: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/13.png?raw=true",
    psychic: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/14.png?raw=true",
    ice: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/15.png?raw=true",
    dragon: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/16.png?raw=true",
    dark: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/17.png?raw=true",
    fairy: "https://github.com/PokeAPI/sprites/blob/master/sprites/types/generation-viii/sword-shield/18.png?raw=true"
};

function getIcons({ teamMember }) {
    const type1 = teamMember?.primaryType?.names.English.toLowerCase();
    const type2 = teamMember?.secondaryType?.names.English.toLowerCase();

    const typeIcon1 = typeIconsMap[type1];
    const typeIcon2 = typeIconsMap[type2];

    return (
        <div className='flex w-1/2'> 
            {typeIcon1 && <img src={typeIcon1} alt={type1} className={!type2 ? "translate-x-full relative -top-2 border-2 border-grey-200 rounded-md" : "border-2 border-grey-200 rounded-md relative -top-2"} />}
            {typeIcon2 && type1 !== type2 && <img src={typeIcon2} alt={type2} className="border-2 border-grey-200 rounded-md relative -top-2"/>}
        </div>
    );
}

export default getIcons;
