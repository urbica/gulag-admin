import React from 'react';
import {compose, map, head, groupBy, prop, test, isEmpty} from 'ramda';
import addNewYear from '../../utils/add-new-year';
import { fillMaxPrisoners } from '../../utils/preprocessing';
import './App.css';

const App = React.createClass({
  getInitialState() {
    return {
      prisons: {}
    };
  },

  componentWillMount() {
    const groupById = compose(map(head), groupBy(prop('id')));
    const preprocess = compose(fillMaxPrisoners, groupById);

    fetch('http://gulag.urbica.co/backend/public/camps.json')
      .then(r => r.json())
      .then(prisons => this.setState({ prisons: preprocess(prisons) }));
  },

  submitPrison(prison) {
  },

  addNewYear(prisonId, locationId, year) {
    this.setState(addNewYear(this.state, prisonId, locationId, year))
  },

  renderChildren() {
    if (isEmpty(this.state.prisons)) return null;
    const { pathname } = this.props.router.location;

    // /admin || /admin/prisons -> <IndexPage />
    if (test(/^(\/admin\/?|\/admin\/prisons\/?)$/, pathname)) {
      return React.cloneElement(this.props.children, {
        prisons: this.state.prisons
      });
    }
    // /admin/prisons/prisonId -> <PrisonPage />
    else if (test(/\/admin\/prisons\/\d+/, pathname)) {
      const { prisonId } = this.props.router.params;
      return React.cloneElement(this.props.children, {
        prison: this.state.prisons[prisonId],
        changeDropDownItem: this.changeDropDownItem,
        addNewYear: this.addNewYear,
        submitHandler: this.submitPrison
      });
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
