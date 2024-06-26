import React from 'react';
import { useParams } from 'react-router-dom';

const RaidBossCP = {
    CHARIZARD_MEGA_Y: 47739,
    YVELTAL: 45899,
    BELDUM: 3296,
    VIKAVOLT: 21228,
    MAGMAR: 17238,
    HORSEA: 3831,
    MAWILE: 12739,
    RHYHORN: 4524,
    WIMPOD: 1894,
    HOOH: 50064,
    TYRANITAR_MEGA: 52433, 
};

function GetCP({ receivedPokemon }) {
    if (!receivedPokemon || !receivedPokemon.names) {
        return <h2>CP: N/A</h2>;
    }

    let upperName = receivedPokemon.names.English.toUpperCase();
    console.log(upperName);
    let {name} = useParams()
    console.log(name)
    
    if (name.startsWith('Mega')) {
        const megaName = name.substring(5).toUpperCase();
        if (megaName === 'CHARIZARD Y') {upperName = 'CHARIZARD_MEGA_Y'} 
        else if (megaName === 'CHARIZARD X') {upperName = 'CHARIZARD_MEGA_X'}
        else if (megaName === 'MEWTWO Y') {upperName = 'MEWTWO_MEGA_Y'}
        else if (megaName === 'MEWTWO X') {upperName = 'MEWTWO_MEGA_X'}
        } 
        
        const CPValue = RaidBossCP[upperName] || 'N/A';  // Handle cases where CP is not found
        
        return (
            <h2>CP: {CPValue}</h2>
        );
    }
        

export default GetCP;
