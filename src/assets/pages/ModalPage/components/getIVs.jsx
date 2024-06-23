import React from 'react';
import { Slider } from '@mui/material';

const IVsSlider = ({ attackIVs, defenseIVs, hpIVs, setAttackIVs, setDefenseIVs, setHpIVs }) => {

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
    <div className='w-full'>
      <div className='flex w-full gap-4 justify-between'>
        <h2 className='font-bold'>ATK:</h2>
        <Slider
          defaultValue={10}
          value={attackIVs}
          valueLabelDisplay="auto"
          max={15}
          min={0}
          step={1}
          onChange={handleAtkChange}
          style={{ width: '100%', maxWidth: '200px' }}
        />
        <h1>{`${attackIVs}`}</h1>
      </div>
      <div className='flex w-full gap-4 justify-between'>
        <h2 className='font-bold'>DEF:</h2>
        <Slider
          defaultValue={10}
          value={defenseIVs}
          valueLabelDisplay="auto"
          max={15}
          min={0}
          step={1}
          onChange={handleDefChange}
          style={{ width: '100%', maxWidth: '200px' }}
        />
        <h1>{`${defenseIVs}`}</h1>
      </div>
      <div className='flex w-full gap-4 justify-between'>
        <h2 className='font-bold'>HP:</h2>
        <Slider
          defaultValue={10}
          value={hpIVs}
          valueLabelDisplay="auto"
          max={15}
          min={0}
          step={1}
          onChange={handleHPChange}
          style={{ width: '100%', maxWidth: '200px' }}
        />
        <h1>{`${hpIVs}`}</h1>
      </div>
    </div>
  );
};

export default IVsSlider;
