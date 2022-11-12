import { useEffect, useState } from "react";
import {createBoard, randomIntFromInterval, useInterval, range} from './utils';
import Cell from './Cell';
import {CellStatus, Direction, GameStatus} from './types';

const boardSize = 18;
const boardSizeSquared = boardSize*boardSize;
const upperRow = range(1, boardSize+1, 1);
const lowerRow = range(boardSizeSquared-boardSize+1, boardSizeSquared+1, 1);
const leftCol = range(1, boardSizeSquared-boardSize+2, boardSize);
const rightCol = range(boardSize, boardSizeSquared+1, boardSize);

const SnakeGame = () => {

    const [board, setBoard] = useState(createBoard(boardSize));
    const [score, setScore] = useState(0);
    const [snakeCells, setSnakeCells] = useState([42]);
    const [foodCell, setFoodCell] = useState(randomIntFromInterval(1, boardSizeSquared));
    const [direction, setDirection] = useState(Direction.Right);
    const [gameStatus, setGameStatus] = useState(GameStatus.Intro);
    const [gameCountDown, setGameCountDown] = useState(3);
    const [record, setRecord] = useState(1);

    useInterval(() => {
        if (gameStatus === GameStatus.Intro || gameStatus === GameStatus.Over || gameCountDown !==0) return;
        let nextElement;
        let headOfSnake = snakeCells[snakeCells.length-1]
        if (direction === Direction.Right) {
            if (rightCol.includes(headOfSnake)) setGameOver();
            nextElement = headOfSnake + 1;
            // if ([11,21,31,41,51,61,71,81,91,101,111].includes(nextElement)) setGameOver();
        }
        else if (direction === Direction.Up) {
            if (upperRow.includes(headOfSnake)) setGameOver();
            nextElement = headOfSnake - boardSize;
            // if (([-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1]).includes(nextElement)) setGameOver();
        }
        else if (direction === Direction.Left) {
            if (leftCol.includes(headOfSnake)) setGameOver();
            nextElement = headOfSnake - 1;
            // if (([0,10,20,30,40,50,60,70,80,90,100]).includes(nextElement)) setGameOver();
        }
        else if (direction === Direction.Down) {
            if (lowerRow.includes(headOfSnake)) setGameOver();
            nextElement = headOfSnake + boardSize;
            // if (([101,102,103,104,105,106,107,108,109,110]).includes(nextElement)) setGameOver();
        }
        else nextElement = 1;

        if (snakeCells.includes(nextElement)) {
            setGameOver();
        }

        if (foodCell === nextElement) {
            eatFood();
        } else {
            let newSnakeCells = [...snakeCells, nextElement];
            newSnakeCells.shift();
            setSnakeCells(newSnakeCells);
        }
    }, 115)

    useEffect(() => {
        window.addEventListener('keydown', e => {
            switch (e.key) {
                case "ArrowUp":
                    console.log('up')
                    setDirection(Direction.Up);
                    break;
                case "ArrowDown":
                    setDirection(Direction.Down);
                    break;
                case "ArrowLeft":
                    setDirection(Direction.Left);
                    break;
                case "ArrowRight":
                    setDirection(Direction.Right);
                    break;
            }
        })
    }, []);

    const eatFood = () => {

        setScore(score + 1);

        let newSnakeCells = [...snakeCells, foodCell];
        setSnakeCells(newSnakeCells);

        // generate a random food cell
        let randomCell = randomIntFromInterval(1, boardSizeSquared);
        while (snakeCells.includes(randomCell)) {
            randomCell = randomIntFromInterval(1, boardSizeSquared);
        }
        setFoodCell(randomCell);
    }

    const setGameOver = () => {
        setSnakeCells([42]);
        setFoodCell(randomIntFromInterval(1, boardSizeSquared));
        setDirection(Direction.Right);
        setGameStatus(GameStatus.Over);
        setGameCountDown(3);
        if (score > record) setRecord(score);
    }

    const playAgain = () => {
        setSnakeCells([42]);
        setFoodCell(randomIntFromInterval(1, boardSizeSquared));
        setDirection(Direction.Right);
        setScore(0);
        setGameStatus(GameStatus.Play);
        setGameCountDown(3);
        if (gameCountDown === 3) {
            setTimeout(() => {
                setGameCountDown(2);
                setTimeout(() => {
                    setGameCountDown(1);
                    setTimeout(() => {
                        setGameCountDown(0);
                        return;
                    }, 1000);
                }, 1000);
            }, 1000);
        }
    }



    return (
        <>
        {
            gameStatus === GameStatus.Play ?
                    <>
                        <h1>{gameCountDown!==0 ? gameCountDown : `Score: ${score}`}</h1>
                        {/* <h1>Score: {score}</h1> */}
                        <div className="board">
                            {board.map((row, rowIdx) => (
                                <div key={rowIdx} className="row">
                                    {row.map((cellNum, cellIdx) => (
                                        <Cell
                                            cellKey={cellIdx} 
                                            cellNumber={cellNum} 
                                            row={rowIdx} 
                                            col={cellIdx} 
                                            status={foodCell===cellNum ? CellStatus.Food : snakeCells.includes(cellNum) ? CellStatus.Snake : CellStatus.Normal}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </> :
            gameStatus === GameStatus.Intro ?
                    <>
                        <h1>Welcome to Carl's Snake Game!</h1>
                        <button className="button" onClick={playAgain}>Start Game</button>
                    </> 
            :
                    <>
                        <h1>Game Over!</h1>
                        <h1>Score: {score} <br/> Record: {record}</h1>
                        <button className="button" onClick={playAgain}>Play Again</button>
                    </>
        }
        </>
    )
}

export default SnakeGame;