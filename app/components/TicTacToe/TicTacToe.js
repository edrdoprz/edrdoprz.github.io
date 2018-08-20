import React, { Component } from 'react';
import styled from 'styled-components';

import TicTacToeBoard from './TicTacToeBoard';
import FirstPlayerPicker from './FirstPlayerPicker';
import SymbolPicker from './SymbolPicker';

const Wrapper = styled.div`
  align-items: center;
  background-color: #000000;
  display: flex;
  height: 100%;
  justify-content: center;
  text-align: center;
`;

const PickersWrapper = styled.div`
  margin-left: 5rem;
  min-width: 15rem;
`;

const StartGameButton = styled.button`
  background-color: #000000;
  border: 0.1rem solid white;
  border-radius: 0.5rem;
  color: #ffffff;
  cursor: pointer;
  margin-top: 3rem;
  padding: 1rem;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;

export default class TicTacToe extends Component {
  state = {
    board: [null, null, null, null, null, null, null, null, null],
    currentPlayer: '',
    gameStarted: false,
    myMoves: {},
    mySymbol: '',
    userMoves: {},
    userSymbol: '',
  };

  componentDidUpdate(_, prevState) {
    const {
      currentPlayer,
      gameStarted,
    } = this.state;

    if (gameStarted && !prevState.gameStarted && currentPlayer === 'you') {
      this.computeMyNextMove();
    }
  }

  getCurrentPlayerSymbol = () => {
    const { currentPlayer, userSymbol, mySymbol } = this.state;

    return currentPlayer === 'you' ? mySymbol : userSymbol;
  }

  getNextPlayer = () => {
    const { currentPlayer } = this.state;

    return currentPlayer === 'you' ? 'me' : 'you';
  }

  getBoard = () => {
    const { board } = this.state;

    return board;
  }

  // getWinningMove = () => {
  //   const { board } = this.state;
  //   const availableMoves = board.reduce((acc, cell, index) => {
  //     let moves = acc;

  //     if (cell == null) {
  //       moves = moves.concat([index]);
  //     }

  //     return moves;
  //   }, []);

  //   const winningMove = availableMoves.find((move) => {
  //     const newBoard = this.createNewBoard(move);

  //     return (
  //       this.hasWinningRow(newBoard)
  //       || this.hasWinningColumn(newBoard)
  //       || this.hasWinningDiagonal(newBoard)
  //     );
  //   });

  //   return winningMove;
  // }

  handlePlayerPick = (firstPlayer) => {
    this.setState({
      currentPlayer: firstPlayer,
    });
  }

  handleSymbolPick = (userSymbol) => {
    this.setState({
      mySymbol: userSymbol === 'x' ? 'o' : 'x',
      userSymbol,
    });
  }

  handleStartGame = () => {
    this.setState({
      gameStarted: true,
    });
  }

  handleUserMove = (index) => {
    const {
      board,
      userMoves,
      userSymbol,
    } = this.state;

    if (board[index] == null) {
      this.setState({
        board: this.createNewBoard(index, board, userSymbol),
        currentPlayer: this.getNextPlayer(),
        userMoves: { ...userMoves, [index]: true },
      }, this.computeMyNextMove);
    }
  }

  handleMyMove = (index) => {
    const {
      board,
      myMoves,
      mySymbol,
    } = this.state;

    this.setState({
      board: this.createNewBoard(index, board, mySymbol),
      currentPlayer: this.getNextPlayer(),
      myMoves: { ...myMoves, [index]: true },
    });
  }

  createNewBoard = (index, board, symbol) => {
    const newBoard = [...board.slice(0, index), symbol, ...board.slice(index + 1)];

    return newBoard;
  }

  computeMyNextMove = () => {
    const {
      board,
      lastMove,
    } = this.state;

    const bestMove = this.minimax(board);
    console.log(bestMove);

    this.handleMyMove(bestMove.index);

    // const winningMove = this.getWinningMove();
    // if (winningMove != null) {
    //   console.log(`have winning move: ${winningMove}`);
    // } else {
    //   console.log('no winning move');
    // }
  }

  minimax = (board) => {
    const { mySymbol } = this.state;
    let bestMove = { score: Number.NEGATIVE_INFINITY, index: null };
    for (let i = 0; i < board.length; i += 1) {
      if (board[i] == null) {
        const newBoard = this.createNewBoard(i, board, mySymbol);

        const score = this.minVal(newBoard);
        if (score > bestMove.score) {
          bestMove = { score, index: i };
        }
      }
    }

    return bestMove;
  }

  minVal = (board) => {
    const userWon = this.userHasWon(board);
    const computerWon = this.computerHasWon(board);
    const gameTied = board.filter(cell => cell == null).length === 0;

    // if game ended
    if (computerWon || userWon || gameTied) {
      if (computerWon) {
        return 1;
      }

      if (gameTied) {
        return 0;
      }

      return -1;
    }

    const { userSymbol } = this.state;

    let score = Number.MAX_VALUE;
    for (let i = 0; i < board.length; i += 1) {
      if (board[i] == null) {
        const newBoard = this.createNewBoard(i, board, userSymbol);
        const newScore = this.maxVal(newBoard);
        if (newScore < score) {
          score = newScore;
        }
      }
    }

    return score;
  }

  maxVal = (board) => {
    const userWon = this.userHasWon(board);
    const computerWon = this.computerHasWon(board);
    const gameTied = board.filter(cell => cell == null).length === 0;

    // if game ended
    if (computerWon || userWon || gameTied) {
      if (computerWon) {
        return 1;
      }

      if (gameTied) {
        return 0;
      }

      return -1;
    }

    const { mySymbol } = this.state;

    let score = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < board.length; i += 1) {
      if (board[i] == null) {
        const newBoard = this.createNewBoard(i, board, mySymbol);
        const newScore = this.minVal(newBoard);
        if (newScore > score) {
          score = newScore;
        }
      }
    }

    return score;
  }

  hasWinningRow = (board, symbol) => {
    return (
      (board[0] === symbol && board[1] === symbol && board[2] === symbol)
      || (board[3] === symbol && board[4] === symbol && board[5] === symbol)
      || (board[6] === symbol && board[7] === symbol && board[8] === symbol)
    );
  }

  hasWinningColumn = (board, symbol) => {
    return (
      (board[0] === symbol && board[3] === symbol && board[6] === symbol)
      || (board[1] === symbol && board[4] === symbol && board[7] === symbol)
      || (board[2] === symbol && board[5] === symbol && board[8] === symbol)
    );
  }

  hasWinningDiagonal = (board, symbol) => {
    return (
      (board[0] === symbol && board[4] === symbol && board[8] === symbol) ||
      (board[2] === symbol && board[4] === symbol && board[6] === symbol)
    );
  }

  userHasWon = (board) => {
    const { userSymbol } = this.state;
    return (
      this.hasWinningRow(board, userSymbol)
      || this.hasWinningColumn(board, userSymbol)
      || this.hasWinningDiagonal(board, userSymbol)
    );
  }

  computerHasWon = (board) => {
    const { mySymbol } = this.state;
    return (
      this.hasWinningRow(board, mySymbol)
      || this.hasWinningColumn(board, mySymbol)
      || this.hasWinningDiagonal(board, mySymbol)
    );
  }

  render() {
    const {
      board,
      currentPlayer,
      gameStarted,
      userSymbol,
    } = this.state;

    return (
      <Wrapper>
        <TicTacToeBoard
          board={board}
          onUserMove={this.handleUserMove}
        />
        {!gameStarted && (
          <PickersWrapper>
            <FirstPlayerPicker onPlayerClick={this.handlePlayerPick} selected={currentPlayer} />
            {!!currentPlayer && (
              <SymbolPicker onSymbolClick={this.handleSymbolPick} selected={userSymbol} />
            )}
            {(!!currentPlayer && !!userSymbol) && (
              <StartGameButton onClick={this.handleStartGame}>
                Start Game
              </StartGameButton>
            )}
          </PickersWrapper>
        )}
        {gameStarted && (
          <div>weeeeee</div>
        )}
      </Wrapper>
    );
  }
}
