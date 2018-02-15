import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// icons
import preloader from '../../icons/preloader.svg';

// action
import { login } from '../App/authReducer';

// styled
import Container from './Container';
import LoginForm from './LoginForm';
import InputWrap from './InputWrap';
import Enter from './Enter';
import PasswordLine from './PasswordLine';
import Preloader from './Preloader';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.authorize = this.authorize.bind(this);
  }

  authorize() {
    this.props.dispatch(login(this.input.value));
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.authorize();
    }
  }

  render() {
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
            <Enter onClick={this.authorize}>Enter</Enter>
            <PasswordLine />
          </InputWrap>
          <Preloader
            src={preloader}
            alt='preloader'
            isLoading={this.props.loginLoading}
          />
          {
            this.props.loginError &&
            <div>неверный пароль</div>
          }
        </LoginForm>
      </Container>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loginLoading: PropTypes.bool.isRequired,
  loginError: PropTypes.bool
};

Login.defaultProps = {
  loginError: null
};

export default connect(
  state => ({
    loginLoading: state.getIn(['ui', 'loginLoading']),
    loginError: state.getIn(['ui', 'loginError'])
  })
)(Login);
