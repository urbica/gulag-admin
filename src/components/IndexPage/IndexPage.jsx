import React, { Component } from 'react'
import { values } from 'ramda'
import Header from './Header'
import Year from './Year'
import PeriodCard from './PeriodCard'
import Map from './Map'

class IndexPage extends Component {
  state = {
    currentLanguage: 'ru',
    currentYear: 1918,
    currentPrisons: []
  };

  componentWillReceiveProps(nextProps) {
    const prisons = values(nextProps.prisons);
    const filteredPrisons = prisons.filter(prison => prison.published[this.state.currentLanguage]);

    this.setState({ currentPrisons: filteredPrisons });
  }

  render() {
    return (
      <div>
        <Header currentYear={ this.state.currentYear }
                currentPrisons={ this.state.currentPrisons }
        />
        <Year>{ this.state.currentYear }</Year>
        <PeriodCard period={ this.props.periods[1] }
                    currentLanguage={ this.state.currentLanguage }
        />
        <Map currentPrisons={ this.state.currentPrisons }/>
      </div>
    )
  }
}

export default IndexPage