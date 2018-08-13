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
    cells: [],
    firstPlayer: '',
    gameStarted: false,
    lastMove: null,
    myMoves: {},
    mySymbol: '',
    userMoves: {},
    userSymbol: '',
  };

  componentWillMount() {
    const cells = [];
    for (let i = 0; i < 9; i += 1) {
      cells.push(null);
    }

    this.setState({
      cells,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      firstPlayer,
      gameStarted,
    } = this.state;

    if (gameStarted && !prevState.gameStarted && firstPlayer === 'you') {
      this.handleMyMove(0);
    }
  }

  handlePlayerPick = (firstPlayer) => {
    this.setState({
      firstPlayer,
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
      cells,
      userMoves,
      userSymbol,
    } = this.state;

    if (!cells[index]) {
      this.setState({
        cells: this.handleCellInsert(index, userSymbol),
        lastMove: index,
        userMoves: { ...userMoves, [index]: true },
      }, this.computeMyNextMove);
    }
  }

  handleMyMove = (index) => {
    const {
      myMoves,
      mySymbol,
    } = this.state;

    this.setState({
      cells: this.handleCellInsert(index, mySymbol),
      lastMove: index,
      myMoves: { ...myMoves, [index]: true },
    });
  }

  handleCellInsert = (index, symbol) => {
    const {
      cells,
    } = this.state;

    const newCells = [...cells.slice(0, index), symbol, ...cells.slice(index + 1)];

    return newCells;
  }

  computeMyNextMove = () => {
    const {
      cells,
      lastMove,
    } = this.state;

    console.log(lastMove);
    switch (lastMove) {
      case 1:
        if (!cells[2]) {
          this.handleMyMove(2);
        } else if (!cells[4]) {
          this.handleMyMove(4);
        }
        break;
      case 2:
        if (!cells[3]) {
          this.handleMyMove(3);
        } else if (!cells[1]) {
          this.handleMyMove(1);
        }
        break;
      case 3:
        if (!cells[2]) {
          this.handleMyMove(2);
        } else if (!cells[6]) {
          this.handleMyMove(6);
        }
        break;
      case 4:
        if (!cells[1]) {
          this.handleMyMove(1);
        } else if (!cells[7]) {
          this.handleMyMove(7);
        }
        break;
      case 5:
        if (!cells[1]) {
          this.handleMyMove(1);
        } else if (!cells[2]) {
          this.handleMyMove(2);
        }
        break;
      case 6:
        if (!cells[3]) {
          this.handleMyMove(3);
        } else if (!cells[9]) {
          this.handleMyMove(9);
        }
        break;
      case 7:
        if (!cells[8]) {
          this.handleMyMove(8);
        } else if (!cells[4]) {
          this.handleMyMove(4);
        }
        break;
      case 8:
        if (!cells[9]) {
          this.handleMyMove(9);
        } else if (!cells[7]) {
          this.handleMyMove(7);
        }
        break;
      case 9:
        if (!cells[8]) {
          this.handleMyMove(8);
        } else if (!cells[6]) {
          this.handleMyMove(6);
        }
        break;
      default:
        break;
    }
  }

  render() {
    const {
      cells,
      firstPlayer,
      gameStarted,
      userSymbol,
    } = this.state;

    return (
      <Wrapper>
        <TicTacToeBoard
          cells={cells}
          onUserMove={this.handleUserMove}
        />
        {!gameStarted && (
          <PickersWrapper>
            <FirstPlayerPicker onPlayerClick={this.handlePlayerPick} selected={firstPlayer} />
            {!!firstPlayer && (
              <SymbolPicker onSymbolClick={this.handleSymbolPick} selected={userSymbol} />
            )}
            {(!!firstPlayer && !!userSymbol) && (
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
