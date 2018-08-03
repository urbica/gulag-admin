import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';

// config
import locationTemplate from '../../../../config/locationTemplate';

// utils
import locationToFeature from '../../../../utils/locationToFeature';

// components
import Map from './Map/Map';
import CampYears from './CampYears/CampYears';
import CampStatistics from './CampStatistics/CampStatistics';

// styled
import Container from './Container';
import LocationsBar from './LocationsBar/LocationsBar';
import Fieldset from '../Fieldset';
import FieldTitle from '../FieldTitle';
import TextInput from '../TextInput/TextInput';

class CampLocation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocationIndex: 0,
      showDeleteMenu: false
    };

    this.selectLocation = this.selectLocation.bind(this);
    this.openDeleteMenu = this.openDeleteMenu.bind(this);
    this.removeLocation = this.removeLocation.bind(this);
    this.closeDeleteMenu = this.closeDeleteMenu.bind(this);
    this.createLocation = this.createLocation.bind(this);
    this.updateCoordinates = this.updateCoordinates.bind(this);
    this.updateLocationDesc = this.updateLocationDesc.bind(this);
    this.toggleYear = this.toggleYear.bind(this);
    this.updatePrisonersAmount = this.updatePrisonersAmount.bind(this);
  }

  selectLocation(selectedLocationIndex) {
    this.closeDeleteMenu();
    this.setState({ selectedLocationIndex });
  }

  openDeleteMenu() {
    this.setState({ showDeleteMenu: true });
  }

  removeLocation(locationIndex) {
    const { locations, deleteCampLocation, updateField } = this.props;
    const locationId = locations.getIn([locationIndex, 'id']);
    const checkLocations = locations.reduce(
      (acc, location) => location.get('id') !== undefined,
      false
    );

    if (checkLocations && locations.size > 1 && locationId !== undefined) {
      deleteCampLocation(locationId);

      const newLocations = locations.delete(locationIndex);

      updateField(['locations'], newLocations);
      this.setState(({ selectedLocationIndex }) => ({
        selectedLocationIndex: selectedLocationIndex - 1,
        showDeleteMenu: false
      }));
    }

    if (locationId === undefined) {
      const newLocations = locations.delete(locationIndex);

      updateField(['locations'], newLocations);
      this.setState(({ selectedLocationIndex }) => ({
        selectedLocationIndex: selectedLocationIndex - 1,
        showDeleteMenu: false
      }));
    }
  }

  closeDeleteMenu() {
    this.setState({ showDeleteMenu: false });
  }

  createLocation() {
    const { updateField, locations } = this.props;
    const newLocation = locationTemplate.set('orderIndex', locations.size);

    updateField(['locations', locations.size], newLocation);
    this.setState({ selectedLocationIndex: locations.size });
  }

  updateCoordinates(coordinates) {
    const { updateField } = this.props;
    const { selectedLocationIndex } = this.state;

    updateField(
      ['locations', selectedLocationIndex, 'geometry', 'coordinates'],
      Immutable.fromJS(coordinates)
    );
  }

  updateLocationDesc(value) {
    const { selectedLocationIndex } = this.state;
    const { updateField, activeLang } = this.props;

    updateField(
      ['locations', selectedLocationIndex, 'description', activeLang],
      value
    );
  }

  toggleYear(year) {
    const { selectedLocationIndex } = this.state;
    const { locations, deleteCampStat, campId, updateField } = this.props;

    const isYearExists = locations
      .getIn([selectedLocationIndex, 'statistics'])
      .find(stat => stat.get('year') === year);

    if (isYearExists) {
      const statistics = locations.getIn([selectedLocationIndex, 'statistics']);
      const statId = statistics
        .filter(stat => stat.get('year') === year)
        .first()
        .get('id');

      if (statId !== undefined) {
        deleteCampStat(statId, campId);
      }

      const newStatistics = locations
        .getIn([selectedLocationIndex, 'statistics'])
        .filter(stat => stat.get('year') !== year);

      updateField(
        ['locations', selectedLocationIndex, 'statistics'],
        newStatistics
      );
    } else {
      const newStatistics = locations
        .getIn([selectedLocationIndex, 'statistics'])
        .push(Immutable.fromJS({ year, prisonersCount: null }));

      updateField(
        ['locations', selectedLocationIndex, 'statistics'],
        newStatistics
      );
    }
  }

  updatePrisonersAmount(index, event) {
    const { selectedLocationIndex } = this.state;
    const { locations, updateField } = this.props;
    const { value } = event.target;

    const updatedStatistics = locations
      .getIn([selectedLocationIndex, 'statistics'])
      .sort((a, b) => a.get('year') > b.get('year'))
      .setIn([index, 'prisonersCount'], value);

    updateField(
      ['locations', selectedLocationIndex, 'statistics'],
      updatedStatistics
    );
  }

  render() {
    const { selectedLocationIndex, showDeleteMenu } = this.state;
    const { locations, activeLang } = this.props;
    const selectedLocation = locations.get(selectedLocationIndex);
    const coordinates = selectedLocation.getIn(['geometry', 'coordinates']);

    return (
      <Container>
        <LocationsBar
          locations={locations}
          showDeleteMenu={showDeleteMenu}
          coordinates={coordinates}
          selectedLocationIndex={selectedLocationIndex}
          removeLocation={this.removeLocation}
          closeDeleteMenu={this.closeDeleteMenu}
          selectLocation={this.selectLocation}
          createLocation={this.createLocation}
          updateCoordinates={this.updateCoordinates}
          openDeleteMenu={this.openDeleteMenu}
        />
        <Map features={[locationToFeature(selectedLocation)]} />
        <Fieldset>
          <FieldTitle>
            Описание локации
          </FieldTitle>
          <TextInput
            placeholder='Описание локации'
            value={selectedLocation.getIn(['description', activeLang])}
            onChange={this.updateLocationDesc}
          />
        </Fieldset>
        <CampYears
          locations={locations}
          selectedLocationIndex={selectedLocationIndex}
          toggleYear={this.toggleYear}
        />
        <CampStatistics
          statistics={selectedLocation.get('statistics')}
          updatePrisonersAmount={this.updatePrisonersAmount}
        />
      </Container>
    );
  }
}

CampLocation.propTypes = {
  locations: PropTypes.object.isRequired,
  updateField: PropTypes.func.isRequired,
  deleteCampStat: PropTypes.func.isRequired,
  deleteCampLocation: PropTypes.func.isRequired,
  campId: PropTypes.number.isRequired,
  activeLang: PropTypes.string.isRequired
};

export default CampLocation;
