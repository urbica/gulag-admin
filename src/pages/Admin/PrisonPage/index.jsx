import React from 'react';
import { __, curryN, identity, lensPath, lensProp, path, pipe, set, view } from 'ramda';
import styled from 'styled-components';

import { Container, Six, Four, Three, Two } from '../Layout';
import PrisonHeader from './PrisonHeader';
import LanguageSwitcher from '../LanguageSwitcher';
import DraftSwitch from './DraftSwitch';
import FieldTitle from '../FieldTitle';
import TextInput from '../TextInput';
import SelectInput from '../Inputs/SelectInput';
import PrisonLocation from './PrisonLocation';
import MarkdownEditor from '../Inputs/MarkdownEditor';
import NotesInput from './NotesInput';
import PrisonPhotos from './PrisonPhotos';
import Button from '../Button';
import './PrisonPage.css';

const Fieldset = styled.div`
  margin-bottom: 30px;
  & label:first-of-type {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
`;

const MarkdownDesc = styled.div`
  margin-top: 30px;
  opacity: 0.5;
  & div {
    margin-bottom: 10px;
  }
`;

const Separator = styled.fieldset`
  width: 100%;
  padding: 0;
  border-color: #000;
  border-left: none;
  border-right: none;
  border-bottom: none;
  opacity: 0.3;
  & legend {
    padding: 0 10px;
    margin: auto;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }
`;

const languages = {
  ru: 'русский',
  en: 'english',
  de: 'deutsch'
};

class PrisonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLang: 'ru',
      markdownState: {
        fieldPath: ['description', 'ru'],
        selectionEnd: 0
      }
    };
    this.langChange = this.langChange.bind(this);
    this.markdownOnBlur = this.markdownOnBlur.bind(this);
    this.photoOnClick = this.photoOnClick.bind(this);
  }

  langChange(lang) {
    this.setState({ activeLang: lang });
  }

  markdownOnBlur(fieldPath, { selectionEnd }) {
    this.setState(set(lensProp('markdownState'), { fieldPath, selectionEnd }));
  }

  photoOnClick(url) {
    const { prison, updateHandler } = this.props;
    const { fieldPath, selectionEnd } = this.state.markdownState;

    const imageMarkup = `![](${url})`;

    const value = view(lensPath(fieldPath), prison);
    const newValue = [
      value.slice(0, selectionEnd),
      imageMarkup,
      value.slice(selectionEnd)
    ].join('');

    updateHandler(set(lensPath(fieldPath), newValue, prison));
  }

  render() {
    const {
      prison, photos, uploadHandler, updateHandler, deleteHandler, submitHandler, deletePhoto
    } = this.props;

    const updateFrom = curryN(2, (getValue, lens) =>
      pipe(getValue, set(lens, __, prison), updateHandler));

    const updateField = updateFrom(identity);
    const updateInput = updateFrom(path(['target', 'value']));
    const updateSelect = updateFrom(path(['value']));

    return Boolean(prison) ? (
      <Container>
        <Six>
          <PrisonHeader
            prison={prison}
            deleteHandler={deleteHandler.bind(null, prison)}
          />
        </Six>
        <Six>
          <LanguageSwitcher
            languages={languages}
            activeLang={this.state.activeLang}
            onChange={this.langChange}
          />
        </Six>
        <Six
          justify='center'
          align='center'
        >
          <DraftSwitch
            published={prison.published[this.state.activeLang]}
            onChange={updateField(lensPath(['published', this.state.activeLang]))}
          />
        </Six>
        <Three>
          <Fieldset>
            <FieldTitle>название лагеря</FieldTitle>
            <TextInput
              value={prison.name[this.state.activeLang] || ''}
              onChange={updateInput(lensPath(['name', this.state.activeLang]))}
              placeholder={'Название'}
            />
            <TextInput
              value={prison.additional_names[this.state.activeLang] || ''}
              onChange={updateInput(lensPath(['additional_names', this.state.activeLang]))}
              placeholder='Дополнительные названия, если есть'
            />
          </Fieldset>
        </Three>
        <Three>
          <FieldTitle>Название локации</FieldTitle>
          <TextInput
            placeholder='Название'
            value={prison.location[this.state.activeLang] || ''}
            onChange={updateInput(lensPath(['location', this.state.activeLang]))}
          />
        </Three>
        <Four>
          <MarkdownEditor
            title='Описание лагеря'
            source={prison.description[this.state.activeLang] || ''}
            onBlur={this.markdownOnBlur.bind(this, ['description', this.state.activeLang])}
            onChange={updateInput(lensPath(['description', this.state.activeLang]))}
          />
        </Four>
        <Two>
          <MarkdownDesc>
            <div>## Заголовок</div>
            <div>#### Заголовок четвёртого уровня</div>
            <div>*курсив*</div>
            <div>**полужирное начертание**</div>
            <div>* элемент маркированного списка</div>
            <div>[urbica.co](http://urbica.co)</div>
            <div>![Alt-текст](http://lorempixel.com/100/100)</div>
          </MarkdownDesc>
        </Two>
        <Six>
          <FieldTitle>Заметки</FieldTitle>
          <NotesInput />
        </Six>
        <Six>
          <Separator>
            <legend>Информация, общая для всех языков</legend>
          </Separator>
        </Six>
        <Six>
          <PrisonPhotos
            photos={photos}
            onClick={this.photoOnClick}
            deletePhoto={deletePhoto.bind(null, prison.id)}
            uploadHandler={uploadHandler.bind(null, prison.id)}
          />
        </Six>
        <Three>
          <Fieldset>
            <FieldTitle>Основная деятельность</FieldTitle>
            <SelectInput
              value={prison.activity_id}
              options={this.props.activityOptions}
              clearable={false}
              onChange={updateSelect(lensProp('activity_id'))}
            />
          </Fieldset>
          <Fieldset>
            <FieldTitle>Регион</FieldTitle>
            <SelectInput
              value={prison.place_id}
              options={this.props.placeOptions}
              clearable={false}
              onChange={updateSelect(lensProp('place_id'))}
            />
          </Fieldset>
        </Three>
        <Three>
          <Fieldset>
            <FieldTitle>Тип объекта</FieldTitle>
            <SelectInput
              value={prison.type_id}
              options={this.props.typeOptions}
              clearable={false}
              onChange={updateSelect(lensProp('type_id'))}
            />
          </Fieldset>
        </Three>
        <Six>
          <PrisonLocation
            features={prison.features || []}
            updateFeatures={updateField(lensProp('features'))}
          />
        </Six>
        <Six justify='end'>
          <Button
            color='orange'
            onClick={submitHandler.bind(null, prison, { id: 'notes' })}
          >
            сохранить
          </Button>
        </Six>
      </Container>
    ) : <div>Загрузка...</div>;
  }
}

export default PrisonCard;
