import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {values} from 'ramda';
import './Prisons-table.css'

class PrisonsTable extends Component {
  render() {
    return (
      <div className="container">
        <table className="prisons">
          <thead>
          <tr>
            <td>Название</td>
            <td>Период</td>
            <td>Отредактировано</td>
            <td>Регион</td>
            <td>Макс. числ.</td>
            <td>Рус</td>
            <td>Eng</td>
          </tr>
          </thead>
          <tbody>
          {
            values(this.props.prisons)
              .sort((a, b) => {
                if (a['name_ru'] > b['name_ru']) {
                  return 1;
                }
                if (a['name_ru'] < b['name_ru']) {
                  return -1;
                }
                return 0;
              })
              .map((prison, key) => {
                const url = `/admin/prisons/${prison.id}`;
                const openPrison = browserHistory.push.bind(browserHistory, url);
                return (
                  <tr key={key} onClick={ openPrison }>
                    <td className="prisons__cell">{prison.name_ru}</td>
                    <td className="prisons__cell">
                      {
                        prison.features.map((location, key) => {
                          const YEARS = Object.keys(location.properties);
                          if (YEARS.length === 3) {
                            return <div key={ key }>{ YEARS[0] };</div>
                          } else if (YEARS.length > 2) {
                            return <div key={ key }>{ YEARS[0] + ' – ' + YEARS[YEARS.length - 3] };</div>
                          } else return null
                        })
                      }
                    </td>
                    <td className="prisons__cell">время</td>
                    <td className="prisons__cell">регион</td>
                    <td className="prisons__cell prisons__strength">
                      { String(prison.max_prisoners).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ') }
                    </td>
                    <td className="prisons__cell">{ prison.published_ru ? 'да' : 'нет' }</td>
                    <td className="prisons__cell">{ prison.published_en ? 'да' : 'нет' }</td>
                  </tr>
                )
              })
          }
          </tbody>
        </table>
      </div>
    )
  }
}

export default PrisonsTable;
