import React from 'react';
import {map, head, groupBy, prop, compose, lensIndex, lensPath, set, assocPath, isEmpty} from 'ramda';
import './App.css';
// import LoginPage from '../Login-page/Login-page';
// import IndexPage from '../Index-page/Index-page';
import PrisonPage from '../Prison-page/Prison-page';

const App = React.createClass({
  getInitialState() {
    return {
      prisons: {}
    };
  },

  componentWillMount() {
    const groupById = compose(map(head), groupBy(prop('id')));

    fetch('http://192.168.0.101:4000/public/camps.json')
      .then(r => r.json())
      .then(arr => groupById(arr))
      .then(obj => this.setState({prisons: obj}));
  },

  changeDropDownItem(prisonId, dropDownName, itemId) {
    this.setState(
      assocPath(['prisons', prisonId.toString(), dropDownName], itemId, this.state)
    )
  },

  addNewYear(prisonId, locationId, year) {
    const PRISON = this.state.prisons[prisonId];

    const LENS = compose(
      lensPath(['prisons', prisonId, 'features']),
      lensIndex(locationId),
      lensPath(['properties', year, 'peoples'])
    );
    const LENS_REMOVE = compose(
      lensPath(['prisons', prisonId, 'features']),
      lensIndex(locationId),
      lensPath(['properties', year, 'peoples'])
    );

    const NEW_STATE_ADD = set(LENS, 0, this.state);
    const NEW_STATE_REMOVE = set(LENS_REMOVE, undefined, this.state);

    if (!PRISON.features[0].properties[year]) {
      this.setState(NEW_STATE_ADD)
    } else {
      this.setState(NEW_STATE_REMOVE)
    }
  },

  render() {
    return (
      <div className="App">
        {/*<LoginPage/>*/}
        {/*<IndexPage prisons={ this.state.prisons }/>*/}
        {
          !isEmpty(this.state.prisons) &&
          <PrisonPage prison={ this.state.prisons[2] }
                      changeDropDownItem={ this.changeDropDownItem }
                      addNewYear={ this.addNewYear }
          />
        }
      </div>
    );
  }
});

export default App;