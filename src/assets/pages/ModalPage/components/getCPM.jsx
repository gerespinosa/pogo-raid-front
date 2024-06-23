import React, { useState } from 'react';
import { Slider } from '@mui/material';

function getCPM(lvl) {
    switch(lvl) {
        case 1: return 0.094;
        case 1.5: return 0.1351374318;
        case 2: return 0.16639787;
        case 2.5: return 0.192650919;
        case 3: return 0.21573247;
        case 3.5: return 0.2365726613;
        case 4: return 0.25572005;
        case 4.5: return 0.2735303812;
        case 5: return 0.29024988;
        case 5.5: return 0.3060573775;
        case 6: return 0.3210876;
        case 6.5: return 0.3354450362;
        case 7: return 0.34921268;
        case 7.5: return 0.3624577511;
        case 8: return 0.3752356;
        case 8.5: return 0.387592416;
        case 9: return 0.39956728;
        case 9.5: return 0.4111935514;
        case 10: return 0.4225;
        case 10.5: return 0.4329264091;
        case 11: return 0.44310755;
        case 11.5: return 0.4530599591;
        case 12: return 0.4627984;
        case 12.5: return 0.472336093;
        case 13: return 0.48168495;
        case 13.5: return 0.4908558003;
        case 14: return 0.49985844;
        case 14.5: return 0.508701765;
        case 15: return 0.51739395;
        case 15.5: return 0.5259425113;
        case 16: return 0.5343543;
        case 16.5: return 0.5426357375;
        case 17: return 0.5507927;
        case 17.5: return 0.5588305862;
        case 18: return 0.5667545;
        case 18.5: return 0.5745691333;
        case 19: return 0.5822789;
        case 19.5: return 0.5898879072;
        case 20: return 0.5974;
        case 20.5: return 0.6048236651;
        case 21: return 0.6121573;
        case 21.5: return 0.6194041216;
        case 22: return 0.6265671;
        case 22.5: return 0.6336491432;
        case 23: return 0.64065295;
        case 23.5: return 0.6475809666;
        case 24: return 0.65443563;
        case 24.5: return 0.6612192524;
        case 25: return 0.667934;
        case 25.5: return 0.6745818959;
        case 26: return 0.6811649;
        case 26.5: return 0.6876849038;
        case 27: return 0.69414365;
        case 27.5: return 0.70054287;
        case 28: return 0.7068842;
        case 28.5: return 0.7131691091;
        case 29: return 0.7193991;
        case 29.5: return 0.7255756136;
        case 30: return 0.7317;
        case 30.5: return 0.7347410093;
        case 31: return 0.7377695;
        case 31.5: return 0.7407855938;
        case 32: return 0.74378943;
        case 32.5: return 0.7467812109;
        case 33: return 0.74976104;
        case 33.5: return 0.7527290867;
        case 34: return 0.7556855;
        case 34.5: return 0.7586303683;
        case 35: return 0.76156384;
        case 35.5: return 0.7644860647;
        case 36: return 0.76739717;
        case 36.5: return 0.7702972656;
        case 37: return 0.7731865;
        case 37.5: return 0.7760649616;
        case 38: return 0.77893275;
        case 38.5: return 0.7817900548;
        case 39: return 0.784637;
        case 39.5: return 0.7874736075;
        case 40: return 0.7903;
        case 40.5: return 0.792803968;
        case 41: return 0.79530001;
        case 41.5: return 0.797800015;
        case 42: return 0.8003;
        case 42.5: return 0.802799995;
        case 43: return 0.8053;
        case 43.5: return 0.8078;
        case 44: return 0.81029999;
        case 44.5: return 0.812799985;
        case 45: return 0.81529999;
        case 45.5: return 0.81779999;
        case 46: return 0.82029999;
        case 46.5: return 0.82279999;
        case 47: return 0.82529999;
        case 47.5: return 0.82779999;
        case 48: return 0.83029999;
        case 48.5: return 0.83279999;
        case 49: return 0.83529999;
        case 49.5: return 0.83779999;
        case 50: return 0.84029999;
        default: return 0;
    }
}


const CPMSlider = ({ setCpm }) => {
    const [lvl, setLvl] = useState(40);

    const handleChange = (event, newValue) => {
        setLvl(newValue);
        setCpm(getCPM(newValue));
    };

    return (
        <div className='flex w-full gap-4 justify-between'>
            <h2>LVL </h2>
            <Slider
                defaultValue={40}
                aria-label="Default"
                valueLabelDisplay="auto"
                max={50}
                min={1}
                step={0.5}
                value={lvl}
                onChange={handleChange}
            />
        </div>
    );
};

export default CPMSlider;
