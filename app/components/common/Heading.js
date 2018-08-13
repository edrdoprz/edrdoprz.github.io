import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.h1`
  font-size: 2rem;
  line-height: 1.5;
  margin: 0 0 2rem 0;
`;

class Heading extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <Wrapper>{children}</Wrapper>
    );
  }
}

Heading.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Heading;
