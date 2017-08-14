/* global mapboxgl */
import React, { PureComponent } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Controls from './ControlsStyle';
import Popup from './Popup';
import { MapButton } from './StyledButtons';
import plus from './icons/btn-plus.svg';
import minus from './icons/btn-minus.svg';
import allCities from '../../utils/newCities.geojson';

const Wrap = styled.div`
  position: fixed;
  top: ${({ slideUp }) => (slideUp ? '-30%' : '0')};
  bottom: 0;
  width: 100%;
  transition: .4s;
  z-index: 0;
  & .mapboxgl-ctrl-attrib {
    opacity: 0.3;
    background-color: inherit;
  }
`;

/* eslint-disable max-len */
const accessToken = 'pk.eyJ1IjoiZ3VsYWdtYXAiLCJhIjoiY2lxa3VtaWtyMDAyZGhzbWI1aDQ3NGhtayJ9.D2IEMpF7p8yNtpY_2HUQlw';

/* eslint-enable max-len */

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      slideUp: false
    };
    this.onLoad = this.onLoad.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onClick = this.onClick.bind(this);
    this.highlightFeature = this.highlightFeature.bind(this);
    this.onSourcedata = this.onSourcedata.bind(this);
  }

  componentDidMount() {
    mapboxgl.accessToken = accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/gulagmap/ciqkwvqfs001ngdnl7tyvutwl',
      drag: true,
      zoom: 2.5,
      center: [90, 60],
      maxBounds: [
        [-94, -14],
        [238, 85]
      ]
      // scrollZoom: false
    });

    this.map.dragRotate.disable();
    this.map.touchZoomRotate.disableRotation();
    this.map.on('load', this.onLoad);
  }

  componentWillReceiveProps(nextProps) {
    const { features, currentYear, location, centerCoordinates } = nextProps;

    const source = this.map.getSource('prisons');
    const cities = this.map.getSource('allCities');
    if (source) {
      source.setData({ type: 'FeatureCollection', features });
    }
    if (cities) {
      if (currentYear !== 'all') {
        this.map.setFilter('cities_labels', ['==', 'year', currentYear]);
        this.map.setFilter('cities_dots', ['==', 'year', currentYear]);
      } else {
        this.map.setFilter('cities_labels', ['==', 'year', 1960]);
        this.map.setFilter('cities_dots', ['==', 'year', 1960]);
      }
    }

    if (location.pathname.match('/prison')) {
      this.setState({ slideUp: true });
    } else this.setState({ slideUp: false });

    if (centerCoordinates !== [] && location.pathname.match('/prison')) {
      this.map.setCenter(centerCoordinates);
    }

    if (currentYear !== 'all') {
      this.map.setFilter('ussr',
        ['all',
          ['<=', 'year_start', currentYear],
          ['>=', 'year_end', currentYear]
        ]
      );
    } else {
      this.map.setFilter('ussr',
        ['all',
          ['<=', 'year_start', 1960],
          ['>=', 'year_end', 1960]
        ]
      );
    }
  }

  onLoad() {
    this.map.addSource('ussr', {
      type: 'vector',
      url: 'mapbox://gulagmap.83eae073'
    });
    this.map.addSource('chukotka', {
      type: 'vector',
      url: 'mapbox://gulagmap.72d3cpll'
    });
    this.map.addLayer({
      id: 'ussr',
      type: 'fill',
      source: 'ussr',
      'source-layer': 'NEWUSSR_BOUND',
      layout: {},
      paint: {
        'fill-color': '#1b2128', // 222933 #1b2128
        'fill-opacity': 1
      },
      filter: ['all',
        ['<=', 'year_start', this.props.currentYear],
        ['>=', 'year_end', this.props.currentYear]
      ]
    }, 'waterway');
    this.map.addLayer({
      id: 'chukotka',
      type: 'fill',
      source: 'chukotka',
      'source-layer': 'chukotka_patch-4b7lx1',
      layout: {},
      paint: {
        'fill-color': '#1b2128',
        'fill-opacity': 1
      }
    }, 'waterway');

    const { features } = this.props;
    const source = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features
      }
    };

    this.map.addSource('prisons', source);
    this.map.addSource('allCities', {
      type: 'geojson',
      data: allCities
    });

    this.map.addLayer({
      id: 'cities_labels',
      type: 'symbol',
      source: 'allCities',
      layout: {
        'text-anchor': 'top',
        'text-field': '{historical_name}',
        'text-size': {
          stops: [
            [0, 8],
            [4, 10],
            [6, 14],
            [12, 22],
            [22, 28]
          ]
        },
        'text-font': ['PT Sans Regular'],
        'text-padding': {
          stops: [
            [2, 4]
          ]
        }
      },
      paint: {
        'text-color': '#6A748C'
      }
    });
    this.map.addLayer({
      id: 'cities_dots',
      type: 'circle',
      source: 'allCities',
      paint: {
        'circle-color': '#6A748C',
        'circle-radius': {
          stops: [
            [7, 0],
            [8, 1.6],
            [22, 2]
          ]
        }
      }
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
            [{ zoom: 1, value: 0 }, 4],
            [{ zoom: 1, value: 200000 }, 20],
            [{ zoom: 18, value: 0 }, 32],
            [{ zoom: 18, value: 200000 }, 400]
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
            [{ zoom: 1, value: 0 }, 4],
            [{ zoom: 1, value: 200000 }, 20],
            [{ zoom: 18, value: 0 }, 32],
            [{ zoom: 18, value: 200000 }, 400]
          ]
        }
      },
      filter: ['==', 'id', '']
    });
    this.map.addLayer({
      id: 'prisonsHalo_active',
      type: 'circle',
      source: 'prisons',
      paint: {
        'circle-color': '#eb4200',
        'circle-opacity': 0.7,
        'circle-radius': {
          property: 'peoples',
          stops: [
            [{ zoom: 1, value: 0 }, 4],
            [{ zoom: 1, value: 200000 }, 20],
            [{ zoom: 18, value: 0 }, 32],
            [{ zoom: 18, value: 200000 }, 400]
          ]
        }
      },
      filter: ['==', 'id', '']
    });
    this.map.addLayer({
      id: 'prisonsNames',
      type: 'symbol',
      source: 'prisons',
      layout: {
        'text-field': '{ruName}',
        'text-size': {
          stops: [
            [0, 8],
            [4, 10],
            [6, 14],
            [12, 22],
            [22, 28]
          ]
        },
        'text-anchor': 'left',
        'text-justify': 'left',
        'text-offset': [1.5, 0]
      },
      paint: {
        'text-color': '#fff'
      },
      filter: ['==', 'id', '']
    });
    this.map.addLayer({
      id: 'prisonsNames_active',
      type: 'symbol',
      source: 'prisons',
      layout: {
        'text-field': '{ruName}',
        'text-size': 12,
        'text-anchor': 'left',
        'text-justify': 'left',
        'text-offset': [1.5, 0]
      },
      paint: {
        'text-color': '#fff'
      },
      filter: ['==', 'id', '']
    });

    setTimeout(() => {
      const credits = ' <a href="http://urbica.co" target="_blank">© Urbica</a>';
      const attrEls = document.getElementsByClassName('mapboxgl-ctrl-attrib');
      if (attrEls.length > 0) attrEls[0].insertAdjacentHTML('beforeend', credits);
    }, 1000);

    this.map.on('sourcedata', this.onSourcedata);
    this.map.on('mousemove', this.onMouseMove);
    this.map.on('click', this.onClick);
  }

  onMouseMove(e) {
    const features = this.map.queryRenderedFeatures(e.point, { layers: ['prisonsHalo'] });
    this.map.getCanvas().style.cursor = (features && features.length) ? 'pointer' : '';

    if (features.length) {
      const feature = features[0].properties;
      this.map.setFilter('prisonsHalo_hover', ['==', 'id', feature.id]);
      this.map.setFilter('prisonsNames', ['==', 'id', feature.id]);
    } else {
      this.map.setFilter('prisonsHalo_hover', ['==', 'id', '']);
      this.map.setFilter('prisonsNames', ['==', 'id', '']);
    }
  }

  onClick(e) {
    const features = this.map.queryRenderedFeatures(e.point, { layers: ['prisonsHalo'] });
    if (this.popup) this.popup.remove();

    if (features.length > 1) {
      const feature = features[0];
      this.map.flyTo({
        center: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]]
      });

      const div = document.createElement('div');
      ReactDom.render(<Popup features={features} onClick={this.props.openCard} />, div);

      this.popup = new mapboxgl.Popup({
        closeButton: false,
        anchor: 'left',
        offset: 40
      })
        .setLngLat(features[0].geometry.coordinates)
        .setDOMContent(div)
        .addTo(this.map);
    } else if (features.length > 0) {
      const feature = features[0];
      this.map.flyTo({
        center: [feature.geometry.coordinates[0], feature.geometry.coordinates[1]]
      });
      this.props.openCard(feature.properties.id);
    } else {
      this.props.closeCard();
    }
  }

  onSourcedata() {
    if (this.map.getLayer('prisonsHalo_active')) {
      this.highlightFeature();
    }
  }

  highlightFeature() {
    if (this.state.slideUp) {
      if (this.props.isDemoPlayed) this.props.demo();
      if (this.popup) this.popup.remove();
      this.map.setFilter('prisonsHalo_active', ['==', 'id', this.props.openedPrisonId]);
      this.map.setFilter('prisonsNames_active', ['==', 'id', this.props.openedPrisonId]);
    } else {
      this.map.setFilter('prisonsHalo_active', ['==', 'id', '']);
      this.map.setFilter('prisonsNames_active', ['==', 'id', '']);
    }
  }

  render() {
    const { slideUp } = this.state;

    return (
      <Wrap
        id='map'
        slideUp={slideUp}
      >
        <Controls slideUp={slideUp}>
          <MapButton onClick={() => this.map.zoomIn()}>
            <img src={plus} alt='plus' />
          </MapButton>
          <MapButton onClick={() => this.map.zoomOut()}>
            <img src={minus} alt='minus' />
          </MapButton>
        </Controls>
      </Wrap>
    );
  }
}

Map.propTypes = {
  features: PropTypes.arrayOf(
    PropTypes.shape({
      properties: PropTypes.shape({
        id: PropTypes.number,
        peoples: PropTypes.number,
        name: PropTypes.shape({
          ru: PropTypes.string,
          en: PropTypes.string,
          de: PropTypes.string
        })
      })
    })
  ),
  openCard: PropTypes.func,
  currentYear: PropTypes.number,
  location: PropTypes.object,
  centerCoordinates: PropTypes.arrayOf(
    PropTypes.string
  ),
  openedPrisonId: PropTypes.number,
  closeCard: PropTypes.func
};

export default withRouter(Map);
