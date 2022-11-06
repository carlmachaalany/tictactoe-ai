"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Node = void 0;
var types_1 = require("./types");
var emptyBoard = [
    [types_1.CellStatus.Empty, types_1.CellStatus.Empty, types_1.CellStatus.Empty],
    [types_1.CellStatus.Empty, types_1.CellStatus.Empty, types_1.CellStatus.Empty],
    [types_1.CellStatus.Empty, types_1.CellStatus.Empty, types_1.CellStatus.Empty]
];
var Node = /** @class */ (function () {
    function Node(board) {
        if (board === void 0) { board = emptyBoard; }
        this.board = board;
        this.value = null;
        this.successors = [];
        this.nextMove = types_1.CellStatus.Round;
    }
    Node.prototype.generateSuccessors = function () {
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (this.board[row][col] == types_1.CellStatus.Empty) {
                    var newSuccessorBoard = this.board.map(function (row) { return __spreadArray([], row, true); });
                    newSuccessorBoard[row][col] = this.nextMove;
                    var newSuccessorNode = new Node(newSuccessorBoard);
                    newSuccessorNode.nextMove = this.nextMove == types_1.CellStatus.Round ? types_1.CellStatus.Cross : types_1.CellStatus.Round;
                    this.successors.push(newSuccessorNode);
                }
            }
        }
    };
    return Node;
}());
exports.Node = Node;
var root = new Node();
root.generateSuccessors();
console.log(root);
root.successors.forEach(function (s) {
    console.log(s);
});
