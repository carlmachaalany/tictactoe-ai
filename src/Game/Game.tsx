import { CellStatus as C } from '../types';
import { useEffect, useState, useTransition } from 'react';
import './Game.scss';
import { getWinnerElseEmpty, generateMinimaxTree, MinimaxNode } from "../minimax"

const Game = () => {

    const [node, setNode] = useState<MinimaxNode>(generateMinimaxTree())
    const [winner, setWinner] = useState<C | null>(null)

    useEffect(() => {
        checkIfWin();
    }, [node])

    const makeMove = (idxs: number[]) => {
        if (node.board[idxs[0]][idxs[1]] === C.Empty) {
            let newBoard: C[][] = node.board.map((row: C[]) => [...row]);
            if (node.playerTurn === C.Cross) {
                newBoard[idxs[0]][idxs[1]] = C.Cross;
            } else {
                newBoard[idxs[0]][idxs[1]] = C.Round;
            }
            for (let i = 0; i < node.successors.length; i++) {
                if (JSON.stringify(node.successors[i].board) == JSON.stringify(newBoard)) {
                    if (node.successors[i].board.every((config: C[]) => config.every((cell: C) => [C.Round, C.Cross].includes(cell)))) {
                        setNode(node.successors[i]);
                    } else {
                        getBestNextMove(node.successors[i]);
                    }
                }
            }
        }
    }

    const checkIfWin = () => {
        let winner = getWinnerElseEmpty(node.board)
        if (winner !== null) {
            setWinner(winner);
        }
    }

    const getBestNextMove = (node: MinimaxNode) => {
        if (winner !== null) return;
        if (node.playerTurn === C.Cross) {
            let maxNode = node.successors[0];
            for (let i = 1; i < node.successors.length; i++) {
                if (node.successors[i].value > maxNode.value) {
                    maxNode = node.successors[i];
                }
            }
            setNode(maxNode);
        } else {
            let minNode = node.successors[0];
            for (let i = 1; i < node.successors.length; i++) {
                if (node.successors[i].value < minNode.value) {
                    minNode = node.successors[i];
                }
            }
            setNode(minNode);
        }
    }

    const resetGame = (AIstarts: boolean) => {
        setWinner(null);
        if (AIstarts) {
            let root = generateMinimaxTree();
            setTimeout(() => getBestNextMove(root), 100)
        } else {
            setNode(generateMinimaxTree())
        }
    }

    return (
        <>
            <div className='header'>
                {winner !== null && winner !== C.Empty ?
                    <h1 className='header-text'>Winner is {winner === C.Cross ? "X" : "O"}!</h1> :
                    winner !== null ? <h1 className='header-text'>Tie!</h1> : <p className='header-text'>You won't beat me, but you can try.</p>}
            </div>
            <div className={`board ${winner ? "disable-board" : ""}`}>
                {node.board.map((row: C[], rowIdx: number) => (
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
            <div className='footer'>
                <button className="button" onClick={() => resetGame(true)}>AI starts over</button>
                <button className="button" onClick={() => resetGame(false)}>I start over</button>
                <button className="button" onClick={() => getBestNextMove(node)}>Generate next best</button>
            </div>
        </>
    )
}

export default Game;