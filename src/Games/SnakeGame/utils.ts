import {useEffect, useRef} from 'react';

export function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createBoard(boardSize: number) {
    const board = [];
    let counter = 1;
    for (let row = 0; row<boardSize; row++) {
        let currentRow = [];
        for (let col = 0; col<boardSize; col++) {
            currentRow.push(counter++);
        }
        board.push(currentRow);
    }
    return board;
}

// Copied from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: any, delay: any) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        // @ts-ignore
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
}

export function range(start:number, stop:number, step:number) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
};