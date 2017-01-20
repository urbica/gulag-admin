import React from 'react';
import Container from '../Container';
import PrisonHeader from './PrisonHeader.jsx';
import DraftSwitch from './DraftSwitch.jsx';
import FieldTitle from '../FieldTitle';
import TextInput from './Inputs/TextInput';
import SelectInput from './Inputs/SelectInput';
import PrisonLocation from './PrisonLocation/PrisonLocation';
import MarkdownEditor from './Inputs/MarkdownEditor';
import PrisonPhotos from './PrisonPhotos';
import Button from '../Button';
import {__, curryN, identity, lensProp, path, pipe, set} from 'ramda';
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

class PrisonCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdownState: {
        field: 'description_ru',
        selectionEnd: 0
      }
    };
  }

  markdownOnBlur = (field, { selectionEnd }) => {
    this.setState(set(lensProp('markdownState'), { field, selectionEnd }));
  };

  photoOnClick = (url) => {
    const { prison, updateHandler } = this.props;
    const { field, selectionEnd } = this.state.markdownState;

    const imageMarkup = `![](${url})`;

    const value = prison[field];
    const newValue = [
      value.slice(0, selectionEnd),
      imageMarkup,
      value.slice(selectionEnd)
    ].join('');

    updateHandler(set(lensProp(field), newValue, prison));
  };

  render() {
    const {prison, uploadHandler, updateHandler, deleteHandler, submitHandler} = this.props;

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
          <HalfContainer>
            <Half>
              <DraftSwitch
                lang={ 'ru' }
                checked={ prison.published_ru }
                onChange={ updateField(lensProp('published_ru')) }
              />
              <Fieldset>
                <FieldTitle>название лагеря</FieldTitle>
                <TextInput
                  value={ prison.name_ru || '' }
                  onChange={ updateInput(lensProp('name_ru')) }
                  placeholder={ 'Название' }
                />
                <TextInput
                  value={ prison.addl_names_ru || '' }
                  onChange={ updateInput(lensProp('addl_names_ru')) }
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
              <DraftSwitch
                lang={ 'en' }
                checked={ prison.published_en }
                onChange={ updateField(lensProp('published_en')) }
              />
              <Fieldset>
                <FieldTitle english>eng</FieldTitle>
                <TextInput
                  value={ prison.name_en || '' }
                  className={ 'input_en' }
                  placeholder={ 'Main name' }
                  onChange={ updateInput(lensProp('name_en')) }
                />
                <TextInput
                  value={ prison.addl_names_en || '' }
                  className={ 'input_en' }
                  placeholder={ 'Second name' }
                  onChange={ updateInput(lensProp('addl_names_en')) }
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
                value={ prison.location_ru || '' }
                onChange={ updateInput(lensProp('location_ru')) }
              />
            </Half>
            <Half>
              <TextInput
                placeholder='Location name'
                value={ prison.location_en || '' }
                className={ 'input_en' }
                onChange={ updateInput(lensProp('location_en')) }
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
                source={ prison.description_ru || '' }
                onBlur={ this.markdownOnBlur.bind(this, 'description_ru') }
                onChange={ updateInput(lensProp('description_ru')) }
              />
            </Half>
            <Half>
              <MarkdownEditor
                title={ 'eng' }
                source={ prison.description_en || '' }
                onBlur={ this.markdownOnBlur.bind(this, 'description_en') }
                onChange={ updateInput(lensProp('description_en')) }
                inputClassName={ 'input_en' }
              />
            </Half>
          </HalfContainer>
          <PrisonPhotos
            prison={ prison }
            onClick={ this.photoOnClick }
            uploadHandler={ uploadHandler }
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
