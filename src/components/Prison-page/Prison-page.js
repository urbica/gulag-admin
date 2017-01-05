import React from 'react';
import Button from '../Button/Button';
import PrisonHeader from './PrisonHeader';
import DraftSwitch from './DraftSwitch';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import PrisonLocation from './PrisonLocation';
import PrisonYears from './PrisonYears';
import PrisonStatistics from './PrisonStatistics';
import PrisonPhotos from './PrisonPhotos';
import MarkdownEditor from './MarkdownEditor';
import {lensProp, set} from 'ramda';
import './Prison-page.css';

class PrisonCard extends React.Component {
  render() {
    const {prison, updateHandler, deleteHandler} = this.props;
    const features = prison.features || [];

    const updateInput = lens => /* debounce */ (event) => {
      const {value} = event.target;
      updateHandler(set(lens, value, prison));
    }

    const updateSelect = lens => /* debounce */ (option) => {
      const value = option ? option.value : undefined;
      updateHandler(set(lens, value, prison));
    }

    return (
      <div className="prisonPage">
        <div className="container">
          <PrisonHeader
            prison={ prison }
            deleteHandler={ deleteHandler.bind(null, prison) }
          />
          <div className="prison__top">
            <div className="prison__left">
              <DraftSwitch defaultChecked={ prison.published_ru }/>
              <div className="prison__name">
                <div className="field-title">название лагеря</div>
                <TextInput
                  onChange={ updateInput(lensProp('name_ru')) }
                  placeholder={ 'Название' }
                  defaultValue={ prison.name_ru }
                />
                <TextInput
                  onChange={ updateInput(lensProp('addl_names_ru')) }
                  placeholder={ 'Дополнительные названия, если есть' }
                  defaultValue={ prison.addl_names_ru }
                />
              </div>
              <div className="prison__activity">
                <div className="field-title">Основная деятельность</div>
                <SelectInput
                  value={ prison.activity_id }
                  options={ this.props.activityOptions }
                  onChange={ updateSelect(lensProp('activity_id')) }
                />
              </div>
              <div className="prison__place">
                <div className="field-title">Регион</div>
                <SelectInput
                  value={ prison.place_id }
                  options={ this.props.placeOptions }
                  onChange={ updateSelect(lensProp('place_id')) }
                />
              </div>
            </div>
            <div className="prison__right">
              <DraftSwitch defaultChecked={ prison.published_en } lang={ 'en' }/>
              <div className="prison__name">
                <div className="field-title field-title_en">eng</div>
                <TextInput placeholder={ 'Main name' } defaultValue={ prison.name_en }/>
                <TextInput
                  placeholder={ 'Second name' }
                  defaultValue={ prison.addl_names_en }
                />
              </div>
              <div className="prison__type">
                <div className="field-title">Тип лагеря</div>
                <SelectInput
                  value={ prison.type_id }
                  options={ this.props.typeOptions }
                  onChange={ updateSelect(lensProp('type_id')) }
                />
              </div>
            </div>
          </div>
          <PrisonLocation prison={ prison }/>
          <PrisonYears
            prison={ prison }
            onClick={ this.props.addNewYear.bind(null, prison.id, 0) }
          />
          {
            features[0] &&
            <PrisonStatistics feature={ features[0] }/>
          }
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
              />
            </div>
          </div>
          <PrisonPhotos />
          <Button
            color={'orange'}
            title={'сохранить'}
            onClick={ this.props.submitHandler.bind(null, this.props.prison) }
          />
        </div>
      </div>
    );
  }
}

export default PrisonCard;
