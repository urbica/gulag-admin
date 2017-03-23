import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { lensProp, set, append, remove, compose, lensPath, lensIndex, over, dissoc } from 'ramda';
import styled from 'styled-components';
import CoorinatesInput from './CoordinatesInput';
import Map from './Map';
import PrisonYears from './PrisonYears';
import PrisonStatistics from './PrisonStatistics';
import './PrisonLocation.css';

const PrisonLocations = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  & > .inputWrapper {
    width: 48%;
    margin-bottom: 10px;
  }
`;

const LocationTab = styled.span`
  display: inline-block;
  width: 120px;
  height: 100%;
  padding: 8px 24px 6px;
`;

class PrisonLocation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedFeatureIndex: 0,
      showDeleteMenu: false
    };
  }

  addFeature(feature, features) {
    const newFeatures = append(feature, features);
    this.props.updateFeatures(newFeatures);
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
    const newFeature = {
      type: 'Feature',
      properties: {},
      geometry: { type: 'Point', coordinates: [90, 62] }
    };
    const selectedFeature = features[this.state.selectedFeatureIndex] || newFeature;

    return (
      <PrisonLocations>
        <div className='field-title field-title_locations'>
          {
            features.map((location, index) => {
              const onClick = this.selectFeature.bind(null, index);
              const className = classnames('field-title__location', {
                'field-title__location_active': this.state.selectedFeatureIndex === index
              });
              const classNameDelete = classnames('location-delete', {
                'location-delete_show': this.state.showDeleteMenu && this.state.selectedFeatureIndex === index
              });

              return (
                <div
                  className={className}
                  key={index}
                >
                  <LocationTab onClick={onClick}>Локация { features.length > 1 ? index + 1 : '' }</LocationTab>
                  <button onClick={this.openDeleteMenu}>
                    <svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'>
                      <path
                        d='M2.828 2.12L.708 0 0 .707l2.12 2.12L0 4.95l.707.707 2.12-2.12 2.123 2.12.707-.707-2.12-2.122 2.12-2.12L4.95 0 2.828 2.12z' />
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
      </PrisonLocations>
    );
  }
}

export default PrisonLocation;
