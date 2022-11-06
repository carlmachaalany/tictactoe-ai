import { CellStatus as C } from './types';
const emptyBoard = [
    [C.Empty, C.Empty, C.Empty],
    [C.Empty, C.Empty, C.Empty],
    [C.Empty, C.Empty, C.Empty]
];

export class Node {

    board: C[][];
    value: number | null;
    successors: Node[];
    nextMove: C;

    constructor(board : C[][] = emptyBoard) {
        this.board = board;
        this.value = null;
        this.successors = [];
        this.nextMove = C.Round;
    }

    generateSuccessors() {
        for (let row=0; row<3; row++) {
            for (let col=0; col<3; col++) {
                if (this.board[row][col] == C.Empty) {
                    let newSuccessorBoard = this.board.map((row: C[]) => [...row]);
                    newSuccessorBoard[row][col] = this.nextMove;
                    let newSuccessorNode = new Node(newSuccessorBoard);
                    newSuccessorNode.nextMove = this.nextMove == C.Round ? C.Cross : C.Round;
                    this.successors.push(newSuccessorNode);
                }
            }
        }
    }

    minimaxValue() {
        
    }
}

let root = new Node();
root.generateSuccessors();
console.log(root);
root.successors.forEach((s: any) => {
    console.log(s);
})