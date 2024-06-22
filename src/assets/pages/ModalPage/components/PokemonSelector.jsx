import React, { useState, useEffect } from 'react';
import { Switch } from '@mui/material';
import CPMSlider from './getCPM.jsx';
import IVsSlider from './getIVs.jsx';

function PokemonSelector() {
    const [pokedex, setPokedex] = useState([]);
    const [pokemon, setPokemon] = useState('');
    const [teamMember, setTeamMember] = useState(null);
    const [quickA, setQuickA] = useState([]);
    const [chargedA, setChargedA] = useState([]);
    const [secondAttack, setSecondAttack] = useState(false);
    const [pokemonCP, setPokemonCP] = useState(0);
    const [attackIVs, setAttackIVs] = useState(10);
    const [defenseIVs, setDefenseIVs] = useState(10);
    const [hpIVs, setHpIVs] = useState(10);
    const [cpm, setCpm] = useState(0.7903); // default for level 40

    const onSearch = (e) => {
        e.preventDefault();
        if (pokemon !== '') {
            const foundMember = pokedex.find(item => item.names.English.toLowerCase() === pokemon.toLowerCase());
            if (foundMember) {
                console.log(foundMember);
                setTeamMember(foundMember);
                const quickA = Object.values(foundMember.quickMoves);
                const quickALeg = Object.values(foundMember.eliteQuickMoves);
                const chargedA = Object.values(foundMember.cinematicMoves);
                const chargedALeg = Object.values(foundMember.eliteCinematicMoves);
                quickA.push(...quickALeg);
                chargedA.push(...chargedALeg);
                setQuickA(quickA);
                setChargedA(chargedA);
                console.log(quickA);
                console.log(chargedA);
                calculateCP(
                    foundMember.stats.attack,
                    foundMember.stats.defense,
                    foundMember.stats.stamina,
                    attackIVs,
                    defenseIVs,
                    hpIVs,
                    cpm
                );
            } else {
                setTeamMember(null);
                setQuickA([]);
                setChargedA([]);
                setPokemonCP(0);
            }
        }
    };

    useEffect(() => {
        async function getPokedex() {
            try {
                const response = await fetch('https://pokemon-go-api.github.io/pokemon-go-api/api/pokedex.json');
                const data = await response.json();
                setPokedex(data);
            } catch (error) {
                console.log(error);
            }
        }
        getPokedex();
    }, []);

    const handleChange = (event) => {
        setPokemon(event.target.value);
    };

    const handleSwitchChange = (event) => {
        setSecondAttack(event.target.checked);
    };

    const calculateCP = (attack, defense, stamina, attackIVs, defenseIVs, staminaIVs, cpm) => {
        let attackCP = (attack + attackIVs) * cpm;
        let defenseCP = (defense + defenseIVs) * cpm;
        let staminaCP = (stamina + staminaIVs) * cpm;
        let totalCP = Math.floor((attackCP * Math.sqrt(defenseCP) * Math.sqrt(staminaCP)) / 10);
        setPokemonCP(totalCP);
    };

    useEffect(() => {
        if (teamMember) {
            calculateCP(
                teamMember.stats.attack,
                teamMember.stats.defense,
                teamMember.stats.stamina,
                attackIVs,
                defenseIVs,
                hpIVs,
                cpm
            );
        }
    }, [attackIVs, defenseIVs, hpIVs, cpm, teamMember]);

    return (
        <div className='flex items-center justify-center w-full min-h-72 bg-blue-200'>
            <div className='flex flex-col w-1/2 justify-center '>
                <form className='flex w-full' onSubmit={onSearch}>
                    <input 
                        type="search" 
                        onChange={handleChange} 
                        placeholder="Search" 
                        className='border-2 border-grey-200 rounded-md p-2 w-full' 
                        list='pokedex' 
                        autoComplete='on' 
                    />
                    <datalist id='pokedex'>
                        {pokedex.map((pokemon, index) => (
                            <option key={index} value={pokemon.names.English} />
                        ))}
                    </datalist>
                </form>
                <div className='flex w-full gap-2 bg-green-200 justify-start'>
                    {teamMember && <img src={teamMember.assets.image} alt={teamMember.names.English} className='min-w-24 min-h-24' />}
                    <div className='flex flex-col gap-2 w-1/4'>
                        <IVsSlider 
                            setAttackIVs={setAttackIVs}
                            setDefenseIVs={setDefenseIVs}
                            setHpIVs={setHpIVs}
                        />
                        <CPMSlider 
                            attack={teamMember?.stats?.attack || 0} 
                            defense={teamMember?.stats?.defense || 0} 
                            stamina={teamMember?.stats?.stamina || 0}
                            setCpm={setCpm}
                        />
                        <h1>CP: {pokemonCP}</h1>
                    </div>
                </div>
                <div className='flex w-full justify-center gap-2 bg-sky-200'>
                    <h1>{teamMember?.primaryType?.names?.English}</h1>
                    <h1>{teamMember?.secondaryType?.names?.English}</h1>
                </div>
            </div>
            
            <div className='flex flex-col w-fit min-w-64 justify-around h-1/2 bg-gray-700'>
                <select name="quickA" id="quick-attack" className='w-full'>
                    {quickA.map((move, index) => (
                        <option key={index} value={move.names.English}>
                            {move.names.English}
                        </option>
                    ))}
                </select>

                <select name="chargedA" id="charged-attack" className='w-full'>
                    {chargedA.map((move, index) => (
                        <option key={index} value={move.names.English}>
                            {move.names.English}
                        </option>
                    ))}
                </select>
                <div className='flex w-full gap-2 bg-sky-200 items-center'>
                    <Switch name="second-attack" id="second-attack" onChange={handleSwitchChange} />
                    <p>2nd charged attack</p>
                </div>
                <select name="chargedA" id="charged-attack" className={secondAttack ? 'w-full' : 'hidden'}>
                    {chargedA.map((move, index) => (
                        <option key={index} value={move.names.English}>
                            {move.names.English}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <h1 className='text-md bg-red-500 rounded-md'>Atk: {teamMember?.stats?.attack}</h1>
                <h1 className='text-md bg-blue-500 rounded-md'>Def: {teamMember?.stats?.defense}</h1>
                <h1 className='text-md bg-green-500 rounded-md'>HP: {teamMember?.stats?.stamina}</h1>
                <div>
                    <h1>Friendship lvl: </h1>
                </div>
            </div>
        </div>
    );
}

export default PokemonSelector;
