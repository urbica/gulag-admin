import React, {Component} from 'react';
import './Header.css'
import Button from '../Button/Button';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="header__left">
            <Button value={'выйти'}/>
          </div>
          <div className="header__middle">
            <div className="header__top">
              Карточки лагерей
            </div>
            <div className="header__bottom">
              <div className="header__rus">
                <div className="header__prisons">
                  234 <span>/286</span>
                </div>
                Опубликовано на русском
              </div>
              <div className="header__en">
                <div className="header__prisons">
                  234 <span>/286</span>
                </div>
                На английском
              </div>
            </div>
          </div>
          <div className="header__right">
            <Button value={'добавить'} color={'orange'}/>
          </div>
        </div>
      </header>
    )
  }
}

export default Header;