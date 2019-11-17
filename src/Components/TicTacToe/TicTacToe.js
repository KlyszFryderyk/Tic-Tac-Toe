import React, { Component } from "react";
import styles from "./TicTacToe.module.scss"

class TicTacToe extends Component {

    state = {
        board: Array(9).fill(null),
        player: "X",
        winner: null
    }
    CheckWinner = () => {
        let WinOptions =
            [
                ["0", "1", "2"],
                ["3", "4", "5"],
                ["6", "7", "8"],
                ["0", "3", "6"],
                ["1", "4", "7"],
                ["2", "5", "8"],
                ["0", "4", "8"],
                ["2", "4", "6"],
            ]

        for (let i = 0; i < WinOptions.length; i++) {
            const [a, b, c] = WinOptions[i];
            let board = this.state.board
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                this.setState({
                    winner: this.state.player
                }, () => { console.log("You won"); })
            }
        }
        localStorage.setItem("board", JSON.stringify(this.state.board));
        localStorage.setItem("winner", JSON.stringify(this.state.winner));
    }

    componentDidUpdate() {
        localStorage.setItem("board", JSON.stringify(this.state.board));
        localStorage.setItem("winner", JSON.stringify(this.state.winner));
    }
    componentDidMount() {
        let board = localStorage.getItem('board');
        let winner = localStorage.getItem('winner');
        if (board === null) {
        } else {
            let board = localStorage.getItem('board');
            board = JSON.parse(board);
            this.setState({ board });
        }
        if (winner === null) {
        } else {
            let winner = localStorage.getItem('winner');
            winner = JSON.parse(winner);
            this.setState({ winner });
        }
    }

    handleOptionChange = (changeEvent) => {
        this.setState({
            player: changeEvent.target.value
        });
    }

    WhoFirst = (event) => {
        event.preventDefault();
        this.setState({
            board: Array(9).fill(null),
            winner: null
        });


        localStorage.setItem("board", JSON.stringify(this.state.board));
    }

    RulesOfGame = (index) => {
        if (this.state.player && !this.state.winner) {
            let newBoard = this.state.board
            if (this.state.board[index] === null) {
                newBoard[index] = this.state.player
                this.setState({
                    board: newBoard,
                    player: this.state.player === "X" ? "O" : "X"
                }, this.CheckWinner())
            }
        }
    }

    render() {
        const Buton = this.state.board.map((button, index) =>
            <button
                key={index}
                value={index}
                onClick={() => this.RulesOfGame(index)}
                className={styles.button}>
                {button}
            </button>
        )
        return (
            <div className={styles.board}>
                <p className={styles.winner}>{this.state.winner === null ? '' : `The winner is:  ${this.state.winner}`}</p>
                <form className={styles.player}>
                    <label>
                        Player X
                    <input
                            type="radio"
                            name="player"
                            value="X"
                            checked={this.state.player === "X"}
                            onChange={this.handleOptionChange}
                        />
                    </label>
                    <label>
                        Player O
                    <input
                            type="radio"
                            name="player"
                            value="O"
                            checked={this.state.player === "O"}
                            onChange={this.handleOptionChange}
                        />
                    </label>
                    <input

                        onClick={(event) => this.WhoFirst(event)}
                        type="submit"
                        value="Reset" />
                </form>
                <div className={styles.gameBoard}> {Buton} </div>
            </div>
        )
    }
};
export default TicTacToe;