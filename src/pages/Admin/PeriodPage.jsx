import React, { Component } from 'react';
import { __, curryN, lensPath, lensProp, path, pipe, set } from 'ramda';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Six } from './Layout';
import Button from './Button';
import LanguageSwitcher from './LanguageSwitcher';
import MarkdownEditor from './Inputs/MarkdownEditor';

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

class PeriodPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLang: 'ru'
    };
    this.langChange = this.langChange.bind(this);
    this.markdownOnBlur = this.markdownOnBlur.bind(this);
  }

  langChange(lang) {
    this.setState({ activeLang: lang });
  }

  markdownOnBlur(fieldPath, { selectionEnd }) {
    this.setState(set(lensProp('markdownState'), { fieldPath, selectionEnd }));
  }

  render() {
    const { period, updateHandler, submitHandler } = this.props;
    const updateFrom = curryN(2, (getValue, lens) =>
      pipe(getValue, set(lens, __, period), updateHandler));

    const updateInput = updateFrom(path(['target', 'value']));

    return period ? (
      <Container>
        <Six>
          <Header>
            <Back to='/admin'>
              ← к таблице лагерей
            </Back>
            <div>
              <Title>{ period.name[this.state.activeLang] }</Title>
              <Period>{ `${period.year_start} – ${period.year_end}` }</Period>
            </div>
            <Button
              color='orange'
              onClick={submitHandler.bind(null, period)}
            >Сохранить</Button>
          </Header>
        </Six>
        <Six>
          <LanguageSwitcher
            languages={languages}
            activeLang={this.state.activeLang}
            onChange={this.langChange}
          />
        </Six>
        <Six>
          <MarkdownEditor
            title={'Описание периода'}
            source={period.description[this.state.activeLang]}
            onBlur={this.markdownOnBlur.bind(this, ['description', this.state.activeLang])}
            onChange={updateInput(lensPath(['description', this.state.activeLang]))}
          />
        </Six>
      </Container>
    ) : <div>Загрузка</div>;
  }
}

export default PeriodPage;
