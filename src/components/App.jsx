import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'normalize.css/normalize.css';
import { injectGlobal } from 'styled-components';
import {
  always, concat, assoc, assocPath, dissoc, dissocPath, map, over, propEq, reject, ifElse, isEmpty,
  isNil, lensPath
} from 'ramda';
import IndexPage from './IndexPage';
import AdminPage from './AdminPage';
import NoMatch from './NoMatch';
// import prisonTemplate from '../utils/prisonTemplate';
import { fetchData, concatUrl, getMaxPrisoners } from '../utils/utils';
// import { fetchData, concatUrl, directoryToOptions, getMaxPrisoners } from '../utils/utils';
// import Router from './Router';

// const save = (<Router
//   periods={this.state.periods}
//   prisons={this.state.prisons}
//   photos={this.state.photos}
//   places={this.state.places}
//   types={this.state.types}
//   createPrison={this.createPrison.bind(this, prisonTemplate)}
//   updatePeriod={this.updatePeriod}
//   submitPeriod={this.submitPeriod}
//   changeDropDownItem={this.changeDropDownItem}
//   activityOptions={directoryToOptions(this.state.activities)}
//   placeOptions={directoryToOptions(this.state.places)}
//   typeOptions={directoryToOptions(this.state.types)}
//   uploadPhotos={this.uploadPhotos}
//   deletePhoto={this.deletePhoto}
//   submitPrison={this.submitPrison}
//   updatePrison={this.updatePrison}
//   deletePrison={this.deletePrison}
//   onLogin={this.login}
//   onLogout={this.logout}
//   isAuthenticated={!!this.state.token}
// />);

// eslint-disable-next-line
injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: 'PT Sans', sans-serif;
    font-size: 16px;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      places: [],
      types: [],
      periods: {},
      photos: {},
      prisons: {},
      token: localStorage.getItem('token')
    };

    this.login = this.login.bind(this);
  }

  // может стоит данные не только при пустом this.state.prisons, а каждый раз?
  componentWillMount() {
    const { token, prisons } = this.state;
    if (token && isEmpty(prisons)) {
      fetchData({ token })
        .then(({ activities, places, types, periods, prisons, photos }) => {
          this.setState({
            activities,
            places,
            types,
            periods,
            prisons,
            photos
          }, console.log('fetched'));
        });
    }
  }

  login(password) {
    console.log('login', password);
    console.log('this', this);

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
          .then(({ activities, places, types, periods, prisons, photos }) => {
            this.setState({ activities, places, types, periods, prisons, token, photos }, () => {
              window.history.pushState('/admin');
            });
          });
      })
      .catch(error => console.error(error));
  }

  logout() {
    localStorage.removeItem('token');
    this.setState(dissoc('token'), () => {
      window.history.pushState('/login');
    });
  }

  updatePeriod(period) {
    this.setState(assocPath(['periods', period.id], period));
  }

  submitPeriod(period) {
    fetch(`/api/public/periods/id/${period.id}`, {
      body: JSON.stringify(period),
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(([submittedPeriod]) => {
        this.setState(assocPath(['periods', submittedPeriod.id], submittedPeriod), () =>
          window.history.pushState(`/admin/period/${submittedPeriod.id}`)
        );
        alert(`Период "${period.name.ru}" обновлён`);
      });
  }

  uploadPhotos(prisonId, photos) {
    const uploads = new FormData();
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
      .then((response) => {
        const photosLens = lensPath(['photos', prisonId]);
        const newPhotos = map(concatUrl(window.location.origin, 'path'), response);
        const setPhotos = ifElse(isNil, always(newPhotos), concat(newPhotos));
        this.setState(over(photosLens, setPhotos));
      })
      .catch(error => console.error(error));
  }

  deletePhoto(prisonId, photoId) {
    if (prisonId && photoId) {
      fetch(`/api/public/uploads/id/${photoId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${this.state.token}` }
      })
        .then(() => {
          this.setState(over(lensPath(['photos', prisonId]), reject(propEq('id', photoId))));
        })
        .catch(error => console.error(error));
    }
  }

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
          window.history.pushState(`/admin/prisons/${newPrison.id}`)
        );
      });
  }

  updatePrison(prison) {
    if (prison.id) {
      const newPrison = getMaxPrisoners(prison);
      this.setState(assocPath(['prisons', prison.id], newPrison));
    }
  }

  submitPrison(prison) {
    if (prison.id) {
      const newPrison = assoc('updated_at', (new Date()).toISOString(), prison);
      fetch(`/api/public/camps/id/${newPrison.id}`, {
        body: JSON.stringify(newPrison),
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(([submittedPrison]) => {
          this.setState(assocPath(['prisons', submittedPrison.id], getMaxPrisoners(submittedPrison)), () =>
            window.history.pushState(`/admin/prisons/${submittedPrison.id}`)
          );
          alert(`Лагерь "${prison.name.ru}" обновлён`);
        });
    }
  }

  deletePrison(prison) {
    if (prison.id) {
      if (confirm(`Удалить лагерь "${prison.name.ru}"?`)) {
        fetch(`/api/public/camps/id/${prison.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }).then(() => {
          window.history.pushState('/admin/prisons');
          this.setState(dissocPath(['prisons', `${prison.id}`]));
        });
      }
    }
  }

  render() {
    const { prisons, periods, places, types, token } = this.state;
    const renderIndexPage = props => (
      <IndexPage
        prisons={prisons}
        periods={periods}
        {...props}
      />
    );
    const renderAdminPage = () => (
      <AdminPage
        token={token}
        prisons={prisons}
        periods={periods}
        places={places}
        types={types}
      />
    );

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={renderIndexPage} />
          <Route path='/prison:id' render={renderIndexPage} />
          <Route path='/period:id' render={renderIndexPage} />
          <Route exact path='/admin' render={renderAdminPage} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
