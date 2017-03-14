/* global mapboxgl */
import React from 'react';
import styled from 'styled-components'

const Wrap = styled.div`
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
    this.map.on('mousemove', this.onMouseMove);
    this.map.on('click', this.onClick);
  }

  componentWillReceiveProps(nextProps) {
    const { features } = nextProps;
    const source = this.map.getSource('prisons');
    if (source) {
      source.setData({ type: 'FeatureCollection', features });
    }
  }

  onLoad = () => {
    this.map.addSource('chukotka', {
      type: 'vector',
      url: 'mapbox://gulagmap.72d3cpll'
    });
    this.map.addLayer({
      'id': 'chukotka',
      'type': 'fill',
      'source': 'chukotka',
      'source-layer': 'chukotka_patch-4b7lx1',
      'layout': {},
      'paint': {
        'fill-color': '#1b2128',
        'fill-opacity': 1
      }
    }, 'waterway');

    const { features } = this.props;
    const source = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: features
      }
    };

    this.map.addSource('prisons', source);
    this.map.addSource("cities", {
      'type': 'vector',
      'url': 'mapbox://gulagmap.1hzhi5te'
    });

    this.map.addLayer({
      id: 'prisons',
      type: 'circle',
      source: 'prisons',
      paint: {
        'circle-radius': 1.75,
        'circle-color': '#ff2b00',
        'circle-opacity': 1
      }
    });
    this.map.addLayer({
      id: 'prisonsHalo',
      type: 'circle',
      source: 'prisons',
      paint: {
        'circle-color': '#eb4200',
        'circle-opacity': 0.3,
        'circle-radius': {
          property: 'peoples',
          stops: [
            [{ zoom: 2, value: 0 }, 4],
            [{ zoom: 2, value: 200000 }, 20],
            [{ zoom: 4, value: 0 }, 5],
            [{ zoom: 4, value: 200000 }, 40],
            [{ zoom: 6, value: 0 }, 6],
            [{ zoom: 6, value: 200000 }, 80],
            [{ zoom: 10, value: 0 }, 8],
            [{ zoom: 10, value: 200000 }, 100],
            [{ zoom: 18, value: 0 }, 60],
            [{ zoom: 18, value: 200000 }, 460]
          ]
        }
      }
    });
    this.map.addLayer({
      id: 'prisonsHalo_hover',
      type: 'circle',
      source: 'prisons',
      paint: {
        'circle-color': '#eb4200',
        'circle-opacity': 0.7,
        'circle-radius': {
          property: 'peoples',
          stops: [
            [{ zoom: 2, value: 0 }, 4],
            [{ zoom: 2, value: 200000 }, 20],
            [{ zoom: 4, value: 0 }, 5],
            [{ zoom: 4, value: 200000 }, 40],
            [{ zoom: 6, value: 0 }, 6],
            [{ zoom: 6, value: 200000 }, 80],
            [{ zoom: 10, value: 0 }, 8],
            [{ zoom: 10, value: 200000 }, 100],
            [{ zoom: 18, value: 0 }, 60],
            [{ zoom: 18, value: 200000 }, 460]
          ]
        }
      },
      filter: ['==', 'id', '']
    });
    this.map.addLayer({
      "id": "cities_labels",
      'type': 'symbol',
      "source": "cities",
      'source-layer': 'allCities-difd7x',
      'layout': {
        'text-field': '{historical_name}',
        'text-size': 11
      },
      'paint': {
        'text-color': '#555'
      }
    });

    setTimeout(() => {
      const credits = ' <a href="http://urbica.co" target="_blank">© Urbica</a>';
      const attrEls = document.getElementsByClassName('mapboxgl-ctrl-attrib');
      if (attrEls.length > 0) attrEls[0].insertAdjacentHTML('beforeend', credits);
    }, 1000);
  };

  onMouseMove = e => {
    const features = this.map.queryRenderedFeatures(e.point, { layers: ['prisonsHalo'] });
    this.map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

    if (features.length) {
      const feature = features[0].properties;
      this.map.setFilter('prisonsHalo_hover', ['==', 'id', feature.id]);
      // this.map.setFilter("camps_labels", ["==", "name", feature.name]);
    } else {
      this.map.setFilter('prisonsHalo_hover', ['==', 'id', '']);
      // this.map.setFilter("camps_labels", ["==", "name", ""]);
    }
  };

  onClick = e => {
    const features = this.map.queryRenderedFeatures(e.point, { layers: ['prisonsHalo'] });

    if (features.length > 0) {
      const feature = features[0];
      this.map.flyTo({center: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]]});

      this.props.openCard();
    }
  };

  render() {
    return (
      <Wrap
        id='map'
        slideUp={this.props.slideUp}
      />
    );
  }
}

export default Map;
