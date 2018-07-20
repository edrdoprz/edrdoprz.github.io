import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Heading extends PureComponent {
  render() {
    const { children } = this.props;

    return (
      <h1>{children}</h1>
    );
  }
}

Heading.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Heading;
