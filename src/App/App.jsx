import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {
  always, concat, assoc, assocPath, dissoc, dissocPath, map, over, propEq,
  reject, ifElse, isNil, lensPath
} from 'ramda';
import './globalStyles';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import IndexPage from '../pages/Map';
import LoginPage from '../pages/Admin/LoginPage';
import AdminPage from '../pages/Admin';
import PrisonPage from '../pages/Admin/PrisonPage';
import PeriodPage from '../pages/Admin/PeriodPage';
import prisonTemplate from '../utils/prisonTemplate';
import { fetchData, concatUrl, getMaxPrisoners } from '../utils/utils';

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem('token'),
      prisons: {},
      photos: {},
      activities: [],
      places: {},
      types: [],
      periods: {},
      notes: {}
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.updatePeriod = this.updatePeriod.bind(this);
    this.submitPeriod = this.submitPeriod.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.deletePhoto = this.deletePhoto.bind(this);
    this.createPrison = this.createPrison.bind(this);
    this.updatePrison = this.updatePrison.bind(this);
    this.submitPrison = this.submitPrison.bind(this);
    this.deletePrison = this.deletePrison.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
  }

  componentWillMount() {
    const { token } = this.state;

    if (!token) {
      const publicToken = 'pk.eyJhbGciOiJIUzI1NiJ9.cHVibGlj.KFtMch9eeBMfLUVHAvDFlyPwfSI4V8EYu5yW5qIa9Sg';
      fetchData({ token: publicToken })
        .then(({ activities, places, types, periods, prisons, photos }) =>
          this.setState({ activities, places, types, periods, prisons, photos }));
    } else {
      fetchData({ token })
        .then(({ activities, places, types, periods, prisons, photos, notes }) =>
          this.setState({ activities, places, types, periods, prisons, photos, notes }))
        .catch((error) => {
          if (error === 401) {
            localStorage.removeItem('token');
            history.push('/login');
          }
        });
    }
  }

  login(password) {
    const options = {
      body: JSON.stringify({ email: 'hello@urbica.co', password }),
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch('/login', options)
      .then(response => response.json())
      .then(({ token }) => {
        localStorage.setItem('token', token);
        return fetchData({ token })
          .then(({ activities, places, types, periods, prisons, photos, notes }) => {
            this.setState({ activities, places, types, periods, prisons, token, photos, notes },
              () => {
                history.push('/admin');
              });
          });
      })
      .catch(() => {
        localStorage.removeItem('token');
        history.push('/login');
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.setState(dissoc('token'), () => {
      history.push('/login');
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
          history.push(`/admin/period${submittedPeriod.id}`)
        );
        // eslint-disable-next-line
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
      // eslint-disable-next-line
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
        // eslint-disable-next-line
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
          // TODO
          history.push(`/admin/prison${newPrison.id}`)
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
      if (this.state.notes[prison.id] && this.state.notes[prison.id].prison_id) {
        fetch(`/api/public/notes/prison_id/${prison.id}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${this.state.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ note: this.state.notes[prison.id].note })
        });
      } else if (this.state.notes[prison.id]) {
        fetch('/api/public/notes/id/', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.state.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ note: this.state.notes[prison.id].note, prison_id: prison.id })
        })
          .then(response => response.json())
          .then(([PromiseValue]) => {
            this.setState(assocPath(['notes', prison.id], PromiseValue));
          });
      }

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
            history.push(`/admin/prison${submittedPrison.id}`)
          );
          // eslint-disable-next-line
          alert(`Лагерь "${prison.name.ru}" обновлён`);
        });
    }
  }

  deletePrison(prison) {
    if (prison.id) {
      // eslint-disable-next-line
      if (confirm(`Удалить лагерь "${prison.name.ru}"?`)) {
        fetch(`/api/public/notes/prison_id/${prison.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        });
        fetch(`/api/public/camps/id/${prison.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${this.state.token}`
          }
        }).then(() => {
          history.push('/admin');
          this.setState(dissocPath(['prisons', `${prison.id}`]));
        });
      }
    }
  }

  updateNotes(id, event) {
    this.setState(assocPath(['notes', id, 'note'], event.target.value));
  }

  render() {
    const { prisons, periods, activities, places, types, photos, notes, token } = this.state;

    return (
      <BrowserRouter history={history}>
        <Switch>
          <PrivateRoute
            path='/admin/period:id'
            isAuthenticated={!!token}
            component={PeriodPage}
            updateHandler={this.updatePeriod}
            submitHandler={this.submitPeriod}
            periods={periods}
          />
          <PrivateRoute
            path='/admin/prison:id'
            isAuthenticated={!!token}
            component={PrisonPage}
            prisons={prisons}
            photos={photos}
            activities={activities}
            places={places}
            types={types}
            notes={notes}
            uploadHandler={this.uploadPhotos}
            updateHandler={this.updatePrison}
            deleteHandler={this.deletePrison}
            submitHandler={this.submitPrison}
            deletePhoto={this.deletePhoto}
            updateNoteHandler={this.updateNotes}
          />
          <PrivateRoute
            path='/admin'
            component={AdminPage}
            isAuthenticated={!!token}
            prisons={prisons}
            periods={periods}
            places={places}
            types={types}
            createPrison={this.createPrison.bind(null, prisonTemplate)}
          />
          <PublicRoute
            path='/login'
            component={LoginPage}
            isAuthenticated={!!token}
            onSubmit={this.login}
          />
          <PublicRoute
            path='/'
            component={IndexPage}
            prisons={prisons}
            periods={periods}
            activities={activities}
            places={places}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
