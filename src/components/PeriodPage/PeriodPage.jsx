import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';
import { Container, Six } from '../Layout.jsx';
import Button from '../Button.jsx';
import LanguageSwitcher from '../LanguageSwitcher.jsx';
import MarkdownEditor from '../Inputs/MarkdownEditor';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0,0,0,.3);
`;

const Back = styled(Link)`
  font-size: 12px;
  font-weight: bold;
  color: #000;
  text-transform: uppercase;
  text-decoration: none;
  transition: .2s;
  &:hover {
    opacity: .5;
  }
`;

const Title = styled.div`
  font-size: 36px;
  font-weight: bold;
`;

const Period = styled.div`
  opacity: 0.5;
  font-size: 12px;
  text-align: center;
`;

const languages = {
  ru: 'русский',
  en: 'english',
  de: 'deutsch'
};

class PeriodPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLang: 'ru',
    };
  }

  langChange = (lang) => {
    this.setState({ activeLang: lang })
  };

  render() {
    const { period }= this.props;
    return (
      <Container>
        <Six>
          <Header>
            <Back to='/admin/prisons'>
              ← к таблице лагерей
            </Back>
            <div>
              <Title>{ period.name }</Title>
              <Period>{ period.period }</Period>
            </div>
            <Button color='orange'>Сохранить</Button>
          </Header>
        </Six>
        <Six>
          <LanguageSwitcher
            languages={ languages }
            activeLang={ this.state.activeLang }
            onChange={ this.langChange }
          />
        </Six>
        <Six>
          <MarkdownEditor
            title={ 'Описание периода' }
            source={ period.description[this.state.activeLang] }
          />
        </Six>
      </Container>
    )
  }
}

export default PeriodPage;