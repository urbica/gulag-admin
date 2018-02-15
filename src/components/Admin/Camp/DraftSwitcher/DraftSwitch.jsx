import React from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import Switcher from './Switcher';

const DraftSwitch = ({ isPublished, onChange }) => (
  <Container>
    <input
      type='checkbox'
      checked={isPublished}
      onChange={onChange}
    />
    <span>ЧЕРНОВИК</span>
    <span>ОПУБЛИКОВАННО</span>
    <Switcher checked={isPublished} />
  </Container>
);

DraftSwitch.propTypes = {
  isPublished: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DraftSwitch;
