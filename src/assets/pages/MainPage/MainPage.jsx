import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const [mega, setMega] = useState([]);
    const [legendary, setLegendary] = useState([]);
    const [tier3, setTier3] = useState([]);
    const [tier1, setTier1] = useState([]);

    const navigate = useNavigate();

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
        
        if(window.screen.width < 768) {
            navigate(`/${name}`);
        }else {
            window.open(`/${name}`, 'noopener,noreferrer', `width=${width},height=${height},left=${left},top=${top}`);
        }

    };

    return (
        <>
        <div className='hidden md:flex flex-col w-full min-h-screen h-fit justify-between gap-10 p-4 bg-red-400 overflow-hidden' style={{backgroundImage: 'url(https://img.freepik.com/free-photo/digital-art-beautiful-mountains_23-2151123469.jpg?t=st=1719188958~exp=1719192558~hmac=a54c255638858e232fa6ea2bbe86a365f07b89774863a654ee0c66d284cbacf7&w=1060)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}} >
            <div className='bg-black w-fit h-fit bg-opacity-30 flex fixed top-0 right-0 z-10 rounded-tl-3xl rounded-bl-3xl  '>
                <img src="src/assets/img/logo.png" alt="logo" className='w-32 h-32'/>
            </div>
            {/* CONTAINER MEGA & LEGENDARY */}
                <div className='flex items-center w-full justify-center gap-20'>   
                {/* MEGA */}
                    {mega.map((pokemon, index) => (
                        <div>
                        <div key={index} className='flex flex-col items-center relative rounded-full bg-sky-200 border-4 border-grey-200 w-32 h-32 cursor-pointer' onClick={() => onAvatarClick(pokemon.names.English)} style={{backgroundImage: `url(${pokemon.assets.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} >
                            <div style={{backgroundImage: `url(${pokemon.assets.shinyImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} className={pokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 -right-10 w-16 h-16 rounded-full bg-sky-100 border-2 border-grey-200 cursor-pointer'}/>
                        </div>
                        <h1 className='text-2xl font-bold text-center'>{pokemon.names.English}</h1>
                    </div>
                    ))}
                {/* LEGENDARY */}
                    {legendary.map((pokemon, index) => (
                        <div>
                        <div key={index} className='flex flex-col items-center relative rounded-full bg-sky-200 border-4 border-grey-200 w-32 h-32 cursor-pointer' onClick={() => onAvatarClick(pokemon.names.English)} style={{backgroundImage: `url(${pokemon.assets.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} >
                            <div style={{backgroundImage: `url(${pokemon.assets.shinyImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} className={pokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 -right-10 w-16 h-16 rounded-full bg-sky-100 border-2 border-grey-200 cursor-pointer'}/>
                        </div>
                        <h1 className='text-2xl font-bold text-center'>{pokemon.names.English}</h1>
                        </div>
                    ))}
            </div>
            {/* CONTAINER TIER 3 */}
                <div className='flex items-center h-full w-full justify-center gap-20'>
                    {tier3.map((pokemon, index) => (
                        <div>
                        <div key={index} className='flex flex-col items-center relative rounded-full bg-sky-200 border-4 border-grey-200 w-32 h-32 cursor-pointer' onClick={() => onAvatarClick(pokemon.names.English)} style={{backgroundImage: `url(${pokemon.assets.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} >
                            <div style={{backgroundImage: `url(${pokemon.assets.shinyImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} className={pokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 -right-10 w-16 h-16 rounded-full bg-sky-100 border-2 border-grey-200 cursor-pointer'}/>
                        </div>
                        <h1 className='text-2xl font-bold text-center'>{pokemon.names.English}</h1>
                        </div>
                    ))}
                </div>

            {/* CONTAINER TIER 1 */}
                <div className='flex items-center h-full justify-center gap-20'>
                    {tier1.map((pokemon, index) => (
                        <div>
                        <div key={index} className='flex flex-col items-center relative rounded-full bg-sky-200 border-4 border-grey-200 w-24 h-24 cursor-pointer' onClick={() => onAvatarClick(pokemon.names.English)} style={{backgroundImage: `url(${pokemon.assets.image})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} >
                            <div style={{backgroundImage: `url(${pokemon.assets.shinyImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} className={pokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 -right-10 w-12 h-12 rounded-full bg-sky-100 border-2 border-grey-200 cursor-pointer'}/>
                        </div>
                        <h1 className='text-2xl font-bold text-center'>{pokemon.names.English}</h1>
                    </div>
                    ))}
                </div>
        </div>


        {/* RESPONSIVE SCREEN */}

        <div className='flex flex-col md:hidden bg-sky-200 h-full w-full py-6 px-2 gap-1 relative' style={{backgroundImage: 'url(https://img.freepik.com/free-photo/digital-art-beautiful-mountains_23-2151123469.jpg?t=st=1719188958~exp=1719192558~hmac=a54c255638858e232fa6ea2bbe86a365f07b89774863a654ee0c66d284cbacf7&w=1060)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed'}}>
            <div className='bg-black w-fit h-fit bg-opacity-30 flex fixed top-0 right-0 z-10 rounded-tl-3xl rounded-bl-3xl  '>
                <img src="src/assets/img/logo.png" alt="logo" className='w-16 h-16'/>
            </div>
            {/* MEGA */}
                {mega.map((pokemon, index) => (
                    <div>
                    <div key={index} className='flex h-24 w-5/6 p-1 bg-green-500 border-4 bg-opacity-80 border-purple-500 rounded-sm items-end justify-end transform -skew-x-12 cursor-pointer' onClick={() => onAvatarClick(pokemon.names.English)} style={{backgroundImage: `url(${pokemon.assets.image})`, backgroundSize: 'auto', backgroundPosition: 'left', backgroundRepeat: 'no-repeat'}} >
                        <div style={{backgroundImage: `url(${pokemon.assets.shinyImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} className={pokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 right-10 w-12 h-12 cursor-pointer'}/>
                        <h1 className='text-3xl font-bold shadow-md shadow-black'>{pokemon.names.English}</h1>
                    </div>
                    </div>
                ))}
            {/* LEGENDARY */}
                {legendary.map((pokemon, index) => (
                    <div>
                    <div key={index} className='flex h-24 w-5/6 p-1 bg-purple-500 border-4 bg-opacity-80 border-grey-200 rounded-sm items-end justify-end transform -skew-x-12 cursor-pointer' onClick={() => onAvatarClick(pokemon.names.English)} style={{backgroundImage: `url(${pokemon.assets.image})`, backgroundSize: 'auto', backgroundPosition: 'left', backgroundRepeat: 'no-repeat'}} >
                        <div style={{backgroundImage: `url(${pokemon.assets.shinyImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} className={pokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 right-10 w-12 h-12 cursor-pointer'}/>
                        <h1 className='text-4xl font-bold shadow-md shadow-black'>{pokemon.names.English}</h1>
                    </div>
                    </div>
                ))}
            {/* TIER 3 */}
                {tier3.map((pokemon, index) => (
                    <div>
                    <div key={index} className='flex h-24 w-5/6 p-1 bg-yellow-400 border-4 bg-opacity-80 border-grey-200 rounded-sm items-end justify-end transform -skew-x-12 cursor-pointer' onClick={() => onAvatarClick(pokemon.names.English)} style={{backgroundImage: `url(${pokemon.assets.image})`, backgroundSize: 'auto', backgroundPosition: 'left', backgroundRepeat: 'no-repeat'}} >
                        <div style={{backgroundImage: `url(${pokemon.assets.shinyImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} className={pokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 right-10 w-12 h-12 cursor-pointer'}/>
                        <h1 className='text-4xl font-bold shadow-md shadow-black'>{pokemon.names.English}</h1>
                    </div>
                    </div>
                ))}
            {/* TIER 1 */}
                {tier1.map((pokemon, index) => (
                    <div>
                    <div key={index} className='flex h-24 w-5/6 p-1 bg-pink-400 border-4 bg-opacity-80 border-grey-200 rounded-sm items-end justify-end transform -skew-x-12 cursor-pointer' onClick={() => onAvatarClick(pokemon.names.English)} style={{backgroundImage: `url(${pokemon.assets.image})`, backgroundSize: 'auto', backgroundPosition: 'left', backgroundRepeat: 'no-repeat'}} >
                    <div style={{backgroundImage: `url(${pokemon.assets.shinyImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}} className={pokemon.isShiny ? 'opacity-0' : 'opacity-100 absolute top-0 right-10 w-12 h-12 cursor-pointer'}/>
                        <h1 className='text-4xl font-bold shadow-md shadow-black'>{pokemon.names.English}</h1>
                    </div>
                    </div>
                ))}
        </div>
        </>
    );
}

export default MainPage;


