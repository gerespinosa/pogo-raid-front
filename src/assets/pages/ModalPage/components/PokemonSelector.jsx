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
    const [cpm, setCpm] = useState(0.7903);
    const [quickDO, setQuickDO] = useState(0);
    const [chargedDO, setChargedDO] = useState(0);
    const [secondChargedDO, set2ndChargedDO] = useState(0);
    const [quickAttack, setQuickAttack] = useState(null);
    const [chargedAttack, setChargedAttack] = useState(null);
    const [secondChargedAttack, setSecondChargedAttack] = useState(null);

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

    const getSTABBonus = (teamMember, quickAttack, chargedAttack, secondChargedAttack) => {
        if (quickAttack) {
            console.log(quickAttack.power);
        }
        if (chargedAttack) {
            console.log(chargedAttack.power);
        }
        if (secondChargedAttack) {
            console.log(secondChargedAttack.power);
        }

        if (teamMember?.primaryType?.names.English === quickAttack?.type?.names.English || teamMember?.secondaryType?.names.English === quickAttack?.type?.names.English) {
            // setQuickDO(quickAttack.power * 1.20)
        } 
        else if (teamMember?.primaryType?.names.English === chargedAttack?.type?.names.English || teamMember?.secondaryType?.names.English === chargedAttack?.type?.names.English) {
            // setChargedDO(chargedAttack.power * 1.20)
        } 
        else if (secondAttack && (teamMember?.primaryType?.names.English === secondChargedAttack?.type?.names.English || teamMember?.secondaryType?.names.English === secondChargedAttack?.type?.names.English)) {
            // set2ndChargedDO(secondChargedAttack.power * 1.20)
        }

        console.log(quickDO, chargedDO, secondChargedDO);
    };

    useEffect(() => {
        getSTABBonus(teamMember, quickAttack, chargedAttack, secondChargedAttack);
        console.log(quickDO, chargedDO, secondChargedDO);
    }, [teamMember, quickAttack, chargedAttack, secondChargedAttack]);

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
                <div className='flex w-full bg-green-200 justify-between gap-4'>
                    {teamMember && <img src={teamMember.assets.image} alt={teamMember.names.English} className='min-w-24 min-h-24' />}
                    <div className='flex flex-col gap-2 w-1/4'>
                        <IVsSlider 
                            setAttackIVs={setAttackIVs}
                            setDefenseIVs={setDefenseIVs}
                            setHpIVs={setHpIVs}
                        />
                        <CPMSlider setCpm={setCpm} />
                    </div>
                    <div className='flex flex-col w-1/4'>
                        <h1>CP: {pokemonCP}</h1>
                        <div className='flex'>
                            <Switch checked={secondAttack} onChange={handleSwitchChange} />
                        </div>
                        <select name="quickA" id="quick-attack" className='w-full' onChange={(event) => {
                            const selectedMove = JSON.parse(event.target.value);
                            console.log('Selected Quick Move:', selectedMove);
                            setQuickAttack(selectedMove);
                        }}>
                            {quickA.map((move, index) => (
                                <option key={index} value={JSON.stringify(move)}>
                                    {`${move.names.English} (${move.type.names.English}) (${move.type.names.English === teamMember?.primaryType?.names.English ? parseFloat((move.power * 1.20).toFixed(2)) : move.power}) (${move.energy}) (${parseFloat((move.durationMs / 1000).toFixed(2))}s)`}
                                </option>
                            ))}
                        </select>
                        <select name="chargedA" id="charged-attack" className='w-full' onChange={(event) => {
                            const selectedMove = JSON.parse(event.target.value);
                            console.log('Selected Charged Move:', selectedMove);
                            setChargedAttack(selectedMove);
                        }}>
                            {chargedA.map((move, index) => (
                                <option key={index} value={JSON.stringify(move)}>
                                    {`${move.names.English} (${move.type.names.English}) (${move.type.names.English === teamMember?.primaryType?.names.English ? parseFloat((move.power * 1.20).toFixed(2)) : move.power}) (${move.energy}) (${parseFloat((move.durationMs / 1000).toFixed(2))}s)`}
                                </option>
                            ))}
                        </select>
                        {secondAttack && (
                            <select name="secondChargedA" id="second-charged-attack" className='w-full' onChange={(event) => {
                                const selectedMove = JSON.parse(event.target.value);
                                console.log('Selected Second Charged Move:', selectedMove);
                                setSecondChargedAttack(selectedMove);
                            }}>
                                {chargedA.map((move, index) => (
                                    <option key={index} value={JSON.stringify(move)}>
                                        {`${move.names.English} (${move.type.names.English}) (${move.type.names.English === teamMember?.primaryType?.names.English ? parseFloat((move.power * 1.20).toFixed(2)) : move.power}) (${move.energy}) (${parseFloat((move.durationMs / 1000).toFixed(2))}s)`}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PokemonSelector;
