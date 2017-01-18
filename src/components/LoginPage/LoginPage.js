import React from 'react';
import './LoginPage.css';

class LoginPage extends React.PureComponent {
  handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      const password = this.refs.password;
      this.props.onSubmit(password.value);
    }
  };

  componentDidMount() {
    this.refs.password.focus();
  }

  render() {
    return (
      <div className='loginPage'>
        <div className='container'>
          <a className='loginPage__link' href='/'>← Вернуться на карту</a>
          <div className='loginPage__form'>
            <div>Пароль</div>
            <div className='password-wrap'>
              <input
                ref='password'
                type='password'
                className='password__input'
                onKeyPress={ this.handleKeyPress }
              />
              <div className='password__line'/>
            </div>
            <a className='loginPage__remind' href='#'>Напомнить</a>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
