import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Heading extends PureComponent {
  render() {
    return (
      <h1>{this.props.children}</h1>
    );
  }
}

Heading.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Heading;
