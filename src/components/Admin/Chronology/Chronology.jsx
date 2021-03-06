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
    this.updatePeriods = () => {
      const { updatePeriods } = this.props;
      const { periods } = this.state;

      updatePeriods(Object.values(periods.toJS()));
    };
  }

  componentWillReceiveProps({ periods }) {
    this.setState({ periods });
  }

  render() {
    const { pushToDashboard, createPeriod, deletePeriod } = this.props;
    const { periods } = this.state;

    return (
      <Fragment>
        <Header
          goBack={pushToDashboard}
          updatePeriods={this.updatePeriods}
        />
        <Periods
          periods={periods}
          createPeriod={createPeriod}
          changePeriod={this.changePeriod}
          deletePeriod={deletePeriod}
        />
      </Fragment>
    );
  }
}

Chronology.propTypes = {
  pushToDashboard: PropTypes.func.isRequired,
  periods: PropTypes.object.isRequired,
  createPeriod: PropTypes.func.isRequired,
  deletePeriod: PropTypes.func.isRequired,
  updatePeriods: PropTypes.func.isRequired
};

export default Chronology;
