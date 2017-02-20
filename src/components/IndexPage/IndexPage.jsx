import React, { Component } from 'react'
import { values } from 'ramda'
import Header from './Header'
import Year from './Year'
import styled from 'styled-components'
import { BarChart } from 'react-d3-basic'
import PrisonCard from './PrisonCard'
import PeriodCard from './PeriodCard'
import Map from './Map'

const Chart = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

class IndexPage extends Component {
  state = {
    currentLanguage: 'ru',
    currentYear: 1918,
    currentPrisons: [],
    currentPeriod: 1,
    prisonCardVisibility: false,
    periodCardVisibility: false
  };

  componentWillReceiveProps(nextProps) {
    const prisons = values(nextProps.prisons);
    const filteredPrisons = prisons.filter(prison => prison.published[this.state.currentLanguage]);

    this.setState({ currentPrisons: filteredPrisons });
  }

  changeYear(upDown) {
    upDown === 'up' ?
      this.setState({ currentYear: this.state.currentYear + 1 }) :
      this.setState({ currentYear: this.state.currentYear - 1 });
  }

  closePrisonCard() {
    this.setState({ prisonCardVisibility: false });
  }

  closePeriodCard() {
    this.setState({ periodCardVisibility: false });
  }

  prisonsToFeatures(prisons) {
    const features = [];

    prisons.map(prison => prison.features.map(feature =>
      feature.properties[this.state.currentYear] ? features.push(feature) : null
    ));

    features.map(feature =>
      feature.properties.peoples = feature.properties[this.state.currentYear].peoples
    );

    return features;
  }

  render() {
    const {
      currentYear, currentPrisons, prisonCardVisibility,
      periodCardVisibility, currentLanguage, currentPeriod
    } = this.state;
    const features = this.prisonsToFeatures(currentPrisons);

    const data = [
      {
        year: 1918,
        prisoners: 0
      },
      {
        year: 1919,
        prisoners: 0
      },
      {
        year: 1920,
        prisoners: 0
      },
      {
        year: 1921,
        prisoners: 0
      },
      {
        year: 1922,
        prisoners: 0
      },
      {
        year: 1923,
        prisoners: 0
      },
      {
        year: 1924,
        prisoners: 0
      },
      {
        year: 1925,
        prisoners: 0
      },
      {
        year: 1926,
        prisoners: 0
      },
      {
        year: 1927,
        prisoners: 0
      },
      {
        year: 1928,
        prisoners: 0
      },
      {
        year: 1929,
        prisoners: 0
      },
      {
        year: 1930,
        prisoners: 230440
      },
      {
        year: 1931,
        prisoners: 276691
      },
      {
        year: 1932,
        prisoners: 288180
      },
      {
        year: 1933,
        prisoners: 553765
      },
      {
        year: 1934,
        prisoners: 344331
      },
      {
        year: 1935,
        prisoners: 542571
      },
      {
        year: 1936,
        prisoners: 523746
      },
      {
        year: 1937,
        prisoners: 828570
      },
      {
        year: 1938,
        prisoners: 537523
      },
      {
        year: 1939,
        prisoners: 405221
      },
      {
        year: 1940,
        prisoners: 1050178
      },
      {
        year: 1941,
        prisoners: 1198139
      },
      {
        year: 1942,
        prisoners: 1566479
      },
      {
        year: 1943,
        prisoners: 1344507
      },
      {
        year: 1944,
        prisoners: 1186297
      },
      {
        year: 1945,
        prisoners: 941684
      },
      {
        year: 1946,
        prisoners: 1109779
      },
      {
        year: 1947,
        prisoners: 1519494
      },
      {
        year: 1948,
        prisoners: 1161233
      },
      {
        year: 1949,
        prisoners: 1086000
      },
      {
        year: 1950,
        prisoners: 858477
      },
      {
        year: 1951,
        prisoners: 699132
      },
      {
        year: 1952,
        prisoners: 671100
      },
      {
        year: 1953,
        prisoners: 533270
      },
      {
        year: 1954,
        prisoners: 443554
      },
      {
        year: 1955,
        prisoners: 432673
      },
      {
        year: 1956,
        prisoners: 506599
      },
      {
        year: 1957,
        prisoners: 0
      },
      {
        year: 1958,
        prisoners: 0
      },
      {
        year: 1959,
        prisoners: 0
      },
      {
        year: 1960,
        prisoners: 0
      }
    ];

    const margins = { top: 40, right: 100, bottom: 40, left: 100 };

    return (
      <div>
        <Header
          currentYear={currentYear}
          currentPrisons={currentPrisons}
          demo={this.changeYear.bind(this)}
        />
        <Year>{ currentYear }</Year>
        <Chart>
          <BarChart
            title={'test'}
            data={data}
            width={window.innerWidth - 100}
            height={250}
            margins={margins}
            chartSeries={[
              {
                field: 'prisoners',
                name: 'prisoners',
                style: {
                  'fill': '#fff',
                  'fillOpacity': .1
                }
              }
            ]}
            x={d => d.year}
            xScale={'ordinal'}
            showLegend={false}
            showXGrid={false}
            showYGrid={false}
            showYAxis={false}
            categoricalColors={'rgb(255,255,255)'}
            onMouseOver={(d, i) => console.log(d, i)}
          />
        </Chart>
        {
          this.props.periods &&
          <PeriodCard
            visible={periodCardVisibility}
            period={this.props.periods[currentPeriod]}
            currentLanguage={currentLanguage}
            closeCard={this.closePeriodCard.bind(this)}
          />
        }
        {
          this.props.prisons &&
          <PrisonCard
            visible={prisonCardVisibility}
            prison={currentPrisons[1]}
            currentLanguage={currentLanguage}
            closeCard={this.closePrisonCard.bind(this)}
          />
        }
        <Map
          currentYear={currentYear}
          features={features}
          slideUp={prisonCardVisibility}
        />
      </div>
    )
  }
}

export default IndexPage