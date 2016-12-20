/* global mapboxgl */
import React from 'react';
import './Map.css'

/* eslint-disable max-len */
const accessToken = 'pk.eyJ1IjoiZ3VsYWdtYXAiLCJhIjoiY2lxa3VtaWtyMDAyZGhzbWI1aDQ3NGhtayJ9.D2IEMpF7p8yNtpY_2HUQlw';
/* eslint-enable max-len */

const Map = React.createClass({
  componentDidMount() {
    mapboxgl.accessToken = accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v9',
      drag: true,
      zoom: 1,
      center: [70, 55]
    });

    this.map.on('load', this.onLoad);
    this.map.on('mousemove', this.onMousemove);
    this.map.on('click', this.onClick);
  },

  onLoad() {
    const PRISONS = {type: 'geojson', data: {type: 'FeatureCollection', features: this.props.features}};

    this.map.addSource('prisons', PRISONS);
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
  },

  onMousemove(e) {

  },

  onClick(e) {

  },

  shouldComponentUpdate() {
    return false;
  },

  render() {
    return (
      <div id='map'></div>
    );
  }
});

export default Map;
