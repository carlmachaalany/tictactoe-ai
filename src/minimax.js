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
exports.generateMinimaxTree = exports.getMinimaxValue = exports.getWinnerElseEmpty = exports.MinimaxNode = void 0;
var types_1 = require("./types");
var emptyBoard = [
    [types_1.CellStatus.Empty, types_1.CellStatus.Empty, types_1.CellStatus.Empty],
    [types_1.CellStatus.Empty, types_1.CellStatus.Empty, types_1.CellStatus.Empty],
    [types_1.CellStatus.Empty, types_1.CellStatus.Empty, types_1.CellStatus.Empty]
];
var MinimaxNode = /** @class */ (function () {
    function MinimaxNode(board) {
        if (board === void 0) { board = emptyBoard; }
        this.board = board;
        this.value = 0;
        this.successors = [];
        this.playerTurn = types_1.CellStatus.Cross;
    }
    MinimaxNode.prototype.generateSuccessors = function () {
        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (this.board[row][col] == types_1.CellStatus.Empty) {
                    var newSuccessorBoard = this.board.map(function (row) { return __spreadArray([], row, true); });
                    newSuccessorBoard[row][col] = this.playerTurn;
                    var newSuccessorMinimaxNode = new MinimaxNode(newSuccessorBoard);
                    newSuccessorMinimaxNode.playerTurn = this.playerTurn == types_1.CellStatus.Round ? types_1.CellStatus.Cross : types_1.CellStatus.Round;
                    this.successors.push(newSuccessorMinimaxNode);
                }
            }
        }
    };
    return MinimaxNode;
}());
exports.MinimaxNode = MinimaxNode;
var getWinnerElseEmpty = function (board) {
    var isValid = function (arr) { return arr[0] === arr[1] && arr[1] === arr[2] && arr[0] !== types_1.CellStatus.Empty; };
    var allConfigs = [
        board[0], board[1], board[2],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]]
    ];
    var winnerConfigs = allConfigs.filter(function (config) { return isValid(config); });
    if (winnerConfigs.length > 0) {
        return winnerConfigs[0][0];
    }
    else if (board.every(function (config) { return config.every(function (cell) { return [types_1.CellStatus.Round, types_1.CellStatus.Cross].includes(cell); }); })) {
        return types_1.CellStatus.Empty;
    }
    else {
        return null;
    }
};
exports.getWinnerElseEmpty = getWinnerElseEmpty;
var getMinimaxValue = function (node) {
    // console.log("called with:", MinimaxNode.board);
    var winner = (0, exports.getWinnerElseEmpty)(node.board);
    if (winner !== null) {
        // console.log(winner);
        if (winner == types_1.CellStatus.Cross)
            node.value = 1;
        else if (winner == types_1.CellStatus.Round)
            node.value = -1;
        else
            node.value = 0;
        return node.value;
    }
    node.generateSuccessors();
    if (node.playerTurn === types_1.CellStatus.Cross) {
        var maxNodeValue = -2;
        for (var i = 0; i < node.successors.length; i++) {
            var successorVal = (0, exports.getMinimaxValue)(node.successors[i]);
            if (maxNodeValue === null)
                maxNodeValue = successorVal;
            else if (successorVal > maxNodeValue) {
                maxNodeValue = successorVal;
            }
        }
        node.value = maxNodeValue;
        return maxNodeValue;
    }
    else {
        var minNodeValue = 2;
        for (var i = 0; i < node.successors.length; i++) {
            var successorVal = (0, exports.getMinimaxValue)(node.successors[i]);
            if (minNodeValue === null)
                minNodeValue = successorVal;
            else if (successorVal < minNodeValue) {
                minNodeValue = successorVal;
            }
        }
        node.value = minNodeValue;
        return minNodeValue;
    }
};
exports.getMinimaxValue = getMinimaxValue;
var generateMinimaxTree = function () {
    var root = new MinimaxNode();
    (0, exports.getMinimaxValue)(root);
    return root;
};
exports.generateMinimaxTree = generateMinimaxTree;
// console.log(generateMinimaxTree());
// root.board = [
//     [C.Cross, C.Round, C.Cross],
//     [C.Cross, C.Round, C.Round],
//     [C.Empty, C.Empty, C.Empty]
// ];
// console.log(getMinimaxValue(root));
// root.successors.forEach((s: any) => {
//     if (s.value === 10032) {
//         s.successors.forEach((a: any) => {
//             console.log(a)
//         })
//     }
// })
