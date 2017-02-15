/* global mapboxgl */
import React from 'react';
import styled from 'styled-components'

const StyledMap = styled.div`
  position: fixed;
  top: ${props => props.slideUp ? '-30%' : '0'};
  bottom: 0;
  width: 100%;
  transition: .4s;
  z-index: 0;
`;

/* eslint-disable max-len */
const accessToken = 'pk.eyJ1IjoiZ3VsYWdtYXAiLCJhIjoiY2lxa3VtaWtyMDAyZGhzbWI1aDQ3NGhtayJ9.D2IEMpF7p8yNtpY_2HUQlw';
/* eslint-enable max-len */

class Map extends React.PureComponent {
  componentDidMount() {
    mapboxgl.accessToken = accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/gulagmap/ciqkwvqfs001ngdnl7tyvutwl',
      drag: true,
      zoom: 2.5,
      center: [90, 60],
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

  onLoad = () => {
    const { features } = this.props;
    const source = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features
      }
    };

    this.map.addSource('prisons', source);

    this.map.addLayer({
      id: 'prisons',
      type: 'circle',
      source: 'prisons',
      paint: {
        'circle-radius': 2,
        'circle-color': 'red'
      }
    });

    this.map.addLayer({
      id: 'prisonsGalo',
      type: 'circle',
      source: 'prisons',
      paint: {
        'circle-radius': 5,
        'circle-color': 'red',
        'circle-opacity': .2
      }
    });

    setTimeout(() => {
      const credits = ' <a href="http://urbica.co" target="_blank">© Urbica</a>';
      const attrEls = document.getElementsByClassName('mapboxgl-ctrl-attrib');
      if (attrEls.length > 0) attrEls[0].insertAdjacentHTML('beforeend', credits);
    }, 500);
  };

  render() {
    return (
      <StyledMap
        id='map'
        slideUp={this.props.slideUp}
      />
    );
  }
};

export default Map;
