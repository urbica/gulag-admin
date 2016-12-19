import React from 'react';
import './Drop-Down-List.css';

class DropDownList extends React.Component {
  render() {
    return (
      <div className="dropDownContainer">
        <div className="dropDown__activeItem">
          <div>{ this.props.list[this.props.activeItem] }</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9">
            <path fill="none" stroke="#979797" strokeWidth="2" d="M1 1l5.58 6L12 1.17"/>
          </svg>
        </div>
        <ul className='dropDownList'>
          {
            Object.values(this.props.list).map((item, key) =>
              <li key={ key }>{ item }</li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default DropDownList;