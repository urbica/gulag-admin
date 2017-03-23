import React, { PropTypes } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginRoute from './LoginRoute';
import PrivateRoute from './PrivateRoute';

import IndexPage from './IndexPage';
import AdminPage from './AdminPage';
import PeriodPage from './PeriodPage';
import PrisonPage from './PrisonPage';
import NoMatch from './NoMatch';

const Router = (props) => {
  const { isAuthenticated } = props;

  const renderIndexPage = () => (
    <IndexPage
      periods={props.periods}
      prisons={props.prisons}
    />
  );

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={renderIndexPage} />
        <LoginRoute path='/login' onSubmit={props.onLogin} />
        <PrivateRoute
          exact path='/admin'
          component={AdminPage}
          isAuthenticated={isAuthenticated}
          periods={props.periods}
          prisons={props.prisons}
          places={props.places}
          types={props.types}
          onLogout={props.onLogout}
          createPrison={props.createPrison}
        />
        <PrivateRoute
          path='/admin/period/:periodId'
          component={PeriodPage}
          period={props.periods[1]}
          updateHandler={props.updatePeriod}
          submitHandler={props.submitPeriod}
        />
        <PrivateRoute
          path='/admin/prison/:prisonId'
          component={PrisonPage}
          prison={props.prisons[1]}
          photos={props.photos[1]}
          changeDropDownItem={props.changeDropDownItem}
          activityOptions={props.activityOptions}
          placeOptions={props.placeOptions}
          typeOptions={props.typeOptions}
          uploadHandler={props.uploadPhotos}
          deletePhoto={props.deletePhoto}
          submitHandler={props.submitPrison}
          updateHandler={props.updatePrison}
          deleteHandler={props.deletePrison}
        />
        <Route component={NoMatch} />
      </Switch>
    </BrowserRouter>
  );
};

Router.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default Router;
