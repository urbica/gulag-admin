import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
  position: relative;
`;

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

const NotesInput = ({ source, onChange }) => (
  <Wrap>
    <TextArea
      value={source.note}
      onChange={onChange}
    />
    <Underline />
  </Wrap>
);

NotesInput.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      prison_id: PropTypes.number,
      note: PropTypes.string
    })
  ]),
  onChange: PropTypes.func
};

export default NotesInput;
