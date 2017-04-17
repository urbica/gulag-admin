import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 30px;
  opacity: 0.5;
  & div {
    margin-bottom: 10px;
  }
`;

export default () => (
  <Container>
    <div>## Заголовок</div>
    <div>#### Заголовок четвёртого уровня</div>
    <div>*курсив*</div>
    <div>**полужирное начертание**</div>
    <div>* элемент маркированного списка</div>
    <div>[urbica.co](http://urbica.co)</div>
    <div>![Alt-текст](http://lorempixel.com/100/100)</div>
  </Container>
);
