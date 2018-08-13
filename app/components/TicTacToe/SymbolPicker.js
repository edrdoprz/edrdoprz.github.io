import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
`;

const SymbolPick = styled.button`
  background-color: #000000;
  border: 0.1rem solid white;
  border-radius: 0.5rem;
  color: #ffffff;
  cursor: pointer;
  padding: 2rem;

  &:first-child {
    margin-right: 0.5rem;
  }

  &:focus {
    outline: none;
  }

  &.selected {
    background-color: #ffffff;
    color: #000000;
  }
`;

const SymbolPicks = styled.div`
  display: flex;
`;

class SymbolPicker extends PureComponent {
  render() {
    const {
      onSymbolClick,
      selected,
    } = this.props;

    return (
      <Wrapper>
        <h3>which would you like to be?</h3>
        <SymbolPicks>
          <SymbolPick
            className={selected === 'x' ? 'selected' : null}
            onClick={() => onSymbolClick('x')}
          >
            Xs
          </SymbolPick>
          <SymbolPick
            className={selected === 'o' ? 'selected' : null}
            onClick={() => onSymbolClick('o')}
          >
            Os
          </SymbolPick>
        </SymbolPicks>
      </Wrapper>
    );
  }
}

SymbolPicker.propTypes = {
  onSymbolClick: PropTypes.func.isRequired,
  selected: PropTypes.string,
};

SymbolPicker.defaultProps = {
  selected: '',
};

export default SymbolPicker;
