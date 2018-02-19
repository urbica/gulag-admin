import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// styled
import Container from './Container';

const TextArea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  min-height: 300px;
  padding: 13px;
  border: none;
  background-color: #f3f3f3;
  outline: none;
  &:hover {
    background-color: #f9f9f9;
  }
  &:focus + div {
    width: 100%;
  }
`;

const Underline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #000;
  z-index: 10;
  transition: width .3s;
`;

const NotesInput = ({ note, onChange }) => (
  <Container>
    <TextArea
      value={note}
      onChange={onChange}
    />
    <Underline />
  </Container>
);

NotesInput.propTypes = {
  note: PropTypes.string,
  onChange: PropTypes.func
};

NotesInput.defaultProps = {
  note: null,
  onChange: null
};

export default NotesInput;
