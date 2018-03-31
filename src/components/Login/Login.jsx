import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// icons
import preloader from '../../icons/preloader.svg';

// styled
import Container from './Container';
import LoginForm from './LoginForm';
import InputWrap from './InputWrap';
import Enter from './Enter';
import PasswordLine from './PasswordLine';
import Preloader from './Preloader';
import WrongLine from './WrongLine';
import WrongPassword from './WrongPassword';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        this.authorize();
      }
    };

    this.authorize = () => {
      const password = this.inputRef.current.value;

      this.props.login(password);
    };
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <Container>
        <LoginForm>
          <div>Пароль</div>
          <InputWrap>
            <input
              required
              ref={this.inputRef}
              type='password'
              placeholder='Введите пароль'
              onKeyPress={this.handleKeyPress}
            />
            <Enter onClick={this.authorize}>Enter</Enter>
            <PasswordLine />
          </InputWrap>
          <Preloader src={preloader} alt='preloader' isLoading={this.props.loginLoading} />
          <WrongLine isPassWrong={this.props.loginError} />
          {this.props.loginError && (
            <WrongPassword>А теперь попробуй с правильным паролем</WrongPassword>
          )}
        </LoginForm>
      </Container>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  loginLoading: PropTypes.bool.isRequired,
  loginError: PropTypes.bool
};

Login.defaultProps = {
  loginError: null
};

export default Login;
