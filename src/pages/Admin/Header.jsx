/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from './Button';
import FieldTitle from './FieldTitle';

const HeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

const HeaderMiddle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: bold;
`;

const HeaderTitle = styled(FieldTitle)`
  font-size: 14px;
`;

const HeaderBottom = styled.div`
  display: flex;
`;

const Lang = styled.div`
  margin-right: 15px;
  &:last-child {
    margin-right: 0;
  }
`;

const PrisonsCount = styled.div`
  font-size: 36px;
  & span {
    display: inline-block;
    vertical-align: top;
    padding-top: 3px;
    font-size: 14px;
    opacity: 0.5;
  }
`;

const Header = (props) => {
  const {
    createPrison, prisonsCount, publishedRuCount, publishedEnCount, publishedDeCount, onLogout
  } = props;

  return (
    <HeaderWrap>
      <Button onClick={onLogout}>выйти</Button>
      <HeaderMiddle>
        <HeaderTitle>Карточки лагерей</HeaderTitle>
        <HeaderBottom>
          <Lang>
            <PrisonsCount>
              { publishedRuCount }<span>/{ prisonsCount }</span>
            </PrisonsCount>
            На русском
          </Lang>
          <Lang>
            <PrisonsCount>
              { publishedEnCount }<span>/{ prisonsCount }</span>
            </PrisonsCount>
            На английском
          </Lang>
          <Lang>
            <PrisonsCount>
              { publishedDeCount }<span>/{ prisonsCount }</span>
            </PrisonsCount>
            На немецком
          </Lang>
        </HeaderBottom>
      </HeaderMiddle>
      <Button
        color='orange'
        onClick={createPrison}
      >добавить</Button>
    </HeaderWrap>
  );
};

Header.propTypes = {
  createPrison: PropTypes.func,
  prisonsCount: PropTypes.number,
  publishedRuCount: PropTypes.number,
  publishedEnCount: PropTypes.number,
  publishedDeCount: PropTypes.number,
  onLogout: PropTypes.func
};

export default Header;
