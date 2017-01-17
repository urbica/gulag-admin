import React from 'react';
import {browserHistory} from 'react-router';
import Button from '../Button';
import FieldTitle from '../FieldTitle';
import styled from 'styled-components';

const HeaderWrap = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 50px;
  font-family: 'PT Sans', sans-serif;
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

const Rus = styled.div`
  flex-grow: 2;
  margin-right: 40px;
`;

const PrisonsAmount = styled.div`
  font-size: 36px;
  & span {
    display: inline-block;
    vertical-align: top;
    padding-top: 3px;
    font-size: 14px;
    opacity: 0.5;
  }
`;

const En = styled.div`
  color: #3949ab;
`;

class Header extends React.Component {
  render() {
    const createPrison = browserHistory.push.bind(browserHistory, '/admin/prisons/new');
    return (
      <HeaderWrap>
        <Button>выйти</Button>
        <HeaderMiddle>
          <HeaderTitle>Карточки лагерей</HeaderTitle>
          <HeaderBottom>
            <Rus>
              <PrisonsAmount>
                { this.props.ru_prisonsAmount } <span>/{ this.props.prisonsAmount }</span>
              </PrisonsAmount>
              Опубликовано на русском
            </Rus>
            <En>
              <PrisonsAmount>
                { this.props.en_prisonsAmount } <span>/{ this.props.prisonsAmount }</span>
              </PrisonsAmount>
              На английском
            </En>
          </HeaderBottom>
        </HeaderMiddle>
        <Button
          color={'orange'}
          onClick={ createPrison }
        >добавить</Button>
      </HeaderWrap>
    )
  }
}

export default Header;