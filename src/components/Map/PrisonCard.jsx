import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Wrap = styled.div`
  position: ${props => props.visible ? 'absolute' : 'fixed'};
  top: ${props => props.visible ? '30%' : '100%'};
  width: 100%;
  min-height: 70%;
  padding: 40px 80px 40px 50px;
  background-color: #222;
  color: #fff;
  font-size: 14px;
  font-family: 'PT Sans', sans-serif;
  overflow: scroll;
  transition: .4s;
  z-index: 1;
`;

const PrisonCard = (props) => {
  const { visible, prison, closeCard } = props;

  if (!prison) {
    return <Wrap visible={visible}>Загрузка</Wrap>;
  }

  return (
    <Wrap visible={visible}>
      <button onClick={closeCard}>закрыть</button>
      <div>{prison.name.ru}</div>
      <ReactMarkdown source={prison.description.ru} />
    </Wrap>
  );
};

export default PrisonCard;
