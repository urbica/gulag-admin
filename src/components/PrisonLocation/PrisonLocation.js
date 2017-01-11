import React from 'react';
import Map from '../Map/Map';
import PrisonYears from './PrisonYears';
import PrisonStatistics from './PrisonStatistics';
import TextInput from '../Inputs/TextInput';
import classnames from 'classnames';

const PrisonLocation = React.createClass({
  getInitialState() {
    return ({
      selectedFeatureIndex: 0
    });
  },

  update() {
  },

  selectFeature(selectedFeatureIndex) {
    this.setState({selectedFeatureIndex});
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
        <div className='field-title'>
          {
            features.map((location, index) => {
              const onClick = this.selectFeature.bind(null, index);
              const className = classnames('field-title__location', {
                'field-title__location_active': this.state.selectedFeatureIndex === index
              });

              return (
                <div className={ className } onClick={ onClick } key={ index }>
                  Локация { index + 1 }
                </div>
              );
            })
          }
          <button className='field-title__plus'>+</button>
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
          onClick={ this.props.addNewYear.bind(null, prison.id, this.state.selectedFeatureIndex) }
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