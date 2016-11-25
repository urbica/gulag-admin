import React from 'react';
import './Prison-page.css';

class PrisonCard extends React.Component {
  render() {
    const className = this.props.visible ? 'prison-card prison-card_visible' : 'prison-card';
    return (
      <div className={ className }>
        <div className="container">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam explicabo illum incidunt magni? Adipisci,
          consequatur debitis deleniti fuga illo, in ipsum itaque maiores, modi officiis quo recusandae repellat sit
          temporibus vero. Accusamus accusantium alias amet asperiores at atque, aut cupiditate dolores doloribus ea est
          exercitationem iure libero molestiae nihil nulla officiis pariatur perferendis porro qui quidem quisquam, quo,
          ullam unde voluptates. Accusantium ad adipisci assumenda at aut eos error eum exercitationem facere, fugit in
          inventore modi mollitia, natus officia quaerat recusandae repellat reprehenderit saepe sed sit soluta sunt
          suscipit vel veniam! Accusamus deserunt dolorem doloremque expedita facere nulla, qui voluptate.
        </div>
      </div>
    );
  }
}

export default PrisonCard;