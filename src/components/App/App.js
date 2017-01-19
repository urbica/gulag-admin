import React from 'react';
import { browserHistory } from 'react-router';
import './App.css';

import { always, concat, assocPath, dissoc, dissocPath, map, over, test,
  ifElse, isEmpty, isNil, lensPath } from 'ramda';

import { fetchData, concatUrl, directoryToOptions } from '../../utils/utils';

const backendUrl = 'http://gulag.urbica.co/backend';

const App = React.createClass({
  getInitialState() {
    return {
      activities: [],
      places: [],
      types: [],
      token: localStorage.getItem('token'),
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
    const { token } = this.state;
    if (!token) {
      browserHistory.push('/login');
    } else {
      fetchData({ backendUrl, token })
      .then(({ activities, places, types, prisons }) => {
        this.setState({ activities, places, types, prisons });
      });
    }
  },

  login(password) {
    const credentials = { email: 'hello@urbica.co', password };

    fetch(`${backendUrl}/login`, {
      body: JSON.stringify(credentials),
      method: 'POST',
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(({ token }) => {
      localStorage.setItem('token', token);
      return fetchData({ backendUrl, token })
      .then(({ activities, places, types, prisons }) => {
        this.setState({ activities, places, types, prisons, token }, () => {
          browserHistory.push('/admin');
        });
      });
    })
    .catch(error => console.error(error));
  },

  logout() {
    localStorage.removeItem('token');
    this.setState(dissoc('token'), () => {
      browserHistory.push('/login');
    });
  },

  uploadPhotos(prisonId, photos) {
    let uploads = new FormData();
    uploads.append('camp_id', prisonId);
    Array.from(photos).forEach(photo => uploads.append('path', photo));

    fetch(`${backendUrl}/api/public/uploads/id`, {
      method: 'POST',
      body: uploads,
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    })
    .then(response => response.json())
    .then(response => {
      const photosLens = lensPath(['prisons', prisonId, 'photos']);
      const newPhotos = map(concatUrl(backendUrl, 'path'), response);
      const setPhotos = ifElse(isNil, always(newPhotos), concat(newPhotos));
      this.setState(over(photosLens, setPhotos));
    })
    .catch(error => console.error(error));
  },

  updatePrison(prison) {
    if (prison.id) {
      this.setState(assocPath(['prisons', prison.id], prison));
    } else {
      this.setState({newPrison: prison});
    }
  },

  submitPrison(prison) {
    let request;
    let message;
    if (prison.id) {
      request = fetch(`${backendUrl}/api/public/camps/id/${prison.id}`, {
        body: JSON.stringify(prison),
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        }
      });
      message = `Лагерь "${prison.name_ru}" обновлён`;
    } else {
      request = fetch(`${backendUrl}/api/public/camps/id`, {
        body: JSON.stringify(prison),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        }
      });
      message = `Лагерь "${prison.name_ru}" добавлен`;
    }

    request
      .then(response => response.json())
      .then(([newPrison]) => {
        this.setState(assocPath(['prisons', newPrison.id], newPrison), () =>
          browserHistory.push(`/admin/prisons/${newPrison.id}`)
        );
        alert(message);
      });
  },

  deletePrison(prison) {
    if (prison.id) {
      if (confirm(`Удалить лагерь "${prison.name_ru}"?`)) {
        fetch(`${backendUrl}/api/public/camps/id/${prison.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }).then(() => {
          browserHistory.push('/admin/prisons');
          this.setState(dissocPath(['prisons', `${prison.id}`]));
        });
      }
    }
  },

  renderChildren() {
    const {pathname} = this.props.router.location;

    // /login -> <LoginPage />
    if (test(/^(\/login\/?)$/, pathname)) {
      return React.cloneElement(this.props.children, {
        onSubmit: this.login
      });
    }

    if (isEmpty(this.state.prisons)) {
      return null;
    }

    // /admin || /admin/prisons -> <IndexPage />
    if (test(/^(\/admin\/?|\/admin\/prisons\/?)$/, pathname)) {
      return React.cloneElement(this.props.children, {
        prisons: this.state.prisons,
        onLogout: this.logout
      });
    }
    // /admin/prisons/new -> <PrisonPage />
    else if (test(/\/admin\/prisons\/new/, pathname)) {
      const prison = this.state.newPrison;
      return React.cloneElement(this.props.children, {
        prison: prison,
        changeDropDownItem: this.changeDropDownItem,
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
      const prison = this.state.prisons[prisonId];
      return React.cloneElement(this.props.children, {
        prison: prison,
        changeDropDownItem: this.changeDropDownItem,
        activityOptions: directoryToOptions(this.state.activities),
        placeOptions: directoryToOptions(this.state.places),
        typeOptions: directoryToOptions(this.state.types),
        uploadHandler: this.uploadPhotos,
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
