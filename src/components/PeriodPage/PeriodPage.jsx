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
    return (
      <Container>
        <Six>
          <Header>
            <Link to='/admin/prisons'>
              ← к таблице лагерей
            </Link>
            Красный терор
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
          <MarkdownEditor/>
        </Six>
      </Container>
    )
  }
}

export default PeriodPage;