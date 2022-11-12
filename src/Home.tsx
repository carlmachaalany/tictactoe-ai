import { useContext, useEffect, useState, useTransition } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';
import { GameName } from './types';
import { GameNameContext } from './contexts/GameNameContext';
import {ReactComponent as SnakePic} from "./assets/snake.svg";

const Home = () => {

    const { gameName, setGameName } = useContext(GameNameContext);

    useEffect(() => {
        console.log(gameName);
    }, [])

    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <h1 className='my-20'>Games I developed:</h1>
            <div className='w-full flex justify-center space-x-10'>
                <button onClick={() => setGameName(GameName.TicTacToe)} className='h-48 w-48 border border-slate-500 rounded-lg grid grid-cols-3 grid-rows-3 transition ease-in hover:scale-105'>
                    <div className='border border-slate-500 w-full h-full rounded-tl-lg'>T</div>
                    <div className='border border-slate-500 w-full h-full'>I</div>
                    <div className='border border-slate-500 w-full h-full rounded-tr-lg'>C</div>
                    <div className='border border-slate-500 w-full h-full'>T</div>
                    <div className='border border-slate-500 w-full h-full'>A</div>
                    <div className='border border-slate-500 w-full h-full'>C</div>
                    <div className='border border-slate-500 w-full h-full rounded-bl-lg'>T</div>
                    <div className='border border-slate-500 w-full h-full'>O</div>
                    <div className='border border-slate-500 w-full h-full rounded-br-lg'>E</div>
                </button>
                <button onClick={() => setGameName(GameName.SnakeGame)} className='py-4 flex flex-col justify-center items-center h-48 w-48 border-2 border-slate-500 rounded-lg transition ease-in hover:scale-105'>
                    <p className='mr-16 font-base'>Snake</p>
                    <SnakePic className='fill-white'></SnakePic>
                    <p className='ml-16 font-base'>Game</p>
                </button>
            </div>
        </div>
    )
}

export default Home;