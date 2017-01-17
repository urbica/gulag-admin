import React from 'react';
import Button from '../Button/Button';
import PrisonHeader from './PrisonHeader';
import DraftSwitch from './DraftSwitch.jsx';
import TextInput from '../Inputs/TextInput';
import SelectInput from '../Inputs/SelectInput';
import PrisonLocation from '../PrisonLocation/PrisonLocation';
import PrisonPhotos from './PrisonPhotos';
import MarkdownEditor from '../Inputs/MarkdownEditor';
import {lensProp, set} from 'ramda';
import './PrisonPage.css';

class PrisonCard extends React.Component {
  render() {
    const {prison, uploadHandler, updateHandler, deleteHandler} = this.props;

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
      <div className="prisonPage">
        <div className="container">
          <PrisonHeader
            prison={ prison }
            deleteHandler={ deleteHandler.bind(null, prison) }
          />
          <div className="prison__top">
            <div className="prison__left">
              <DraftSwitch
                lang={ 'ru' }
                defaultChecked={ prison.published_ru }
                updateDraft={ updateDraft }
              />
              <div className="prison__name">
                <div className="field-title">название лагеря</div>
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
              </div>
              <div className="prison__activity">
                <div className="field-title">Основная деятельность</div>
                <SelectInput
                  value={ prison.activity_id }
                  options={ this.props.activityOptions }
                  clearable={ false }
                  onChange={ updateSelect(lensProp('activity_id')) }
                />
              </div>
              <div className="prison__place">
                <div className="field-title">Регион</div>
                <SelectInput
                  value={ prison.place_id }
                  options={ this.props.placeOptions }
                  clearable={ false }
                  onChange={ updateSelect(lensProp('place_id')) }
                />
              </div>
            </div>
            <div className="prison__right">
              <DraftSwitch
                lang={ 'en' }
                defaultChecked={ prison.published_en }
                updateDraft={ updateDraft }
              />
              <div className="prison__name">
                <div className="field-title field-title_en">eng</div>
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
              </div>
              <div className="prison__type">
                <div className="field-title">Тип лагеря</div>
                <SelectInput
                  value={ prison.type_id }
                  options={ this.props.typeOptions }
                  clearable={ false }
                  onChange={ updateSelect(lensProp('type_id')) }
                />
              </div>
            </div>
          </div>
          <TextInput
            placeholder='Название локации'
            value={ prison.location_ru }
            onChange={ updateInput(lensProp('location_ru')) }
          />
          <TextInput
            placeholder='Location name'
            value={ prison.location_en }
            className={ 'input_en' }
            onChange={ updateInput(lensProp('location_en')) }
          />
          <PrisonLocation
            features={ prison.features }
            updateFeatures={ updateFeatures }
          />
          <div className="prison__top">
            <div className="prison__left">
              <MarkdownEditor
                title={ 'Описание лагеря' }
                source={ prison.description_ru }
                onChange={ updateInput(lensProp('description_ru')) }
              />
            </div>
            <div className="prison__right">
              <MarkdownEditor
                title={ 'eng' }
                source={ prison.description_en }
                onChange={ updateInput(lensProp('description_en')) }
                inputClassName={ 'input_en' }
                containerClassName={ 'prison__description_en' }
              />
            </div>
          </div>
          <PrisonPhotos
            prison={ prison }
            uploadHandler={ uploadHandler }
          />
          <Button
            color={'orange'}
            onClick={ this.props.submitHandler.bind(null, prison) }
          >сохранить</Button>
        </div>
      </div>
    );
  }
}

export default PrisonCard;