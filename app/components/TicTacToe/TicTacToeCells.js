/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const BoardCellContainer = styled.div`
  left: 0;
  position: absolute;
  top: 0;
`;

const BoardCell = styled.span`
  color: #ffffff;
  display: inline-block;
  height: 10rem;
  line-height: 10rem;
  width: 10rem;
  vertical-align: top;
`;

class TicTacToeCells extends PureComponent {
  render() {
    const {
      cells,
      onUserMove,
    } = this.props;

    return (
      <BoardCellContainer>
        {cells.map((cell, index) => (
          <BoardCell onClick={() => onUserMove(index)} key={index}>{cell}</BoardCell>
        ))}
      </BoardCellContainer>
    );
  }
}

TicTacToeCells.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUserMove: PropTypes.func.isRequired,
};

export default TicTacToeCells;
