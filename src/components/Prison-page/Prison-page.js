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
import { lensProp, set } from 'ramda';
import './Prison-page.css';

const activities = [
  { value: 0, label: 'Гидростроительство' },
  { value: 1, label: 'Железнодорожное строительство' },
  { value: 2, label: 'Капитальное строительство' },
  { value: 3, label: 'Строительство заводов и предприятий' },
  { value: 4, label: 'Шоссейное строительство' },
  { value: 5, label: 'Аэродромное строительство' },
  { value: 6, label: 'Горнодобывающая промышленность' },
  { value: 7, label: 'Лесозаготовки' },
  { value: 8, label: 'Строительство объектов энергетики' },
  { value: 9, label: 'Сельское хозяйство' },
  { value: 1, label0: 'Топливная промышленность' },
  { value: 1, label1: 'Осушение болот' },
  { value: 1, label2: 'Топливная промышленность' }
];

const places = [
  { value: 0, label: 'Западная Сибирь'} ,
  { value: 1, label: 'Восточная Сибирь и Таймыр'} ,
  { value: 2, label: 'Дальний Восток'} ,
  { value: 3, label: 'Колыма и Чукотка (лагеря Дальстроя'} ,
  { value: 4, label: 'Урал и Пермский край'} ,
  { value: 5, label: 'Коми'} ,
  { value: 6, label: 'Центральная Россия и Ленинградская область'} ,
  { value: 7, label: 'Европейский Север'} ,
  { value: 8, label: 'Кавказ'} ,
  { value: 9, label: 'Украина и Прибалтика'} ,
  { value: 1, label0: 'Поволжье'} ,
  { value: 1, label1: 'Средняя Азия'} ,
  { value: 1, label2: 'Москва и Подмосковье' }
];

const types = [
  { value: 0, label: 'ИТЛ'} ,
  { value: 1, label: 'Особый лагерь'} ,
  { value: 2, label: 'Спецлагерь'} ,
  { value: 3, label: 'Лагерное отделение' }
];

class PrisonCard extends React.Component {
  render() {
    const { prison, updateHandler } = this.props;

    const updateInput = lens => /* debounce */ (event) => {
      const { value } = event.target;
      updateHandler(set(lens, value, prison))
    }

    const updateSelect = lens => /* debounce */ (option) => {
      updateHandler(set(lens, option.value, prison))
    }

    return (
      <div className="prisonPage">
        <div className="container">
          <PrisonHeader prison={ prison } />
          <div className="prison__top">
            <div className="prison__left">
              <DraftSwitch defaultChecked={ prison.published_ru } />
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
                  options={ activities }
                  onChange={ updateSelect(lensProp('activity_id')) }
                />
              </div>
              <div className="prison__place">
                <div className="field-title">Регион</div>
                <SelectInput
                  value={ prison.place_id }
                  options={ places }
                  onChange={ updateSelect(lensProp('place_id')) }
                />
              </div>
            </div>
            <div className="prison__right">
              <DraftSwitch defaultChecked={ prison.published_en } />
              <div className="prison__name">
                <div className="field-title field-title_en">eng</div>
                <TextInput placeholder={ 'Main name' } defaultValue={ prison.name_en } />
                <TextInput
                  placeholder={ 'Second name' }
                  defaultValue={ prison.addl_names_en }
                />
              </div>
              <div className="prison__type">
                <div className="field-title">Тип лагеря</div>
                <SelectInput
                  value={ prison.type_id }
                  options={ types }
                  onChange={ updateSelect(lensProp('type_id')) }
                />
              </div>
            </div>
          </div>
          <PrisonLocation prison={ prison } />
          <PrisonYears
            prison={ prison }
            onClick={ this.props.addNewYear.bind(null, prison.id, 0) }
          />
          {
            prison.features[0] &&
              <PrisonStatistics feature={ prison.features[0] } />
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
