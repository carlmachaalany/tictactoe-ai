import { CellStatus as C } from './types';
const emptyBoard = [
    [C.Empty, C.Empty, C.Empty],
    [C.Empty, C.Empty, C.Empty],
    [C.Empty, C.Empty, C.Empty]
];

export class MinimaxNode {

    board: C[][];
    value: number;
    successors: MinimaxNode[];
    playerTurn: C;

    constructor(board : C[][] = emptyBoard) {
        this.board = board;
        this.value = 0;
        this.successors = [];
        this.playerTurn = C.Cross;
    }

    generateSuccessors() {
        for (let row=0; row<3; row++) {
            for (let col=0; col<3; col++) {
                if (this.board[row][col] == C.Empty) {
                    let newSuccessorBoard = this.board.map((row: C[]) => [...row]);
                    newSuccessorBoard[row][col] = this.playerTurn;
                    let newSuccessorMinimaxNode = new MinimaxNode(newSuccessorBoard);
                    newSuccessorMinimaxNode.playerTurn = this.playerTurn == C.Round ? C.Cross : C.Round;
                    this.successors.push(newSuccessorMinimaxNode);
                }
            }
        }
    }
}

export const getWinnerElseEmpty = (board : C[][]) => {
    const isValid = (arr: C[]) => arr[0] === arr[1] && arr[1] === arr[2] && arr[0] !== C.Empty;
    const allConfigs = [
        board[0], board[1], board[2],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
    ]
    let winnerConfigs = allConfigs.filter((config: C[]) => isValid(config));
    if (winnerConfigs.length > 0) {
        return winnerConfigs[0][0];
    } else if (board.every((config: C[]) => config.every((cell: C) => [C.Round, C.Cross].includes(cell)))) {
        return C.Empty;
    } else {
        return null;
    }
}

export const getMinimaxValue = (node: MinimaxNode) => {
    let winner = getWinnerElseEmpty(node.board)
    if (winner !== null) {
        if (winner == C.Cross) node.value = 1;
        else if (winner == C.Round) node.value = -1;
        else node.value = 0;
        return node.value;
    }
    node.generateSuccessors();
    if (node.playerTurn === C.Cross) {
        let maxNodeValue = -2;
        for (let i = 0; i<node.successors.length; i++) {
            let successorVal: number = getMinimaxValue(node.successors[i])!;
            if (maxNodeValue === null) maxNodeValue = successorVal;
            else if (successorVal > maxNodeValue) {
                maxNodeValue = successorVal;
            }
        }
        node.value = maxNodeValue;
        return maxNodeValue;
    } else {
        let minNodeValue = 2;
        for (let i = 0; i<node.successors.length; i++) {
            let successorVal: number = getMinimaxValue(node.successors[i])!;
            if (minNodeValue === null) minNodeValue = successorVal;
            else if (successorVal < minNodeValue) {
                minNodeValue = successorVal;
            }
        }
        node.value = minNodeValue;
        return minNodeValue;
    }
}

export const generateMinimaxTree = () => {
    const root = new MinimaxNode();
    getMinimaxValue(root);
    return root;
}