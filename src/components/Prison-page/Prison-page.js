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
              <Button color={'orange'} title={'сохранить'}/>
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
                <input className="input" type="text" placeholder="Название"/>
                <input className="input" type="text" placeholder="Дополнительные названия, если есть"/>
              </div>
              <div className="prison__activity">
                <div className="field-title">Основная деятельность</div>
                <div>Гидростроительство <span>The water engineering</span></div>
                <ul>

                </ul>
              </div>
              <div className="prison__place">
                <div className="field-title">Регион</div>
                <div>Западная Сибирь <span>Western Siberia</span></div>
                <ul>

                </ul>
              </div>
            </div>
            <div className="prison__right">
              <div className="draft-switch">
                <span className="draft">черновик</span>
                <label className="switch">
                  <input type="checkbox"/>
                  <div className="slider"/>
                </label>
                <span className="published">опубликовано</span>
              </div>
              <div className="prison__name">
                <div className="field-title field-title_en">eng</div>
                <input className="input input_en" type="text" placeholder="Main name"/>
                <input className="input input_en" type="text" placeholder="Second name"/>
              </div>
              <div className="prison__type">
                <div className="field-title">Тип лагеря</div>
                <div>ИТЛ <span>ITL</span></div>
                <ul>

                </ul>
              </div>
            </div>
          </div>
          <div className="prison__location">
            <div className="field-title">Локация</div>
            <input className="input" type="text"/>
            <input className="input input_en" type="text"/>
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
                  <input className="amount__input" type="text"
                         defaultValue={ this.props.prisons[0].years[year].prisoners }/>
                </label>
              })
            }
          </div>
          <div className="prison__top">
            <div className="prison__left">
              <div className="prison__description">
                <div className="field-title">Описание лагеря</div>
                <textarea />
              </div>
            </div>
            <div className="prison__right">
              <div className="prison__description prison__description_en">
                <div className="field-title field-title_en">eng</div>
                <textarea placeholder="Description"/>
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
          <Button color={'red'} title={'удалить'}/>
        </div>
      </div>
    );
  }
}

export default PrisonCard;