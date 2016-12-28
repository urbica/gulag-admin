import React from 'react';
import Button from '../Button/Button';
import DropDownList from  '../Drop-Down-List/Drop-Down-List';
import Map from '../Map/Map';
import {Link} from 'react-router';
import ReactMarkdown from 'react-markdown';
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
  constructor(props) {
    super(props);
    this.state = {
      location: 0
    };
  }

  render() {
    const PRISON = this.props.prison;
    return (
      <div className="prisonPage">
        <div className="container">
          <header className="prison__header">
            <Link to="/admin/prisons" className="prison__back-link">← к таблице лагерей</Link>
            <div className="prison__title">
              <div className="prison__title-name">{ PRISON.name_ru }</div>
              <div className="prison__title-period">
                {
                  PRISON.features.map((location, key) => {
                    const YEARS = Object.keys(location.properties);
                    if (YEARS.length === 3) {
                      return <div key={ key }>{ YEARS[0] };</div>
                    } else if (YEARS.length > 2) {
                      return <div key={ key }>{ YEARS[0] + ' – ' + YEARS[YEARS.length - 3] };</div>
                    } else return null
                  })
                }
              </div>
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
                  <input type="checkbox" defaultChecked={ this.props.prison.published_ru }/>
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
                  <input type="checkbox" defaultChecked={ this.props.prison.published_en }/>
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
            <div className="field-title">
              {
                PRISON.features.map((location, key) => {
                  const className = PRISON.features[this.state.location] === location ?
                    'field-title__location field-title__location_active' : 'field-title__location';

                  return (
                    <div
                      className={ className }
                      key={ key }
                      onClick={ () => this.setState({location: key}) }
                    >
                      Локация { key + 1 }
                    </div>
                  )
                })
              }
              <button className="field-title__plus">+</button>
            </div>
            <div className="inputWrapper">
              <input className="input" type="text"/>
              <div className="inputLine"/>
            </div>
            <div className="inputWrapper">
              <input className="input input_en" type="text"/>
              <div className="inputLine"/>
            </div>
            <Map features={ this.props.prison.features }/>
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
                  <ReactMarkdown
                    className="input"
                    source={ PRISON.description_ru }
                  />
                  {/*
                    <textarea className="input"
                              defaultValue={ PRISON.description_ru }
                    />
                  */}
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
