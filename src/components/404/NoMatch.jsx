import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = (props) => {
  const { location } = props;

  return (
    <div>
      <div>NoMatch { location.pathname }</div>
      <Link to='/'>go to main page</Link><br />
      <Link to='/admin'>go to admin page</Link>
    </div>
  );
};

export default NoMatch;
