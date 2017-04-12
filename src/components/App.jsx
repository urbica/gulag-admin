import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { injectGlobal } from 'styled-components';
import {
  always, concat, assoc, assocPath, dissoc, dissocPath, map, over, propEq,
  reject, ifElse, isNil, lensPath } from 'ramda';
import 'normalize.css/normalize.css';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import IndexPage from './IndexPage';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import NoMatch from './NoMatch';
import { fetchData, concatUrl, getMaxPrisoners } from '../utils/utils';

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

const history = createBrowserHistory();

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

  componentWillMount() {
    const { token } = this.state;

    if (!token) {
      const publicToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvQHVyYmljYS5jbyIsImlhdCI6MTQ5MTk5NDkxNn0.x4SvDN38Dr-14pgDHJDDhlYP-rnpudBr6PcHr_FNMro';
      fetchData({ token: publicToken })
        .then(({ periods, prisons }) => this.setState({ periods, prisons }));
    } else {
      fetchData({ token })
        .then(({ activities, places, types, periods, prisons, photos }) =>
          this.setState({ activities, places, types, periods, prisons, photos }));
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
          .then(({ activities, places, types, periods, prisons, photos }) => {
            this.setState({ activities, places, types, periods, prisons, token, photos }, () => {
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
          history.push(`/admin/period/${submittedPeriod.id}`)
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
          history.push(`/admin/prisons/${newPrison.id}`)
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
            history.push(`/admin/prisons/${submittedPrison.id}`)
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
          history.push('/admin/prisons');
          this.setState(dissocPath(['prisons', `${prison.id}`]));
        });
      }
    }
  }

  render() {
    const { prisons, periods, places, types, token } = this.state;

    return (
      <BrowserRouter history={history}>
        <Switch>
          <PrivateRoute
            path='/admin'
            component={AdminPage}
            isAuthenticated={!!token}
            prisons={prisons}
            periods={periods}
            places={places}
            types={types}
          />
          <PublicRoute
            path='/login'
            component={LoginPage}
            isAuthenticated={!!token}
            onSubmit={this.login}
          />
          <PublicRoute path='/' component={IndexPage} prisons={prisons} periods={periods} />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
