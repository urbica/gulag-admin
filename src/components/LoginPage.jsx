import React, { PureComponent, PropTypes } from 'react';
import { Redirect } from 'react-router-dom';
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

class LoginPage extends PureComponent {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.input.focus();
  }

  onClick() {
    this.props.onSubmit(this.input.value);
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onSubmit(this.input.value);
    }
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to='/admin' />;
    }

    return (
      <LoginPageWrap>
        <LoginForm>
          <div>Пароль</div>
          <InputWrap>
            <input
              required
              ref={ref => (this.input = ref)}
              type='password'
              placeholder='Введите пароль'
              onKeyPress={this.handleKeyPress}
            />
            <Enter onClick={this.onClick}>Enter</Enter>
            <PasswordLine />
          </InputWrap>
          <PasswordReminder href='#'>Напомнить</PasswordReminder>
        </LoginForm>
      </LoginPageWrap>
    );
  }
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func
};

export default LoginPage;
