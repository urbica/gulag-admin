import React from 'react';
import { browserHistory } from 'react-router';
import './App.css';

import {
  always, concat, assocPath, dissoc, dissocPath, map, over, test,
  ifElse, isEmpty, isNil, lensPath
} from 'ramda';

import { fetchData, concatUrl, directoryToOptions, getMaxPrisoners } from '../../utils/utils';

const prisonTemplate = {
  id: undefined,
  name: {
    ru: 'Новый лагерь',
    en: 'New prison',
    de: 'Neue Gefängnis'
  },
  additional_names: {
    ru: '',
    en: '',
    de: ''
  },
  location: {
    ru: '',
    en: '',
    de: ''
  },
  description: {
    ru: '',
    en: '',
    de: ''
  },
  published: {
    ru: false,
    en: false,
    de: false
  },
  features: []
}

const App = React.createClass({
  getInitialState() {
    return {
      activities: [],
      places: [],
      types: [],
      photos: {},
      prisons: {},
      token: localStorage.getItem('token')
    };
  },

  componentWillMount() {
    const { token } = this.state;
    if (!token) {
      browserHistory.push('/login');
    } else {
      fetchData({ token })
        .then(({ activities, places, types, prisons, photos }) => {
          this.setState({ activities, places, types, prisons, photos });
        });
    }
  },

  login(password) {
    const credentials = { email: 'hello@urbica.co', password };

    fetch('/login', {
      body: JSON.stringify(credentials),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(({ token }) => {
        localStorage.setItem('token', token);
        return fetchData({ token })
          .then(({ activities, places, types, prisons, photos }) => {
            this.setState({ activities, places, types, prisons, token, photos }, () => {
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

    fetch('/api/public/uploads/id', {
      method: 'POST',
      body: uploads,
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    })
      .then(response => response.json())
      .then(response => {
        const photosLens = lensPath(['photos', prisonId]);
        const newPhotos = map(concatUrl(window.location.origin, 'path'), response);
        const setPhotos = ifElse(isNil, always(newPhotos), concat(newPhotos));
        this.setState(over(photosLens, setPhotos));
      })
      .catch(error => console.error(error));
  },

  createPrison(prison) {
    fetch('/api/public/camps/id', {
      body: JSON.stringify(prison),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(([newPrison]) => {
      this.setState(assocPath(['prisons', newPrison.id], newPrison), () =>
        browserHistory.push(`/admin/prisons/${newPrison.id}`)
      );
    });
  },

  updatePrison(prison) {
    if (prison.id) {
      this.setState(assocPath(['prisons', prison.id], getMaxPrisoners(prison)));
    } else {
      this.setState({ newPrison: getMaxPrisoners(prison) });
    }
  },

  submitPrison(prison) {
    let request;
    let message;
    if (prison.id) {
      request = fetch(`/api/public/camps/id/${prison.id}`, {
        body: JSON.stringify(prison),
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        }
      });
      message = `Лагерь "${prison.name.ru}" обновлён`;
    } else {
      request = fetch('/api/public/camps/id', {
        body: JSON.stringify(prison),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        }
      });
      message = `Лагерь "${prison.name.ru}" добавлен`;
    }

    request
      .then(response => response.json())
      .then(([newPrison]) => {
        this.setState(assocPath(['prisons', newPrison.id], getMaxPrisoners(newPrison)), () =>
          browserHistory.push(`/admin/prisons/${newPrison.id}`)
        );
        alert(message);
      });
  },

  deletePrison(prison) {
    if (prison.id) {
      if (confirm(`Удалить лагерь "${prison.name.ru}"?`)) {
        fetch(`/api/public/camps/id/${prison.id}`, {
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
    const { pathname } = this.props.router.location;

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
        places: this.state.places,
        onLogout: this.logout,
        createPrison: this.createPrison.bind(this, prisonTemplate)
      });
    }
    // /admin/prisons/prisonId -> <PrisonPage />
    else if (test(/\/admin\/prisons\/\d+/, pathname)) {
      const { prisonId } = this.props.router.params;
      const prison = this.state.prisons[prisonId];
      return React.cloneElement(this.props.children, {
        prison: prison,
        photos: this.state.photos[prisonId],
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
