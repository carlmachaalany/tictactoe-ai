import { CellStatus as C, GameName } from '../../types';
import { useContext, useEffect, useState, useTransition } from 'react';
import './TicTacToeGame.scss';
import { getWinnerElseEmpty, generateMinimaxTree, MinimaxNode } from "../../minimax"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faUser, faBrain, faBackward } from '@fortawesome/free-solid-svg-icons';
import { GameNameContext } from '../../contexts/GameNameContext';

const TicTacToeGame = () => {

    const {gameName, setGameName} = useContext(GameNameContext);
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
            <button className="flex mr-auto ml-10 mt-10 text-lg border border-slate-500 p-3 rounded-xl transition ease-in-out hover:scale-105 hover:bg-slate-500"
                onClick={() => setGameName(GameName.NoGameSelected)}><FontAwesomeIcon icon={faBackward}></FontAwesomeIcon><p className='text-sm font-bold ml-2'>Back to Home</p></button>
            <div className='header w-full flex'>
                <div className='align-center'>
                    {winner !== null && winner !== C.Empty ?
                        <h1>Winner is {winner === C.Cross ? "X" : "O"}!</h1> :
                        winner !== null ? <h1>Tie!</h1> : <p className='text-base'>You won't beat me, <br /> but you can try.</p>}
                </div>
            </div>
            <div className={`board ${winner ? "pointer-events-none" : ""}`}>
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
            <div className='flex justify-between mt-5'>
                <button className="text-lg border border-slate-500 p-2 rounded-xl transition ease-in-out hover:scale-105 hover:bg-slate-500"
                    onClick={() => resetGame(true)}><FontAwesomeIcon icon={faLaptop}></FontAwesomeIcon><br /><p className='text-sm font-bold'>AI starts over</p></button>
                <button className="text-lg mx-5 border border-slate-500 p-2 rounded-xl transition ease-in-out hover:scale-105 hover:bg-slate-500"
                    onClick={() => resetGame(false)}><FontAwesomeIcon icon={faUser}></FontAwesomeIcon><br /><p className='text-sm font-bold'>I start over</p></button>
                <button className="text-lg border border-slate-500 p-2 rounded-xl transition ease-in-out hover:scale-105 hover:bg-slate-500"
                    onClick={() => getBestNextMove(node)}><FontAwesomeIcon icon={faBrain}></FontAwesomeIcon><br /><p className='text-sm font-bold'>Play optimal move</p></button>
            </div>
        </>
    )
}

export default TicTacToeGame;