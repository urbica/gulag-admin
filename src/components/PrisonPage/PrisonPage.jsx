import React from 'react';
import Container from '../Container';
import PrisonHeader from './PrisonHeader.jsx';
import LanguageSwitcher from './LanguageSwitcher.jsx';
import DraftSwitch from './DraftSwitch.jsx';
import FieldTitle from '../FieldTitle';
import TextInput from '../TextInput';
import SelectInput from './Inputs/SelectInput';
import PrisonLocation from './PrisonLocation/PrisonLocation';
import MarkdownEditor from './Inputs/MarkdownEditor';
import PrisonPhotos from './PrisonPhotos';
import Button from '../Button';
import { __, curryN, identity, lensPath, lensProp, path, pipe, set, view } from 'ramda';
import styled from 'styled-components';
import './PrisonPage.css';

const HalfContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 33px;
`;

const Half = styled.div`
  width: 48%;
`;

const Fieldset = styled.div`
  margin-bottom: 33px;
  & div:nth-child(2) input {
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
`;

const SaveButton = styled(Button)`
  margin-left: auto;
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
  }

  langChange = (lang) => {
    this.setState({ activeLang: lang })
  };

  markdownOnBlur = (fieldPath, { selectionEnd }) => {
    this.setState(set(lensProp('markdownState'), { fieldPath, selectionEnd }));
  };

  photoOnClick = (url) => {
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
  };

  render() {
    const {
      prison, photos, uploadHandler, updateHandler,
      deleteHandler, submitHandler
    } = this.props;

    const updateFrom = curryN(2, (getValue, lens) =>
      pipe(getValue, set(lens, __, prison), updateHandler));

    const updateField = updateFrom(identity);
    const updateInput = updateFrom(path(['target', 'value']));
    const updateSelect = updateFrom(path(['value']));

    return (
      <div>
        <Container>
          <PrisonHeader
            prison={ prison }
            deleteHandler={ deleteHandler.bind(null, prison) }
          />
          <LanguageSwitcher
            languages={ languages }
            activeLang={ this.state.activeLang }
            onChange={ this.langChange }
          />
          <DraftSwitch
            published={ prison.published[this.state.activeLang] }
            onChange={ updateField(lensPath(['published', this.state.activeLang])) }
          />
          <HalfContainer>
            <Half>
              <Fieldset>
                <FieldTitle>название лагеря</FieldTitle>
                <TextInput
                  value={ prison.name.ru || '' }
                  onChange={ updateInput(lensPath(['name', 'ru'])) }
                  placeholder={ 'Название' }
                />
                <TextInput
                  value={ prison.additional_names.ru || '' }
                  onChange={ updateInput(lensPath(['additional_names', 'ru'])) }
                  placeholder={ 'Дополнительные названия, если есть' }
                />
              </Fieldset>
              <Fieldset>
                <FieldTitle>Основная деятельность</FieldTitle>
                <SelectInput
                  value={ prison.activity_id }
                  options={ this.props.activityOptions }
                  clearable={ false }
                  onChange={ updateSelect(lensProp('activity_id')) }
                />
              </Fieldset>
              <div className="prison__place">
                <FieldTitle>Регион</FieldTitle>
                <SelectInput
                  value={ prison.place_id }
                  options={ this.props.placeOptions }
                  clearable={ false }
                  onChange={ updateSelect(lensProp('place_id')) }
                />
              </div>
            </Half>
            <Half>
              <Fieldset>
                <FieldTitle color={ 'blue' }>name of the camp</FieldTitle>
                <TextInput
                  value={ prison.name.en || '' }
                  desc={ 'input_en' }
                  placeholder={ 'Main name' }
                  onChange={ updateInput(lensPath(['name', 'en'])) }
                />
                <TextInput
                  value={ prison.additional_names.en || '' }
                  desc={ 'input_en' }
                  placeholder={ 'Second name' }
                  onChange={ updateInput(lensPath(['additional_names', 'en'])) }
                />
              </Fieldset>
              <div className="prison__type">
                <FieldTitle>Тип лагеря</FieldTitle>
                <SelectInput
                  value={ prison.type_id }
                  options={ this.props.typeOptions }
                  clearable={ false }
                  onChange={ updateSelect(lensProp('type_id')) }
                />
              </div>
            </Half>
          </HalfContainer>
          <HalfContainer>
            <Half>
              <TextInput
                placeholder='Название локации'
                value={ prison.location.ru || '' }
                onChange={ updateInput(lensPath(['location', 'ru'])) }
              />
            </Half>
            <Half>
              <TextInput
                placeholder='Location name'
                value={ prison.location.en || '' }
                desc={ 'input_en' }
                onChange={ updateInput(lensPath(['location', 'en'])) }
              />
            </Half>
          </HalfContainer>
          <PrisonLocation
            features={ prison.features || [] }
            updateFeatures={ updateField(lensProp('features')) }
          />
          <HalfContainer>
            <Half>
              <MarkdownEditor
                title={ 'Описание лагеря' }
                source={ prison.description.ru || '' }
                onBlur={ this.markdownOnBlur.bind(this, ['description', 'ru']) }
                onChange={ updateInput(lensPath(['description', 'ru'])) }
              />
            </Half>
            <Half>
              <MarkdownEditor
                title={ 'description' }
                source={ prison.description.en || '' }
                onBlur={ this.markdownOnBlur.bind(this, ['description', 'en']) }
                onChange={ updateInput(lensPath(['description', 'en'])) }
                inputClassName={ 'input_en' }
                color={ 'blue' }
              />
            </Half>
          </HalfContainer>
          <PrisonPhotos
            photos={ photos }
            onClick={ this.photoOnClick }
            uploadHandler={ uploadHandler.bind(null, prison.id) }
          />
          <SaveButton
            color={'orange'}
            onClick={ submitHandler.bind(null, prison) }
          >
            сохранить
          </SaveButton>
        </Container>
      </div>
    );
  }
}

export default PrisonCard;
