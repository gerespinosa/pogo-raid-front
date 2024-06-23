import React from 'react'
import { Slider } from '@mui/material';

const IVsSlider = ({ setAttackIVs, setDefenseIVs, setHpIVs }) => {

    const handleAtkChange = (event, newValue) => {
        setAttackIVs(newValue);
    };

    const handleDefChange = (event, newValue) => {
        setDefenseIVs(newValue);
    };

    const handleHPChange = (event, newValue) => {
        setHpIVs(newValue);
    };

    return (
        <div>
            <div className='flex w-full gap-4 justify-end'>
                <h2>ATK</h2>
                <Slider
                    defaultValue={10}
                    valueLabelDisplay="auto"
                    max={15}
                    min={0}
                    step={1}
                    onChange={handleAtkChange}
                />
            </div>
            <div className='flex w-full gap-4 justify-end'>
                <h2>DEF</h2>
                <Slider
                    defaultValue={10}
                    valueLabelDisplay="auto"
                    max={15}
                    min={0}
                    step={1}
                    onChange={handleDefChange}
                />
            </div>
            <div className='flex w-full gap-4 justify-end'>
                <h2>HP</h2>
                <Slider
                    defaultValue={10}
                    valueLabelDisplay="auto"
                    max={15}
                    min={0}
                    step={1}
                    onChange={handleHPChange}
                />
            </div>
        </div>
    );
};

export default IVsSlider;
