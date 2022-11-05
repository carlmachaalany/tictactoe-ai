import { CellStatus as C } from '../types';
import { useEffect, useState } from 'react';
import './Game.scss';

const Game = () => {

    const [board, setBoard] = useState<C[][]>(
        [
            [C.Empty, C.Empty, C.Empty],
            [C.Empty, C.Empty, C.Empty],
            [C.Empty, C.Empty, C.Empty]
        ]
    )
    const [winner, setWinner] = useState<string | null>(null)
    const [xturn, setXturn] = useState(true);

    useEffect(() => {
        checkIfWin();
    }, [xturn])

    const makeMove = (idxs: number[]) => {
        if (board[idxs[0]][idxs[1]] === C.Empty) {
            let newBoard: C[][] = [...board];
            if (xturn) {
                newBoard[idxs[0]][idxs[1]] = C.Cross;
            } else {
                newBoard[idxs[0]][idxs[1]] = C.Round;
            }
            setXturn(!xturn);
            setBoard(newBoard);
        }
    }

    const checkIfWin = () => {
        const isValid = (arr: C[]) => arr[0] === arr[1] && arr[1] === arr[2] && arr[0] !== C.Empty;
        const allConfigs = [
            board[0], board[1], board[2],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[0][2], board[1][1], board[2][0]]
        ]
        if (allConfigs.some(isValid)) {
            if (xturn) setWinner("O")
            else setWinner("X")
        }
    }

    const resetGame = () => {
        setBoard(
            [
                [C.Empty, C.Empty, C.Empty],
                [C.Empty, C.Empty, C.Empty],
                [C.Empty, C.Empty, C.Empty]
            ]
        )
        setWinner(null);
        setXturn(true);
    }

    return (
        <>
            {winner ? <h1>Winner is {winner} !</h1> : <h1 style={{ visibility: "hidden" }}>W</h1>}
            <div className={`board ${winner ? "disable-board" : ""}`}>
                {board.map((row: C[], rowIdx: number) => (
                    <div key={rowIdx} className="row">
                        {row.map((cell: C, colIdx: number) => (
                            <svg key={colIdx} onClick={() => makeMove([rowIdx, colIdx])} className="cell cross__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                {cell === C.Cross ?
                                    <>
                                        <path className="cross__path cross__path--right" fill="none" d="M16,16 l20,20" />
                                        <path className="cross__path cross__path--left" fill="none" d="M16,36 l20,-20" />
                                    </>
                                    :
                                    cell === C.Round ?
                                        <circle className="cross__circle" cx="26" cy="26" r="11" fill="none" />
                                        :
                                        <></>
                                }
                            </svg>
                        ))}
                    </div>
                ))}
            </div>
            <button className="button" onClick={resetGame}>Reset Game</button>
        </>
    )
}

export default Game;