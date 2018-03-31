import { createSelector } from 'reselect';
import { connect } from 'react-redux';

// action
import { login } from '../App/authReducer';

import Login from './Login';

const mapStateToProps = createSelector(
  state => state.getIn(['ui', 'loginLoading']),
  state => state.getIn(['ui', 'loginError']),
  (loginLoading, loginError) => ({ loginLoading, loginError })
);

const mapDispatchToProps = dispatch => ({
  login: password => dispatch(login(password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
