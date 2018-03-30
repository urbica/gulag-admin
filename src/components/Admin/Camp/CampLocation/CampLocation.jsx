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

const newFeature = Immutable.fromJS({
  type: 'Feature',
  properties: {},
  geometry: { type: 'Point', coordinates: [90, 62] }
});

class CampLocation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedFeatureIndex: 0,
      showDeleteMenu: false
    };

    this.createFeature = () => {
      const { features } = this.props;

      props.updateField(['features', features.size], newFeature);
      this.setState({ selectedFeatureIndex: features.size });
    };

    this.removeFeature = (locationId) => {
      const newFeatures = this.props.features.delete(locationId);

      props.updateField(['features'], newFeatures);
      this.closeDeleteMenu();
    };

    this.selectFeature = (selectedFeatureIndex) => {
      this.closeDeleteMenu();
      this.setState({ selectedFeatureIndex });
    };

    this.openDeleteMenu = () => {
      this.setState({ showDeleteMenu: true });
    };

    this.closeDeleteMenu = () => {
      this.setState({ showDeleteMenu: false });
    };

    this.updateCoordinates = (coordinates) => {
      const { selectedFeatureIndex } = this.state;

      this.props.updateField(
        ['features', selectedFeatureIndex, 'geometry', 'coordinates'],
        Immutable.fromJS(coordinates)
      );
    };

    this.toggleYear = (year) => {
      const { selectedFeatureIndex } = this.state;
      const { features, updateField } = this.props;

      const isYearExists =
        features.getIn([selectedFeatureIndex, 'properties', 'statistics', year]) !== undefined;

      if (isYearExists) {
        const newFeatures = features.deleteIn([
          selectedFeatureIndex,
          'properties',
          'statistics',
          year
        ]);

        updateField(['features'], newFeatures);
      } else {
        updateField(['features', selectedFeatureIndex, 'properties', 'statistics', year], 0);
      }
    };

    this.updatePrisonersAmount = (year, event) => {
      const { selectedFeatureIndex } = this.state;
      const { value } = event.target;

      this.props.updateField(
        ['features', selectedFeatureIndex, 'properties', 'statistics', year],
        value
      );

      // const { features } = this.props;
      // const { value } = event.target;
      // const lens = compose(
      //   lensIndex(this.state.selectedFeatureIndex),
      //   lensPath(['properties', year, 'peoples'])
      // );
      // const newFeatures = set(lens, parseInt(value, 10), features);
      //
      // this.props.updateFeatures(newFeatures);
    };
  }

  render() {
    const { features } = this.props;
    const selectedFeature = features.get(this.state.selectedFeatureIndex) || newFeature;

    return (
      <Container>
        <div className='field-title_locations'>
          {features.map((location, index) => {
            const onClick = this.selectFeature.bind(null, index);
            const className =
              this.state.selectedFeatureIndex === index
                ? 'field-title__location field-title__location_active'
                : 'field-title__location';
            const classNameDelete =
              this.state.showDeleteMenu && this.state.selectedFeatureIndex === index
                ? 'location-delete location-delete_show'
                : 'location-delete';

            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={className}
              >
                <LocationTab onClick={onClick}>
                  Локация {features.size > 1 ? index + 1 : ''}
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
          <button className='field-title__plus' onClick={this.createFeature}>
            +
          </button>
          <CoordinatesInput
            coordinates={selectedFeature.getIn(['geometry', 'coordinates']).toJS()}
            updateCoordinates={this.updateCoordinates}
          />
        </div>
        <Map features={[selectedFeature.toJS()]} />
        <CampYears
          features={features}
          selectedFeatureIndex={this.state.selectedFeatureIndex}
          toggleYear={this.toggleYear}
        />
        <CampStatistics
          feature={features.get(this.state.selectedFeatureIndex).toJS()}
          onChange={this.updatePrisonersAmount}
        />
      </Container>
    );
  }
}

CampLocation.propTypes = {
  features: PropTypes.object.isRequired,
  updateField: PropTypes.func.isRequired
};

export default CampLocation;
