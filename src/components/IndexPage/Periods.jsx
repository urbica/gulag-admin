import React from 'react';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import FieldTitle from '../FieldTitle.jsx';

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Title = styled(FieldTitle)`
  font-size: 48px;
  text-transform: capitalize;
`;

const Button = styled.div`
  display: inline-block;
  cursor: pointer;
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
        Object.keys(periods).map((index) => {
          return (
            <Button
              key={ index }
              onClick={ browserHistory.push.bind(browserHistory, `/admin/period/${index}`) }
            >{ periods[index].name.ru }</Button>
          )
        })
      }
    </Wrap>
  )
};

export default Periods;