import React, {Component} from 'react';
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
            this.props.prisons.map((prison, key) => {
              return (
                <tr key={key}>
                  <td className="prisons__cell">{prison.name}</td>
                  <td className="prisons__cell">{prison.period}</td>
                  <td className="prisons__cell">{prison.edited.date}{prison.edited.time}</td>
                  <td className="prisons__cell">{prison.region}</td>
                  <td className="prisons__cell">{String(prison.strength).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}</td>
                  <td className="prisons__cell">{prison.ru ? 'да' : 'нет'}</td>
                  <td className="prisons__cell">{prison.en ? 'да' : 'нет'}</td>
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