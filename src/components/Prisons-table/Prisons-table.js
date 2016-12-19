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
            Object.values(this.props.prisons).map((prison, key) => {
              return (
                <tr key={key} onClick={this.props.openCard}>
                  <td className="prisons__cell">{prison.name_ru}</td>
                  <td className="prisons__cell">период</td>
                  <td className="prisons__cell">
                    время
                    {/*<div>{prison.edited.date}</div>*/}
                    {/*<div>{prison.edited.time}</div>*/}
                  </td>
                  <td className="prisons__cell">регион</td>
                  <td className="prisons__cell prisons__strength">
                    {String(prison.strength).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ')}
                  </td>
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