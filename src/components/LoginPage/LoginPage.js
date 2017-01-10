import React from 'react';
import './LoginPage.css';

class LoginPage extends React.Component {
  render() {
    return (
      <div className='loginPage'>
        <div className='container'>
          <a className='loginPage__link' href='/'>← Вернуться на карту</a>
          <form className='loginPage__form'>
            <div>Пароль</div>
            <div className='password-wrap'>
              <input className='password__input' type='password'/>
              <div className='password__line'/>
            </div>
            <a className='loginPage__remind' href='#'>Напомнить</a>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
