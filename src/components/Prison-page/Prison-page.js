import React from 'react';
import Button from '../Button/Button';
import DropDownList from  '../Drop-Down-List/Drop-Down-List';
import Map from '../Map/Map';
import './Prison-page.css';

const years = [];
for (let i = 1918; i <= 1960; i++) {
  years.push(i);
}

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
    const PRISON = this.props.prison;
    return (
      <div className="prisonPage">
        <div className="container">
          <header className="prison__header">
            <a className="prison__back-link">← к таблице лагерей</a>
            <div className="prison__title">
              <div className="prison__title-name">{ PRISON.name_ru }</div>
              <div className="prison__title-period">тут годы существования лагеря</div>
            </div>
            <div>
              <Button color={'red'} title={'удалить'}/>
              <div className="prison__saved">
                <div>Сохранено:</div>
                {/*<span className="prison__saved-date">{ this.props.PRISON.edited.date }</span>*/}
                {/*<span>{ this.props.PRISON.edited.time }</span>*/}
              </div>
            </div>
          </header>
          <div className="prison__top">
            <div className="prison__left">
              <div className="draft-switch">
                <span className="draft">черновик</span>
                <label className="switch">
                  <input type="checkbox"/>
                  <div className="slider"/>
                </label>
                <span className="published">опубликовано</span>
              </div>
              <div className="prison__name">
                <div className="field-title">название лагеря</div>
                <div className="inputWrapper">
                  <input className="input"
                         type="text"
                         placeholder="Название"
                         defaultValue={ PRISON.name_ru }
                  />
                  <div className="inputLine"/>
                </div>
                <div className="inputWrapper">
                  <input className="input"
                         type="text"
                         placeholder="Дополнительные названия, если есть"
                         defaultValue={ PRISON.addl_names_ru }
                  />
                  <div className="inputLine"/>
                </div>
              </div>
              <div className="prison__activity">
                <div className="field-title">Основная деятельность</div>
                <DropDownList list={ activity }
                              activeItem={ PRISON.features[0].properties.activity_id }
                />
              </div>
              <div className="prison__place">
                <div className="field-title">Регион</div>
                <DropDownList list={ place }
                              activeItem={ PRISON.features[0].properties.place_id }
                />
              </div>
            </div>
            <div className="prison__right">
              <div className="draft-switch draft-switch_en">
                <span className="draft">черновик</span>
                <label className="switch switch_en">
                  <input type="checkbox"/>
                  <div className="slider"/>
                </label>
                <span className="published">опубликовано</span>
              </div>
              <div className="prison__name">
                <div className="field-title field-title_en">eng</div>
                <div className="inputWrapper">
                  <input className="input input_en"
                         type="text"
                         placeholder="Main name"
                         defaultValue={ PRISON.name_en }
                  />
                  <div className="inputLine"/>
                </div>
                <div className="inputWrapper">
                  <input className="input input_en" type="text" placeholder="Second name"/>
                  <div className="inputLine"/>
                </div>
              </div>
              <div className="prison__type">
                <div className="field-title">Тип лагеря</div>
                <DropDownList list={ type }
                              activeItem={ PRISON.features[0].properties.type_id }
                />
              </div>
            </div>
          </div>
          <div className="prison__location">
            <div className="field-title">Локация</div>
            <div className="inputWrapper">
              <input className="input" type="text"/>
              <div className="inputLine"/>
            </div>
            <div className="inputWrapper">
              <input className="input input_en" type="text"/>
              <div className="inputLine"/>
            </div>
            <Map/>
          </div>
          <div className="prison__years">
            <div className="field-title">Годы существования лагеря</div>
            <div className="years__list">
              {
                years.map((year, key) => {
                  return <label key={ key } className="year">
                    <input type="checkbox"
                           defaultChecked={ PRISON.features[0].properties[year] }
                           onClick={ this.props.addNewYear.bind(null, PRISON.id, 0, year) }
                    />
                    <span>{ year }</span>
                  </label>
                })
              }
            </div>
          </div>
          <div className="prison__amount">
            <div className="field-title">количество заключенных по годам</div>
            {/*pickByRegExp(/^\d{4}$/)*/}
            {/*const pickByRegExp = RegExp => R.pickBy(R.compose(R.test(RegExp), R.nthArg(1)));*/}
            {
              Object.keys(PRISON.features[0].properties).map((year) => {
                return <label className="amount" key={ year }>
                  <span className="amount__year">{ year }:</span>
                  <input className="amount__input input"
                         type="text"
                         defaultValue={ PRISON.features[0].properties[year].peoples }/>
                  <div className="inputLine"/>
                </label>
              })
            }
          </div>
          <div className="prison__top">
            <div className="prison__left">
              <div className="prison__description">
                <div className="field-title">Описание лагеря</div>
                <div className="inputWrapper">
                  <textarea className="input"
                            defaultValue={ PRISON.description_ru }
                  />
                  <div className="inputLine"/>
                </div>
              </div>
            </div>
            <div className="prison__right">
              <div className="prison__description prison__description_en">
                <div className="field-title field-title_en">eng</div>
                <div className="inputWrapper">
                  <textarea className="input input_en"
                            defaultValue={ PRISON.description_en }
                  />
                  <div className="inputLine"/>
                </div>
              </div>
            </div>
          </div>
          <div className="prison__photo">
            <div className="field-title">фотографии</div>
            <figure>
              <img src="http://lorempixel.com/150/100" role="presentation"/>
              <figcaption>image1.png</figcaption>
            </figure>
            <figure>
              <img src="http://lorempixel.com/150/100" role="presentation"/>
              <figcaption>image1.png</figcaption>
            </figure>
            <figure>
              <img src="http://lorempixel.com/150/100" role="presentation"/>
              <figcaption>image1.png</figcaption>
            </figure>
          </div>
          <Button color={'orange'} title={'сохранить'}/>
        </div>
      </div>
    );
  }
}

export default PrisonCard;