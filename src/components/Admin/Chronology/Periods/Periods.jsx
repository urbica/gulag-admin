import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

// styled
import Container from './Container';
import Wrapper from './Wrapper';
import Form from './Form';
import Year from './Year';
import Title from './Title';
import Description from './Description';
import DeleteButton from './DeleteButton';
import Button from './Button';

const Periods = props => {
  const { periods, createPeriod, deletePeriod, changePeriod } = props;

  return (
    <Fragment>
      {periods.toList().map(period => (
        <Container key={period.get('id')}>
          <Wrapper>
            <Form>
              <Year
                placeholder='Год начала периода'
                value={period.get('year')}
                onChange={changePeriod.bind(null, [period.get('id'), 'year'])}
              />
              <Title
                placeholder='Заголовок периода'
                value={period.getIn(['title', 'ru'])}
                onChange={changePeriod.bind(null, [
                  period.get('id'),
                  'title',
                  'ru'
                ])}
              />
              <Description
                placeholder='Описание периода'
                value={period.getIn(['description', 'ru'])}
                onChange={changePeriod.bind(null, [
                  period.get('id'),
                  'description',
                  'ru'
                ])}
              />
            </Form>
            <DeleteButton onClick={deletePeriod.bind(null, period.get('id'))}>
              Удалить
            </DeleteButton>
          </Wrapper>
        </Container>
      ))}
      <Wrapper>
        <Button onClick={createPeriod}>Добавить ещё период</Button>
      </Wrapper>
    </Fragment>
  );
};

Periods.propTypes = {
  periods: PropTypes.object.isRequired,
  createPeriod: PropTypes.func.isRequired,
  changePeriod: PropTypes.func.isRequired,
  deletePeriod: PropTypes.func.isRequired
};

export default Periods;
