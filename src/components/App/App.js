import React from 'react';
import addNewYear from '../../utils/add-new-year';
import { assocPath, compose, dissocPath, map, head, groupBy, prop, test, isEmpty } from 'ramda';
import { browserHistory } from 'react-router';
import { directoryToOptions, fillMaxPrisoners } from '../../utils/preprocessing';
import './App.css';

const backendUrl = 'http://gulag.urbica.co/backend';

const App = React.createClass({
  getInitialState() {
    return {
      activities: [],
      places: [],
      types: [],
      prisons: {},
      newPrison: {
        id: undefined,
        name_ru: '',
        name_en: '',
        addl_names_ru: '',
        addl_names_en: '',
        description_ru: '',
        description_en: '',
        published_ru: false,
        published_en: false,
        features: []
      }
    };
  },

  componentWillMount() {
    const groupById = compose(map(head), groupBy(prop('id')));
    const preprocess = compose(fillMaxPrisoners, groupById);

    Promise.all([
      fetch(`${backendUrl}/public/camps.json`).then(r => r.json()),
      fetch(`${backendUrl}/public/activities.json`).then(r => r.json()),
      fetch(`${backendUrl}/public/places.json`).then(r => r.json()),
      fetch(`${backendUrl}/public/types.json`).then(r => r.json())
    ]).then(([prisons, activities, places, types]) => {
      this.setState({
        activities: activities,
        places: places,
        types: types,
        prisons: preprocess(prisons)
      });
    });
  },

  updatePrison(prison) {
    if (prison.id) {
      this.setState(assocPath(['prisons', prison.id], prison, this.state));
    } else {
      this.setState({ newPrison: prison });
    }
  },

  submitPrison(prison) {
    let request;
    let message;
    if (prison.id) {
      request = fetch(`${backendUrl}/public/camps/id/${prison.id}`, {
        body: JSON.stringify(prison),
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      message = `Лагерь "${prison.name_ru}" обновлён`;
    } else {
      request = fetch(`${backendUrl}/public/camps/id`, {
        body: JSON.stringify(prison),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      message = `Лагерь "${prison.name_ru}" добавлен`;
    }

    request
      .then(response => response.json())
      .then(newPrison => {
        this.setState(assocPath(['prisons', newPrison.id], newPrison, this.state), () =>
          browserHistory.push(`/admin/prisons/${newPrison.id}`)
        );
        alert(message);
      });
  },

  deletePrison(prison) {
    if (prison.id) {
      if (confirm(`Удалить лагерь "${prison.name_ru}"?`)) {
        fetch(`${backendUrl}/public/camps/id/${prison.id}`, { method: 'DELETE' })
        .then(() => {
          browserHistory.push('/admin/prisons');
          this.setState(dissocPath(['prisons', `${prison.id}`], this.state));
        });
      }
    }
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
    // /admin/prisons/new -> <PrisonPage />
    else if (test(/\/admin\/prisons\/new/, pathname)) {
      const prison = this.state.newPrison;
      return React.cloneElement(this.props.children, {
        prison: prison,
        changeDropDownItem: this.changeDropDownItem,
        addNewYear: this.addNewYear,
        activityOptions: directoryToOptions(this.state.activities),
        placeOptions: directoryToOptions(this.state.places),
        typeOptions: directoryToOptions(this.state.types),
        submitHandler: this.submitPrison,
        updateHandler: this.updatePrison,
        deleteHandler: this.deletePrison
      });
    }
    // /admin/prisons/prisonId -> <PrisonPage />
    else if (test(/\/admin\/prisons\/\d+/, pathname)) {
      const { prisonId } = this.props.router.params;
      return React.cloneElement(this.props.children, {
        prison: this.state.prisons[prisonId],
        changeDropDownItem: this.changeDropDownItem,
        addNewYear: this.addNewYear,
        activityOptions: directoryToOptions(this.state.activities),
        placeOptions: directoryToOptions(this.state.places),
        typeOptions: directoryToOptions(this.state.types),
        submitHandler: this.submitPrison,
        updateHandler: this.updatePrison,
        deleteHandler: this.deletePrison
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
