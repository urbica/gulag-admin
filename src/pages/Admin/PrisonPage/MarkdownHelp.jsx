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
    <br />
    <div>[urbica.co](http://urbica.co)</div>
    <br />
    <div>![Alt-текст](http://lorempixel.com/100/100)</div>
    <div style={{ backgroundColor: '#fff9d5' }}>
      <br />
      НАЧАЛО_ВРЕЗКИ<br />
      <br />
      ## Заголовок<br />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus adipisci animi
      aspernatur cum, enim harum illo, ipsam minima molestiae neque nisi obcaecati quidem
      repudiandae sunt tempora, tenetur totam ullam.<br />
      <br />
      [urbica.co](http://urbica.co)<br />
      <br />
      ![Alt-текст](http://lorempixel.com/100/100)<br />
      <br />
      КОНЕЦ_ВРЕЗКИ
    </div>
  </Container>
);
