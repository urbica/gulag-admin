/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// styled
import Container from './Container';
import LoginForm from './LoginForm';
import InputWrap from './InputWrap';
import Enter from './Enter';
import PasswordLine from './PasswordLine';
import PasswordReminder from './PasswordReminder';

class LoginPage extends PureComponent {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.input.focus();
    }
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
      <Container>
        <LoginForm>
          <div>Пароль</div>
          <InputWrap>
            <input
              required
              ref={(ref) => {
                this.input = ref;
              }}
              type='password'
              placeholder='Введите пароль'
              onKeyPress={this.handleKeyPress}
            />
            <Enter onClick={this.onClick}>Enter</Enter>
            <PasswordLine />
          </InputWrap>
          <PasswordReminder href='#'>Напомнить</PasswordReminder>
        </LoginForm>
      </Container>
    );
  }
}

LoginPage.propTypes = {
  onSubmit: PropTypes.func
};

export default LoginPage;
