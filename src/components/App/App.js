import React from 'react';
import {compose, map, head, groupBy, prop, isEmpty} from 'ramda';
import addNewYear from '../../utils/add-new-year';
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

    fetch('http://gulag.urbica.co/backend/public/camps.json')
      .then(r => r.json())
      .then(arr => groupById(arr))
      .then(obj => this.setState({prisons: obj}));
  },

  addNewYear(prisonId, locationId, year) {
    this.setState(addNewYear(this.state, prisonId, locationId, year))
  },

  render() {
    return (
      <div className="App">
        {/*<LoginPage/>*/}
        {/*<IndexPage prisons={ this.state.prisons }/>*/}
        {
          !isEmpty(this.state.prisons) &&
          <PrisonPage prison={ this.state.prisons[9] }
                      changeDropDownItem={ this.changeDropDownItem }
                      addNewYear={ this.addNewYear }
          />
        }
      </div>
    );
  }
});

export default App;