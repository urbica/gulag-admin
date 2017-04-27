import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Wrap, Left, Right } from './PrisonCardStyles';
import PrisonChart from './PrisonChart';

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
  closeCard: PropTypes.func
};

export default PrisonCard;
