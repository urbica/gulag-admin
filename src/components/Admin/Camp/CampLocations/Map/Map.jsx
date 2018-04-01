import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// styled
import Container from './Container';

/* eslint-disable max-len */
const accessToken =
  'pk.eyJ1IjoiZ3VsYWdtYXAiLCJhIjoiY2lxa3VtaWtyMDAyZGhzbWI1aDQ3NGhtayJ9.D2IEMpF7p8yNtpY_2HUQlw';

/* eslint-enable max-len */

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount() {
    mapboxgl.accessToken = accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      drag: true,
      zoom: 1.6,
      center: [95, 62],
      scrollZoom: false
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.on('load', this.onLoad);
  }

  componentWillReceiveProps(nextProps) {
    const { features } = nextProps;
    const source = this.map.getSource('prisons');
    if (source) {
      source.setData({ type: 'FeatureCollection', features });
    }
  }

  onLoad() {
    const { features } = this.props;
    const source = {
      type: 'geojson',
      data: { type: 'FeatureCollection', features }
    };

    this.map.addSource('prisons', source);

    this.map.addLayer({
      id: 'prisons',
      type: 'circle',
      source: 'prisons',
      paint: {
        'circle-radius': 5,
        'circle-color': '#000000'
      }
    });

    setTimeout(() => {
      const credits = ' <a href="http://urbica.co" target="_blank">© Urbica</a>';
      const attrEls = document.getElementsByClassName('mapboxgl-ctrl-attrib');
      if (attrEls.length > 0) attrEls[0].insertAdjacentHTML('beforeend', credits);
    }, 500);
  }

  render() {
    return <Container id='map' />;
  }
}

Map.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Map;
