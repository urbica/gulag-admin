/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FieldTitle from './FieldTitle';

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled(FieldTitle)`
  font-size: 48px;
  text-transform: capitalize;
`;

const Button = styled(Link)`
  display: inline-block;
  color: #000;
  text-decoration: none;
  transition: .2s;
  &:hover {
    opacity: .5;
    transition: .2s;
  }
`;

const Periods = (props) => {
  const { periods } = props;

  return (
    <Wrap>
      <Title>Периоды</Title>
      {
        periods &&
        Object.keys(periods).map(index => (
          <Button
            key={index}
            to={`/admin/period${index}`}
          >{ periods[index].name.ru }</Button>
        ))
      }
    </Wrap>
  );
};

Periods.propTypes = {
  periods: PropTypes.object
};

export default Periods;
