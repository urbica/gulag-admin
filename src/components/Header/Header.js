import React, { Component } from 'react';
import Button from '../Button/Button';
import { browserHistory } from 'react-router';
import './Header.css'

class Header extends Component {
  render() {
    const createPrison = browserHistory.push.bind(browserHistory, '/admin/prisons/new');
    return (
      <header className="header">
        <div className="container">
          <div className="header__left">
            <Button title={'выйти'}/>
          </div>
          <div className="header__middle">
            <div className="header__top">
              Карточки лагерей
            </div>
            <div className="header__bottom">
              <div className="header__rus">
                <div className="header__prisons">
                  { this.props.ru_prisonsAmount } <span>/{ this.props.prisonsAmount }</span>
                </div>
                Опубликовано на русском
              </div>
              <div className="header__en">
                <div className="header__prisons">
                  { this.props.en_prisonsAmount } <span>/{ this.props.prisonsAmount }</span>
                </div>
                На английском
              </div>
            </div>
          </div>
          <div className="header__right">
            <Button
              title={'добавить'}
              color={'orange'}
              onClick={ createPrison }
            />
          </div>
        </div>
      </header>
    )
  }
}

export default Header;
