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
import {lensProp, set} from 'ramda';
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
  render() {
    const {prison, uploadHandler, updateHandler, deleteHandler, submitHandler} = this.props;

    const updateInput = lens => /* debounce */ (event) => {
      const {value} = event.target;
      updateHandler(set(lens, value, prison));
    };

    const updateSelect = lens => /* debounce */ (option) => {
      const value = option ? option.value : undefined;
      updateHandler(set(lens, value, prison));
    };

    const updateDraft = (key, value) => {
      updateHandler(set(lensProp(key), value, prison));
    };

    const updateFeatures = features => {
      updateHandler(set(lensProp('features'), features, prison));
    };

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
                defaultChecked={ prison.published_ru }
                updateDraft={ updateDraft }
              />
              <Fieldset>
                <FieldTitle>название лагеря</FieldTitle>
                <TextInput
                  value={ prison.name_ru }
                  onChange={ updateInput(lensProp('name_ru')) }
                  placeholder={ 'Название' }
                />
                <TextInput
                  value={ prison.addl_names_ru }
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
                defaultChecked={ prison.published_en }
                updateDraft={ updateDraft }
              />
              <Fieldset>
                <FieldTitle english>eng</FieldTitle>
                <TextInput
                  value={ prison.name_en }
                  className={ 'input_en' }
                  placeholder={ 'Main name' }
                  onChange={ updateInput(lensProp('name_en')) }
                />
                <TextInput
                  value={ prison.addl_names_en }
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
                value={ prison.location_ru }
                onChange={ updateInput(lensProp('location_ru')) }
              />
            </Half>
            <Half>
              <TextInput
                placeholder='Location name'
                value={ prison.location_en }
                className={ 'input_en' }
                onChange={ updateInput(lensProp('location_en')) }
              />
            </Half>
          </HalfContainer>
          <PrisonLocation
            features={ prison.features }
            updateFeatures={ updateFeatures }
          />
          <HalfContainer>
            <Half>
              <MarkdownEditor
                title={ 'Описание лагеря' }
                source={ prison.description_ru }
                onChange={ updateInput(lensProp('description_ru')) }
              />
            </Half>
            <Half>
              <MarkdownEditor
                title={ 'eng' }
                source={ prison.description_en }
                onChange={ updateInput(lensProp('description_en')) }
                inputClassName={ 'input_en' }
              />
            </Half>
          </HalfContainer>
          <PrisonPhotos
            prison={ prison }
            uploadHandler={ uploadHandler }
          />
          <SaveButton
            color={'orange'}
            onClick={ submitHandler.bind(null, prison) }
          >сохранить</SaveButton>
        </Container>
      </div>
    );
  }
}

export default PrisonCard;