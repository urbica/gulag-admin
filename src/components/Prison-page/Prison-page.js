import React from 'react';
import Button from '../Button/Button';
import DropDownList from  '../Drop-Down-List/Drop-Down-List';
import PrisonHeader from './PrisonHeader';
import DraftSwitch from './DraftSwitch';
import TextInput from './TextInput';
import PrisonLocation from './PrisonLocation';
import PrisonYears from './PrisonYears';
import PrisonStatistics from './PrisonStatistics';
import PrisonPhotos from './PrisonPhotos';
import MarkdownEditor from './MarkdownEditor';
import { lensProp, set } from 'ramda';
import './Prison-page.css';

const activity = {
  0: 'Гидростроительство',
  1: 'Железнодорожное строительство',
  2: 'Капитальное строительство',
  3: 'Строительство заводов и предприятий',
  4: 'Шоссейное строительство',
  5: 'Аэродромное строительство',
  6: 'Горнодобывающая промышленность',
  7: 'Лесозаготовки',
  8: 'Строительство объектов энергетики',
  9: 'Сельское хозяйство',
  10: 'Топливная промышленность',
  11: 'Осушение болот',
  12: 'Топливная промышленность'
};
const place = {
  0: 'Западная Сибирь',
  1: 'Восточная Сибирь и Таймыр',
  2: 'Дальний Восток',
  3: 'Колыма и Чукотка (лагеря Дальстроя',
  4: 'Урал и Пермский край',
  5: 'Коми',
  6: 'Центральная Россия и Ленинградская область',
  7: 'Европейский Север',
  8: 'Кавказ',
  9: 'Украина и Прибалтика',
  10: 'Поволжье',
  11: 'Средняя Азия',
  12: 'Москва и Подмосковье'
};
const type = {
  0: 'ИТЛ',
  1: 'Особый лагерь',
  2: 'Спецлагерь',
  3: 'Лагерное отделение'
};

class PrisonCard extends React.Component {
  render() {
    const { prison, updateHandler } = this.props;

    const update = lens => /* debounce */ (event) => {
      const { value } = event.target;
      updateHandler(set(lens, value, prison))
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
                  onChange={ update(lensProp('name_ru')) }
                  placeholder={ 'Название' }
                  defaultValue={ prison.name_ru }
                />
                <TextInput
                  onChange={ update(lensProp('addl_names_ru')) }
                  placeholder={ 'Дополнительные названия, если есть' }
                  defaultValue={ prison.addl_names_ru }
                />
              </div>
              <div className="prison__activity">
                <div className="field-title">Основная деятельность</div>
                <DropDownList
                  list={ activity }
                  activeItem={ prison.features[0].properties.activity_id }
                />
              </div>
              <div className="prison__place">
                <div className="field-title">Регион</div>
                <DropDownList
                  list={ place }
                  activeItem={ prison.features[0].properties.place_id }
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
                <DropDownList
                  list={ type }
                  activeItem={ prison.features[0].properties.type_id }
                />
              </div>
            </div>
          </div>
          <PrisonLocation prison={ prison } />
          <PrisonYears
            prison={ prison }
            onClick={ this.props.addNewYear.bind(null, prison.id, 0) }
          />
          <PrisonStatistics feature={ prison.features[0] } />
          <div className="prison__top">
            <div className="prison__left">
              <MarkdownEditor
                title={ 'Описание лагеря' }
                source={ prison.description_ru }
                onChange={ update(lensProp('description_ru')) }
              />
            </div>
            <div className="prison__right">
              <MarkdownEditor
                title={ 'eng' }
                source={ prison.description_en }
                onChange={ update(lensProp('description_en')) }
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
