import React from 'react';
import Map from '../Map/Map';
import PrisonYears from './PrisonYears';
import PrisonStatistics from './PrisonStatistics';
import TextInput from '../Inputs/TextInput';
import classnames from 'classnames';
import './PrisonLocation.css';

const PrisonLocation = React.createClass({
  getInitialState() {
    return ({
      selectedFeatureIndex: 0,
      showDeleteMenu: false
    });
  },

  update() {
  },

  selectFeature(selectedFeatureIndex) {
    this.setState({selectedFeatureIndex});
  },

  openDeleteMenu() {
    this.setState({showDeleteMenu: true})
  },

  closeDeleteMenu() {
    this.setState({showDeleteMenu: false})
  },

  render() {
    const {prison} = this.props;
    const features = prison.features || [];

    const selectedFeature = features[this.state.selectedFeatureIndex] || {
        type: 'Feature',
        properties: {},
        geometry: {type: 'Point', coordinates: [0, 0]}
      };

    return (
      <div className='prison__location'>
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
                <div className={ className } onClick={ onClick } key={ index }>
                  Локация { features.length > 1 ? index + 1 : '' }
                  <button onClick={ this.openDeleteMenu }>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6">
                      <path
                        d="M2.828 2.12L.708 0 0 .707l2.12 2.12L0 4.95l.707.707 2.12-2.12 2.123 2.12.707-.707-2.12-2.122 2.12-2.12L4.95 0 2.828 2.12z"/>
                    </svg>
                  </button>
                  <div className={ classNameDelete }>
                    <span>Удалить</span>
                    <span onClick={ this.closeDeleteMenu }>Отмена</span>
                  </div>
                </div>
              );
            })
          }
          <button className='field-title__plus'>+</button>
          <TextInput
            value={ selectedFeature.geometry.coordinates[0] + ', ' + selectedFeature.geometry.coordinates[1] }
            onChange={ this.update }
          />
        </div>
        <TextInput
          placeholder='Название локации'
          value={ prison.location_ru }
          onChange={ this.update }
        />
        <TextInput
          placeholder='Location name'
          value={ prison.location_en }
          onChange={ this.update }
          className={ 'input_en' }
        />
        <Map features={ [selectedFeature] }/>
        <PrisonYears
          prison={ prison }
          toggleYear={ this.props.toggleYear.bind(null, prison.id, this.state.selectedFeatureIndex) }
        />
        {
          features[this.state.selectedFeatureIndex] &&
          <PrisonStatistics feature={ features[this.state.selectedFeatureIndex] }/>
        }
      </div>
    );
  }
});

export default PrisonLocation;