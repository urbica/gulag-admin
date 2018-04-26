import React from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import TextArea from './TextArea';
import Underline from './Underline';

const NotesInput = ({ note, onChange }) => (
  <Container>
    <TextArea value={note} onChange={({ target }) => onChange(target.value)} />
    <Underline />
  </Container>
);

NotesInput.propTypes = {
  note: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

NotesInput.defaultProps = {
  note: null
};

export default NotesInput;
