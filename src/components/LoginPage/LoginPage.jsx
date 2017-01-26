import React from 'react';
import styled from 'styled-components';

const LoginPageWrap = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const LoginForm = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  margin: auto;
`;

const InputWrap = styled.label`
  position: relative;
  width: 100%;
  margin-bottom: 5px;
  & input {
    width: 100%;
    padding: 0;
    padding-right: 100px;
    border: none;
    border-bottom: 1px solid rgba(0,0,0,.2);
    font-family: 'PT Sans';
    font-size: 48px;
    font-weight: bold;
    outline: none;
    &::placeholder {
      color: #e5e5e5;
    }
  }
`;

const Enter = styled.button`
  position: absolute;
  right: 0;
  padding: 23px 5px 4px 54px;
  border-radius: 4px;
  background-color: #fff;
  border: solid 1px rgba(0, 0, 0, 0.5);
  font-family: 'PT Sans';
  font-size: 15px;
  outline: none;
  opacity: 0;
  z-index: -10;
  transition: opacity .3s;
  input:valid + & {
    z-index: inherit;
    opacity: 1;
    transition: opacity .3s;
  }
  &:hover {
    background-color: #f0f0f0;
  }
  &:active {
    border-color: #000;
  }
`;

const PasswordLine = styled.div`
  position: absolute;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: #000;
  transition: width .3s;
  input:focus ~ & {
    width: 100%;
    transition: width .3s;
`;

const PasswordReminder = styled.a`
  margin-left: auto;
  color: rgba(0,0,0,.5);
  text-decoration: none;
`;

class LoginPage extends React.PureComponent {
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const password = this.refs.password;
      this.props.onSubmit(password.value);
    }
  };

  onClick = () => {
    const password = this.refs.password;
    this.props.onSubmit(password.value);
  };

  componentDidMount() {
    this.refs.password.focus();
  }

  render() {
    return (
      <LoginPageWrap>
        <LoginForm>
          <div>Пароль</div>
          <InputWrap>
            <input
              required
              ref='password'
              type='password'
              placeholder='Введите пароль'
              onKeyPress={ this.handleKeyPress }
            />
            <Enter onClick={ this.onClick }>Enter</Enter>
            <PasswordLine/>
          </InputWrap>
          <PasswordReminder href='#'>Напомнить</PasswordReminder>
        </LoginForm>
      </LoginPageWrap>
    );
  }
}

export default LoginPage;