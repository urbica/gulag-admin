/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { lensProp, set, append, remove, compose, lensPath, lensIndex, over, dissoc } from 'ramda';
import './PrisonLocation.css';

// components
import CoorinatesInput from './CoordinatesInput';
import Map from './Map';
import PrisonYears from './PrisonYears';
import PrisonStatistics from './PrisonStatistics';

// styled
import Container from './Container';
import LocationTab from './LocationTab';

const newFeature = {
  type: 'Feature',
  properties: {},
  geometry: { type: 'Point', coordinates: [90, 62] }
};

class PrisonLocation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedFeatureIndex: 0,
      showDeleteMenu: false
    };
    this.addFeature = this.addFeature.bind(this);
    this.removeFeature = this.removeFeature.bind(this);
    this.selectFeature = this.selectFeature.bind(this);
    this.openDeleteMenu = this.openDeleteMenu.bind(this);
    this.closeDeleteMenu = this.closeDeleteMenu.bind(this);
    this.updateCoordinates = this.updateCoordinates.bind(this);
    this.toggleYear = this.toggleYear.bind(this);
    this.updatePrisonersAmount = this.updatePrisonersAmount.bind(this);
  }

  addFeature(feature, features) {
    const newFeatures = append(feature, features);
    this.props.updateFeatures(newFeatures);
    this.setState({ selectedFeatureIndex: features.length });
  }

  removeFeature(locationId, features) {
    const newFeatures = remove(locationId, 1, features);
    this.props.updateFeatures(newFeatures);
    this.closeDeleteMenu();
  }

  selectFeature(selectedFeatureIndex) {
    this.closeDeleteMenu();
    this.setState({ selectedFeatureIndex });
  }

  openDeleteMenu() {
    this.setState({ showDeleteMenu: true });
  }

  closeDeleteMenu() {
    this.setState({ showDeleteMenu: false });
  }

  updateCoordinates(coordinates) {
    const features = this.props.features;
    const lens = compose(
      lensIndex(this.state.selectedFeatureIndex),
      lensPath(['geometry', 'coordinates'])
    );
    const newFeatures = set(lens, coordinates, features);

    this.props.updateFeatures(newFeatures);
  }

  toggleYear(year, features) {
    const featureId = this.state.selectedFeatureIndex;

    const lens = compose(
      lensIndex(featureId),
      lensPath(['properties', year, 'peoples'])
    );
    const lensRemove = compose(
      lensIndex(featureId),
      lensProp('properties')
    );

    if (!features[featureId].properties[year]) {
      this.props.updateFeatures(
        set(lens, 0, features)
      );
    } else {
      this.props.updateFeatures(
        over(lensRemove, dissoc(year), features)
      );
    }
  }

  updatePrisonersAmount(year, event) {
    const features = this.props.features;
    const { value } = event.target;
    const lens = compose(
      lensIndex(this.state.selectedFeatureIndex),
      lensPath(['properties', year, 'peoples'])
    );
    const newFeatures = set(lens, parseInt(value, 10), features);

    this.props.updateFeatures(newFeatures);
  }

  render() {
    const features = this.props.features || [];
    const selectedFeature = features[this.state.selectedFeatureIndex] || newFeature;

    return (
      <Container>
        <div className='field-title field-title_locations'>
          {
            features.map((location, index) => {
              const onClick = this.selectFeature.bind(null, index);
              const className =
                (this.state.selectedFeatureIndex === index)
                  ? 'field-title__location field-title__location_active'
                  : 'field-title__location';
              const classNameDelete =
                (this.state.showDeleteMenu && this.state.selectedFeatureIndex === index)
                  ? 'location-delete location-delete_show'
                  : 'location-delete';

              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={className}
                >
                  <LocationTab onClick={onClick}>
                    Локация {features.length > 1 ? index + 1 : ''}
                  </LocationTab>
                  <button onClick={this.openDeleteMenu}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'>
                      <path
                        // eslint-disable-next-line
                        d='M2.828 2.12L.708 0 0 .707l2.12 2.12L0 4.95l.707.707 2.12-2.12 2.123 2.12.707-.707-2.12-2.122 2.12-2.12L4.95 0 2.828 2.12z'
                      />
                    </svg>
                  </button>
                  <div className={classNameDelete}>
                    <span onClick={this.removeFeature.bind(null, index, features)}>Удалить</span>
                    <span onClick={this.closeDeleteMenu}>Отмена</span>
                  </div>
                </div>
              );
            })
          }
          <button
            className='field-title__plus'
            onClick={this.addFeature.bind(null, newFeature, features)}
          >
            +
          </button>
          <CoorinatesInput
            coordinates={selectedFeature.geometry.coordinates}
            updateCoordinates={this.updateCoordinates}
          />
        </div>
        <Map features={[selectedFeature]} />
        <PrisonYears
          features={features}
          selectedFeatureIndex={this.state.selectedFeatureIndex}
          toggleYear={this.toggleYear}
        />
        {
          features[this.state.selectedFeatureIndex] &&
          <PrisonStatistics
            feature={features[this.state.selectedFeatureIndex]}
            onChange={this.updatePrisonersAmount}
          />
        }
      </Container>
    );
  }
}

PrisonLocation.propTypes = {
  updateFeatures: PropTypes.func.isRequired,
  features: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired
};

export default PrisonLocation;
