/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
import './PrisonLocation.css';

// components
import CoordinatesInput from './CoordinatesInput';
import Map from './Map/Map';
import CampYears from './CampYears/CampYears';
import CampStatistics from './CampStatistics/CampStatistics';

// styled
import Container from './Container';
import LocationTab from './LocationTab';

const newLocation = Immutable.fromJS({
  activityId: null,
  description: { de: '', en: '', ru: '' },
  geometry: { type: 'Point', coordinates: [90, 62] },
  regionId: null,
  statistics: [],
  typeId: null
});

const locationToFeature = location => ({
  type: 'Feature',
  properties: {},
  geometry: location.get('geometry').toJS()
});

class CampLocation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocationIndex: 0,
      showDeleteMenu: false
    };

    this.createLocation = () => {
      const { locations } = this.props;

      props.updateField(['locations', locations.size], newLocation);
      this.setState({ selectedLocationIndex: locations.size });
    };

    this.removeFeature = (locationId) => {
      const newLocations = this.props.locations.delete(locationId);

      props.updateField(['locations'], newLocations);
      this.setState(({ selectedLocationIndex }) => ({
        selectedLocationIndex: selectedLocationIndex - 1,
        showDeleteMenu: false
      }));
    };

    this.selectFeature = (selectedLocationIndex) => {
      this.closeDeleteMenu();
      this.setState({ selectedLocationIndex });
    };

    this.openDeleteMenu = () => {
      this.setState({ showDeleteMenu: true });
    };

    this.closeDeleteMenu = () => {
      this.setState({ showDeleteMenu: false });
    };

    this.updateCoordinates = (coordinates) => {
      const { selectedLocationIndex } = this.state;

      this.props.updateField(
        ['locations', selectedLocationIndex, 'geometry', 'coordinates'],
        Immutable.fromJS(coordinates)
      );
    };

    this.toggleYear = (year) => {
      const { selectedLocationIndex } = this.state;
      const { locations, updateField } = this.props;

      const isYearExists = locations
        .getIn([selectedLocationIndex, 'statistics'])
        .find(stat => stat.get('year') === year);

      if (isYearExists) {
        const newStatistics = locations
          .getIn([selectedLocationIndex, 'statistics'])
          .filter(stat => stat.get('year') !== year);

        updateField(['locations', selectedLocationIndex, 'statistics'], newStatistics);
      } else {
        const newStatistics = locations
          .getIn([selectedLocationIndex, 'statistics'])
          .push(Immutable.fromJS({ year, prisonersAmount: null }));

        updateField(['locations', selectedLocationIndex, 'statistics'], newStatistics);
      }
    };

    this.updatePrisonersAmount = (index, event) => {
      const { selectedLocationIndex } = this.state;
      const { value } = event.target;

      this.props.updateField(
        ['locations', selectedLocationIndex, 'statistics', index, 'prisonersAmount'],
        value
      );

      // const { locations } = this.props;
      // const { value } = event.target;
      // const lens = compose(
      //   lensIndex(this.state.selectedLocationIndex),
      //   lensPath(['properties', year, 'peoples'])
      // );
      // const newFeatures = set(lens, parseInt(value, 10), locations);
      //
      // this.props.updateFeatures(newFeatures);
    };
  }

  render() {
    const { locations } = this.props;
    const selectedLocation = locations.get(this.state.selectedLocationIndex);

    return (
      <Container>
        <div className='field-title_locations'>
          {locations.map((location, index) => {
            const onClick = this.selectFeature.bind(null, index);
            const className =
              this.state.selectedLocationIndex === index
                ? 'field-title__location field-title__location_active'
                : 'field-title__location';
            const classNameDelete =
              this.state.showDeleteMenu && this.state.selectedLocationIndex === index
                ? 'location-delete location-delete_show'
                : 'location-delete';

            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={className}
              >
                <LocationTab onClick={onClick}>
                  Локация {locations.size > 1 ? index + 1 : ''}
                </LocationTab>
                <button onClick={this.openDeleteMenu}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'>
                    <path
                      // eslint-disable-next-line
                      d="M2.828 2.12L.708 0 0 .707l2.12 2.12L0 4.95l.707.707 2.12-2.12 2.123 2.12.707-.707-2.12-2.122 2.12-2.12L4.95 0 2.828 2.12z"
                    />
                  </svg>
                </button>
                <div className={classNameDelete}>
                  <span onClick={this.removeFeature.bind(null, index)}>Удалить</span>
                  <span onClick={this.closeDeleteMenu}>Отмена</span>
                </div>
              </div>
            );
          })}
          <button className='field-title__plus' onClick={this.createLocation}>
            +
          </button>
          <CoordinatesInput
            coordinates={selectedLocation.getIn(['geometry', 'coordinates']).toJS()}
            updateCoordinates={this.updateCoordinates}
          />
        </div>
        <Map features={[locationToFeature(selectedLocation)]} />
        <CampYears
          locations={locations}
          selectedLocationIndex={this.state.selectedLocationIndex}
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
  updateField: PropTypes.func.isRequired
};

export default CampLocation;
