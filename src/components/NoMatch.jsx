import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = ({ location }) => (
  <div>
    <div>NoMatch { location.pathname }</div>
    <Link to="/admin">go to main page</Link>
  </div>
);

export default NoMatch