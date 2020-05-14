import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (<Square value={this.props.aSquare[i]} onClick={()=>this.props.onClick(i)} />);
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            history: [{aSquare: Array(9).fill(null)}],
            xIsNext: true,
            stepNumber: 0
        }
    }

    handleClick(i){
        const
            history = this.state.history.slice(0, this.state.stepNumber+1),
            current = history[history.length-1],
            aSquare = current.aSquare.slice();

        if (aSquare[i] || calculateWinner(aSquare)) return;

        aSquare[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: history.concat([{
                aSquare: aSquare
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(index){
        this.setState({
            stepNumber: index,
            xIsNext: index%2 === 0
        });
    }

    render() {
        const
            history = this.state.history,
            current = history[this.state.stepNumber],
            winner = calculateWinner(current.aSquare),
            moves = history.map((step, index)=>{
                const text = index ? 'Перейти к ходу №'+index : 'К началу игры';

                return (
                    <li key={index}>
                        <button onClick={()=>this.jumpTo(index)}>{text}</button>
                    </li>
                );
            });

        let status = winner ? 'Выиграл: '+ winner : ('Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O'));

        return (
            <div className="game">
                <div className="game-board">
                    <Board aSquare={current.aSquare} onClick={(i)=>this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(aSquare){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    for (let i=1; i<lines.length; i++){
        const [a, b, c] = lines[i];

        if (aSquare[a] && aSquare[a]===aSquare[b] && aSquare[a]===aSquare[c]) {
            return aSquare[a]
        }
    }

    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
