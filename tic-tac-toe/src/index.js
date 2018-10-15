import React from "react";
import ReactDOM from 'react-dom';
import './index.css';

/**
 *生成方格
 *
 * @class Square
 * @extends {React.Component}
 */
/* class Square extends React.Component {
    
    render() {
        return (
            <button className="square"  onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        )
    }
} */

// 可以直接使用函数式组件
function Square(props){
    //注意此处不能使用props.onClick()，否则会直接调用，而不是将其传递过去
    let isWins;
    if(props.isWinner){
        isWins = "winner-square square";
    }else{
        isWins = "square";
    }
    // console.log(isWins);
    return (
        <button 
            onClick={props.onClick}
            className={isWins}>

            {props.value}
        </button>
    )
}
// Square(方格) 组件不再保持自己的 state(状态); 它从父级 Board(棋盘) 组件中接收其值，并在点击时通知其父级组件。我们称这些组件为 受控组件。
/**
 *棋盘，九个方格
 *
 * @class Board
 * @extends {React.Component}
 */
class Board extends React.Component {

    // 状态改变 by tlm start
    /* constructor() {
        super();
        this.state = {
            squares:Array(9).fill(null),
            status:"X"
        }
    }
    handleClick(i) {
        if (this.state.squares[i] != null) return false;//已经填值后就不能再填
        const squares = [...this.state.squares];
        squares[i] = this.state.status;
        this.state.status == "X" ? this.setState({ status: "O" }) : this.setState({ status: "X" })
        this.setState({squares: squares})
    } 
    render(){
        const status = "Next player:" + this.state.status;
        ...
    }
    */
    //状态改变 by tlm end


    //要实现子组件向父组件传递了，onClick传递,将都在父组件中处理
    /* constructor() {
        super();
        this.state = {
            squares:Array(9).fill(null),
            xIsNext:true,
        }
    } 
    handleClick(i) {
        if (this.state.squares[i] != null) return false;
        const squares = [...this.state.squares];
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext:!this.state.xIsNext,
        })
        
    }*/
   

    renderSquare(i){
        let addWinclass =false;
        if (this.props.winnerSquares && (i === (this.props.winnerSquares)[0] || i === (this.props.winnerSquares)[1] || i === (this.props.winnerSquares)[2])){
            addWinclass =true;
        }
        return (
            <Square 
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                isWinner={addWinclass}
            />
        )
        
    }
    listSquare(){
        return [0, 3, 6].map((j) => {
            return (
                <div className="board-row" key={j}>
                    {this.renderSquare(j)}
                    {this.renderSquare(j + 1)}
                    {this.renderSquare(j + 2)}
                </div>
            )
        })
    }
    render() {
        return (
            <div>
                {this.listSquare()}
            </div>
           
        )
    }
}
/**
 *渲染游戏，一个棋盘
 *
 * @class Game
 * @extends {React.Component}
 */
class Game extends React.Component {
    constructor(){
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            order:'asec',
            moves: ['Game start'],
            xIsNext:true
        }
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const historyAll = this.state.history;
        const current = history[history.length - 1];
        const squares = [...current.squares];
        //已经填值或者已经赢了就不能再填
        if (calcWinner(current.squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        const moves = historyAll.map((step, move) => {
            return 'Move #' + (move+1)
        });
        moves.unshift('Game start')
        this.setState({
            history: history.concat({squares:squares}),
            stepNumber: history.length,
            moves: moves,
            xIsNext: !this.state.xIsNext,
        })
    }
    jumpTo(step){
        this.setState({
            stepNumber:step,
            xIsNext:(step % 2) ? false : true,
        })
    }
    orderClick(){
        let orderName = this.state.order === 'asec' ? 'desc':'asec';
        let movesRev = this.state.moves.reverse();
        let historyRev = this.state.history.reverse();
        this.setState({
            order: orderName,
            moves: movesRev,
            history: historyRev
        })

    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calcWinner(current.squares);
        const moveStep = this.state.moves;
        const stepNum = this.state.stepNumber;

        const moves = moveStep.map((step,move) =>{
            return (
                <li key={move}>
                    <a href="javascript:;" onClick={() => this.jumpTo(move)} className={stepNum === move ? "current-step" : ''}>{step}</a>
                </li>
            );
        })
        
        // const moves = history.map((step, move) => {
        //     const desc = move ?
        //         'Move #' + move :
        //         'Game start';
        //     
        //     return (
        //         <li key={move}>
        //             <a href="javascript:;" onClick={() => this.jumpTo(move)} className={this.state.stepNumber === (move) ? "current-step":''}>{desc}</a>
        //         </li>
        //     );
        // });


        let status,overStatus,order = this.state.order;
        if (winner) {
            status = 'Winner:' + current.squares[winner[0]];
            overStatus = 'Game over';
        } else {
            status = "Next player:" + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winnerSquares= {winner}/>
                </div>
                <div className="game-info">
                    <div className="status">{status}</div>
                    <button className="order-btn" onClick={() => this.orderClick()}>{order}</button>
                    <ol>{moves}</ol>
                    <div className="status">{overStatus}</div>
                </div>
            </div>
        )
    }
}
/**
 *计算获胜规则
 *
 * @param {Array} squares 方格的值组
 */
function calcWinner(squares){
    const winArr = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];
    for(let i = 0; i< winArr.length;i++){
        const [a,b,c] = winArr[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return [a,b,c];
        }
    }
    return null;
}

ReactDOM.render(<Game/>, document.getElementById("root"))