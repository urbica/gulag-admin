import React from 'react';
import { map, head, groupBy, prop, compose, lensIndex, lensPath, set, assocPath, isEmpty } from 'ramda';
import './App.css';

const App = React.createClass({
  getInitialState() {
    return {
      prisons: {}
    };
  },

  componentWillMount() {
    const groupById = compose(map(head), groupBy(prop('id')));

    fetch('http://gulag.urbica.co/backend/public/camps.json')
      .then(r => r.json())
      .then(camps => this.setState({ prisons: groupById(camps)}));
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

  renderChildren() {
    const { pathname } = this.props.router.location;
    if (pathname === '/' || pathname === '/camps') {
      if (isEmpty(this.state.prisons)) return null;
      return React.cloneElement(this.props.children, { prisons: this.state.prisons });
    }
    return this.props.children;
  },

  render() {
    return (
      <div className='App'>
        { this.renderChildren() }
      </div>
    );
  }
});

export default App;
