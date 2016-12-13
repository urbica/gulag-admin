import React from 'react';
import Button from '../Button/Button';
import Map from '../Map/Map';
import './Prison-page.css';

const years = [];
for (let i = 1918; i <= 1960; i++) {
  years.push(i);
}

class PrisonCard extends React.Component {
  render() {
    return (
      <div className="prisonPage">
        <div className="container">
          <header className="prison__header">
            <a className="prison__back-link">← к таблице лагерей</a>
            <div className="prison__title">
              <div className="prison__title-name">{ this.props.prisons[0].name }</div>
              {/*<div className="prison__title-period">{ this.props.prisons[0].years }</div>*/}
            </div>
            <div>
              <Button color={'red'} title={'удалить'}/>
              <div className="prison__saved">
                <div>Сохранено:</div>
                <span className="prison__saved-date">{ this.props.prisons[0].edited.date }</span>
                <span>{ this.props.prisons[0].edited.time }</span>
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
                         defaultValue={ this.props.prisons[0].name }
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
                    <div>Гидростроительство</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9">
                      <path fill="none" stroke="#979797" strokeWidth="2" d="M1 1l5.58 6L12 1.17"/>
                    </svg>
                  </div>
                  <ul className="dropDownList">
                    <li>Гидростроительство</li>
                    <li>Железнодорожное строительство</li>
                    <li>Капитальное строительство</li>
                    <li>Строительство заводов и предприятий</li>
                    <li>Шоссейное строительство</li>
                    <li>Аэродромное строительство</li>
                    <li>Горнодобывающая промышленность</li>
                    <li>Лесозаготовки</li>
                    <li>Строительство объектов энергетики</li>
                    <li>Сельское хозяйство</li>
                    <li>Топливная промышленность</li>
                    <li>Осушение болот</li>
                    <li>Топливная промышленность</li>
                  </ul>
                </div>
              </div>
              <div className="prison__place">
                <div className="field-title">Регион</div>
                <div className="dropDownContainer">
                  <div className="dropDown__activeItem">
                    <div>Западная Сибирь</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9">
                      <path fill="none" fillRule="evenodd" stroke="#979797" strokeWidth="2" d="M1 1l5.58 6L12 1.17"/>
                    </svg>
                  </div>
                  <ul className="dropDownList">
                    <li>Западная Сибирь</li>
                    <li>Восточная Сибирь и Таймыр</li>
                    <li>Дальний Восток</li>
                    <li>Колыма и Чукотка (лагеря Дальстроя)</li>
                    <li>Урал и Пермский край</li>
                    <li>Коми</li>
                    <li>Центральная Россия и Ленинградская область</li>
                    <li>Европейский Север</li>
                    <li>Кавказ</li>
                    <li>Украина и Прибалтика</li>
                    <li>Поволжье</li>
                    <li>Средняя Азия</li>
                    <li>Москва и Подмосковье</li>
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
                    <div>ИТЛ</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9">
                      <path fill="none" fillRule="evenodd" stroke="#979797" strokeWidth="2" d="M1 1l5.58 6L12 1.17"/>
                    </svg>
                  </div>
                  <ul className="dropDownList">
                    <li>ИТЛ</li>
                    <li>Особый лагерь</li>
                    <li>Спецлагерь</li>
                    <li>Лагерное отделение</li>
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
                    <input type="checkbox" defaultChecked={ this.props.prisons[0].years[year]}/>
                    <span>{ year }</span>
                  </label>
                })
              }
            </div>
          </div>
          <div className="prison__amount">
            <div className="field-title">количество заключенных по годам</div>
            {
              Object.keys(this.props.prisons[0].years).map((year, key) => {
                return <label className="amount" key={ key }>
                  <span className="amount__year">{ year }:</span>
                  <input className="amount__input input" type="text"
                         defaultValue={ this.props.prisons[0].years[year].prisoners }/>
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
                            defaultValue={ this.props.prisons[0].description }
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