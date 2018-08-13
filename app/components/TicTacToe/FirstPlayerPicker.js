import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  align-items: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const PlayerPick = styled.button`
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

const PlayerPicks = styled.div`
  display: flex;
`;

class FirstPlayerPicker extends PureComponent {
  render() {
    const {
      onPlayerClick,
      selected,
    } = this.props;

    return (
      <Wrapper>
        <h3>who goes first?</h3>
        <PlayerPicks>
          <PlayerPick
            className={selected === 'me' ? 'selected' : null}
            onClick={() => onPlayerClick('me')}
          >
            ME
          </PlayerPick>
          <PlayerPick
            className={selected === 'you' ? 'selected' : null}
            onClick={() => onPlayerClick('you')}
          >
            A.I.
          </PlayerPick>
        </PlayerPicks>
      </Wrapper>
    );
  }
}

FirstPlayerPicker.propTypes = {
  onPlayerClick: PropTypes.func.isRequired,
  selected: PropTypes.string,
};

FirstPlayerPicker.defaultProps = {
  selected: '',
};

export default FirstPlayerPicker;
