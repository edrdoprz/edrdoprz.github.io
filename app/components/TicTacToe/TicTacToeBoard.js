import React, { PureComponent } from 'react';
import styled from 'styled-components';

import TicTacToeCells from './TicTacToeCells';

function drawBoard({ ctx, x, y, width, height }) {
  // clear area to be drawn upon
  ctx.clearRect(x, y, width, height);

  ctx.strokeStyle = '#ffffff';

  // left vertical line
  ctx.beginPath();
  ctx.moveTo(x + width / 3, y);
  ctx.lineTo(x + width / 3, y + height);
  ctx.stroke();
  ctx.closePath();

  // right vertical line
  ctx.beginPath();
  ctx.moveTo(x + (2 * width) / 3, y);
  ctx.lineTo(x + (2 * width) / 3, y + height);
  ctx.stroke();
  ctx.closePath();

  // upper horizontal line
  ctx.beginPath();
  ctx.moveTo(x, y + height / 3);
  ctx.lineTo(x + width, y + height / 3);
  ctx.stroke();
  ctx.closePath();

  // bottom horizontal line
  ctx.beginPath();
  ctx.moveTo(x, y + (2 * height) / 3);
  ctx.lineTo(x + width, y + (2 * height) / 3);
  ctx.stroke();
  ctx.closePath();
}

const CenterContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const CanvasContainer = styled.div`
  display: inline-block;
  position: relative;
`;

class TicTacToeBoard extends PureComponent {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas() {
    const ctx = this.canvas.getContext('2d');
    drawBoard({ ctx, x: 0, y: 0, width: 300, height: 300 });
  }

  render() {
    return (
      <CenterContainer>
        <CanvasContainer>
          <canvas ref={(c) => { this.canvas = c; }} width={300} height={300} />
          <TicTacToeCells {...this.props} />
        </CanvasContainer>
      </CenterContainer>
    );
  }
}

export default TicTacToeBoard;
