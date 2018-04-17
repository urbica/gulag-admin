/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import './PrisonLocation.css';

// components
import CoordinatesInput from './CoordinatesInput';

// styled
import Container from './Container';
import LocationTab from './LocationTab';
import PlusButton from './PlusButton';

const LocationsBar = props => {
  const {
    locations,
    showDeleteMenu,
    coordinates,
    selectedLocationIndex,
    removeLocation,
    closeDeleteMenu,
    selectLocation,
    createLocation,
    updateCoordinates,
    openDeleteMenu
  } = props;

  return (
    <Container>
      {locations.map(location => {
        const locationIndex = location.get('orderIndex');
        const className =
          selectedLocationIndex === locationIndex
            ? 'field-title__location field-title__location_active'
            : 'field-title__location';
        const classNameDelete =
          showDeleteMenu && selectedLocationIndex === locationIndex
            ? 'location-delete location-delete_show'
            : 'location-delete';

        return (
          <div key={locationIndex} className={className}>
            <LocationTab onClick={selectLocation.bind(null, locationIndex)}>
              Локация {locations.size > 1 ? locationIndex + 1 : ''}
            </LocationTab>
            <button onClick={openDeleteMenu}>
              <svg xmlns='http://www.w3.org/2000/svg' width='6' height='6'>
                <path
                  // eslint-disable-next-line
                  d="M2.828 2.12L.708 0 0 .707l2.12 2.12L0 4.95l.707.707 2.12-2.12 2.123 2.12.707-.707-2.12-2.122 2.12-2.12L4.95 0 2.828 2.12z"
                />
              </svg>
            </button>
            <div className={classNameDelete}>
              <span onClick={removeLocation.bind(null, locationIndex)}>
                Удалить
              </span>
              <span onClick={closeDeleteMenu}>Отмена</span>
            </div>
          </div>
        );
      })}
      <PlusButton onClick={createLocation}>+</PlusButton>
      <CoordinatesInput
        coordinates={coordinates}
        updateCoordinates={updateCoordinates}
      />
    </Container>
  );
};

LocationsBar.propTypes = {
  locations: PropTypes.object.isRequired,
  showDeleteMenu: PropTypes.bool.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedLocationIndex: PropTypes.number.isRequired,
  removeLocation: PropTypes.func.isRequired,
  closeDeleteMenu: PropTypes.func.isRequired,
  selectLocation: PropTypes.func.isRequired,
  createLocation: PropTypes.func.isRequired,
  updateCoordinates: PropTypes.func.isRequired,
  openDeleteMenu: PropTypes.func.isRequired
};

export default LocationsBar;
