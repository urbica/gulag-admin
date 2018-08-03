/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';

// styled
import Container from './Container';
import Title from './Title';
import Label from './Label';
import Year from './Year';

const CampStatistics = ({ statistics, updatePrisonersAmount }) => (
  <Container>
    <Title>
      Количество заключенных по годам
    </Title>
    {statistics &&
      statistics
        .sort((a, b) => a.get('year') > b.get('year'))
        .map((stat, i) => (
          <Label key={stat.get('year')}>
            <Year>
              {`${stat.get('year')}:`}
            </Year>
            <MaskedInput
              className='input input_inside'
              type='text'
              value={stat.get('prisonersCount')}
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
              guide={false}
              onChange={updatePrisonersAmount.bind(null, i)}
            />
            <div className='inputLine' />
          </Label>
        ))}
  </Container>
);

CampStatistics.propTypes = {
  statistics: PropTypes.object,
  updatePrisonersAmount: PropTypes.func.isRequired
};

CampStatistics.defaultProps = {
  statistics: null
};

export default CampStatistics;
