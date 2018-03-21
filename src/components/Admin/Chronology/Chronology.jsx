import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from './Header/Header';
import Periods from './Periods/Periods';

class Chronology extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      periods: props.periods
    };

    this.changePeriod = (path, { target }) => {
      this.setState(({ periods }) => ({
        periods: periods.setIn(path, target.value)
      }));
    };
    this.savePeriods = () => {};
  }

  componentWillReceiveProps({ periods }) {
    this.setState(() => ({ periods }));
  }

  render() {
    return (
      <Fragment>
        <Header goBack={this.props.pushToDashboard} />
        <Periods
          periods={this.state.periods}
          createPeriod={this.props.createPeriod}
          changePeriod={this.changePeriod}
          deletePeriod={this.props.deletePeriod}
        />
      </Fragment>
    );
  }
}

Chronology.propTypes = {
  pushToDashboard: PropTypes.func.isRequired,
  periods: PropTypes.object.isRequired,
  createPeriod: PropTypes.func.isRequired,
  deletePeriod: PropTypes.func.isRequired
};

export default Chronology;
