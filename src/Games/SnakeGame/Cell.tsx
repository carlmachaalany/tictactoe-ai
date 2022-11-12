import {CellStatus} from './types';

interface Props {
    cellKey: number;
    cellNumber: number;
    row: number;
    col: number;
    status: CellStatus;
}

const Cell = (props: Props) => {
    return (
        <div key={props.cellKey} className={`cell ${props.status==CellStatus.Food ? 'food-cell' : props.status==CellStatus.Snake ? 'snake-cell' : ''}`}></div>
    )
}

export default Cell;