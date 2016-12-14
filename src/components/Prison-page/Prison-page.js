import React from 'react';
import Button from '../Button/Button';
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
    return (
      <div className="prisonPage">
        <div className="container">
          <header className="prison__header">
            <a className="prison__back-link">← к таблице лагерей</a>
            <div className="prison__title">
              <div className="prison__title-name">{ this.props.prison.name }</div>
              {/*<div className="prison__title-period">{ this.props.prisons[0].years }</div>*/}
            </div>
            <div>
              <Button color={'red'} title={'удалить'}/>
              <div className="prison__saved">
                <div>Сохранено:</div>
                <span className="prison__saved-date">{ this.props.prison.edited.date }</span>
                <span>{ this.props.prison.edited.time }</span>
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
                         defaultValue={ this.props.prison.name }
                  />
                  <div className="inputLine"/>
                </div>
                <div className="inputWrapper">
                  <input className="input" type="text" placeholder="Дополнительные названия, если есть"/>
                  <div className="inputLine"/>
                </div>
              </div>
              <div className="prison__activity">
                <div className="field-title">Основная деятельность</div>
                <div className="dropDownContainer">
                  <div className="dropDown__activeItem">
                    <div>{ activity[this.props.prison.activity] }</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9">
                      <path fill="none" stroke="#979797" strokeWidth="2" d="M1 1l5.58 6L12 1.17"/>
                    </svg>
                  </div>
                  <ul className="dropDownList">
                    {
                      Object.values(activity).map((activity, key) =>
                        <li key={ key }
                            onClick={ this.props.changeDropDownItem.bind(null, this.props.prisonId, 'activity', key) }
                        >{ activity }</li>
                      )
                    }
                  </ul>
                </div>
              </div>
              <div className="prison__place">
                <div className="field-title">Регион</div>
                <div className="dropDownContainer">
                  <div className="dropDown__activeItem">
                    <div>{ place[this.props.prison.place] }</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9">
                      <path fill="none" fillRule="evenodd" stroke="#979797" strokeWidth="2" d="M1 1l5.58 6L12 1.17"/>
                    </svg>
                  </div>
                  <ul className="dropDownList">
                    {
                      Object.values(place).map((place, key) => {
                        return <li key={ key }
                                   onClick={ this.props.changeDropDownItem.bind(null, this.props.prisonId, 'place', key) }
                        >{ place }</li>
                      })
                    }
                  </ul>
                </div>
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
                  <input className="input input_en" type="text" placeholder="Main name"/>
                  <div className="inputLine"/>
                </div>
                <div className="inputWrapper">
                  <input className="input input_en" type="text" placeholder="Second name"/>
                  <div className="inputLine"/>
                </div>
              </div>
              <div className="prison__type">
                <div className="field-title">Тип лагеря</div>
                <div className="dropDownContainer">
                  <div className="dropDown__activeItem">
                    <div>{ type[this.props.prison.type] }</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9">
                      <path fill="none" fillRule="evenodd" stroke="#979797" strokeWidth="2" d="M1 1l5.58 6L12 1.17"/>
                    </svg>
                  </div>
                  <ul className="dropDownList">
                    {
                      Object.values(type).map((type, key) => {
                        return <li key={ key }
                                   onClick={ this.props.changeDropDownItem.bind(null, this.props.prisonId, 'type', key) }
                        >{ type }</li>
                      })
                    }
                  </ul>
                </div>
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
                           defaultChecked={ this.props.prison.years[year] }
                           onClick={ this.props.addNewYear.bind(null, this.props.prisonId, year) }
                    />
                    <span>{ year }</span>
                  </label>
                })
              }
            </div>
          </div>
          <div className="prison__amount">
            <div className="field-title">количество заключенных по годам</div>
            {
              Object.keys(this.props.prison.years).map((year) => {
                return <label className="amount" key={ year }>
                  <span className="amount__year">{ year }:</span>
                  <input className="amount__input input"
                         type="text"
                         defaultValue={ this.props.prison.years[year].prisoners }/>
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
                            defaultValue={ this.props.prison.description }
                  />
                  <div className="inputLine"/>
                </div>
              </div>
            </div>
            <div className="prison__right">
              <div className="prison__description prison__description_en">
                <div className="field-title field-title_en">eng</div>
                <div className="inputWrapper">
                  <textarea className="input input_en"/>
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