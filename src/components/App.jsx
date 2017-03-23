import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import {
  always, concat, assoc, assocPath, dissoc, dissocPath, map, over, propEq, reject, ifElse, isEmpty,
  isNil, lensPath
} from 'ramda';
import 'normalize.css/normalize.css';
import { injectGlobal } from 'styled-components';
import { fetchData, concatUrl, directoryToOptions, getMaxPrisoners } from '../utils/utils';
import IndexPage from './IndexPage';
import LoginPage from './LoginPage';
import AdminPage from './AdminPage';
import PeriodPage from './PeriodPage';
import PrisonPage from './PrisonPage';
import NoMatch from './NoMatch';

// eslint-disable-next-line
injectGlobal`
  * {
    box-sizing: border-box;
  }

  html {
    font-family: 'PT Sans', sans-serif;
    font-size: 16px;
  }
`;

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
  features: [
    {
      geometry: {
        coordinates: [90, 62],
        type: 'Point'
      },
      properties: {}
    }
  ]
};

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
  }

  componentWillMount() {
    const { token, prisons } = this.state;
    if (token && isEmpty(prisons)) {
      fetchData({ token })
        .then(({ activities, places, types, periods, prisons, photos }) => {
          this.setState({ activities, places, types, periods, prisons, photos });
        });
    }
  }

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
    const LoginRoute = ({ component, ...rest }) => (
      <Route
        {...rest} render={props => (
        !this.state.token ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: '/admin',
              state: { from: props.location }
            }}
          />
        )
      )}
      />
    );

    const PrivateRoute = ({ component, ...rest }) => (
      <Route
        {...rest}
        render={props => (
          this.state.token ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )
        )}
      />
    );

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <IndexPage
                periods={this.state.periods}
                prisons={this.state.prisons}
              />
            )}
          />
          <LoginRoute
            path='/login'
            component={LoginPage}
            onSubmit={this.login}
          />
          <PrivateRoute
            exact path='/admin'
            component={AdminPage}
            periods={this.state.periods}
            prisons={this.state.prisons}
            places={this.state.places}
            types={this.state.types}
            onLogout={this.logout}
            createPrison={this.createPrison.bind(this, prisonTemplate)}
          />
          <PrivateRoute
            path='/admin/period/:periodId'
            component={PeriodPage}
            period={this.state.periods[1]}
            updateHandler={this.updatePeriod}
            submitHandler={this.submitPeriod}
          />
          <PrivateRoute
            path='/admin/prison/:prisonId'
            component={PrisonPage}
            prison={this.state.prisons[1]}
            photos={this.state.photos[1]}
            changeDropDownItem={this.changeDropDownItem}
            activityOptions={directoryToOptions(this.state.activities)}
            placeOptions={directoryToOptions(this.state.places)}
            typeOptions={directoryToOptions(this.state.types)}
            uploadHandler={this.uploadPhotos}
            deletePhoto={this.deletePhoto}
            submitHandler={this.submitPrison}
            updateHandler={this.updatePrison}
            deleteHandler={this.deletePrison}
          />
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
