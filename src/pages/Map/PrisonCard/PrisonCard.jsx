import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import PrisonChart from './PrisonChart';

const Wrap = styled.div`
  position: ${props => props.visible ? 'absolute' : 'fixed'};
  top: ${props => props.visible ? '30%' : '100%'};
  display: flex;
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

const Left = styled.div`
  flex: 1 1 auto;
`;
const Right = styled.div`
  flex: 0 0 500px;
`;

const PrisonCard = (props) => {
  const { visible, prison, closeCard } = props;

  if (!prison) {
    return <Wrap visible={visible}>Загрузка</Wrap>;
  }

  return (
    <Wrap visible={visible}>
      <Left>
        <button onClick={closeCard}>закрыть</button>
        <div>{prison.name.ru}</div>
        <ReactMarkdown source={prison.description.ru} />
      </Left>
      <Right>
        <PrisonChart
          features={prison.features}
        />
      </Right>
    </Wrap>
  );
};

PrisonCard.propTypes = {
  visible: PropTypes.bool,
  prison: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  closeCard: PropTypes.func,
  currentYear: PropTypes.number
};

export default PrisonCard;
