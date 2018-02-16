import React from 'react';
import renderer from 'react-test-renderer';

import Chronology from './Chronology';

it('renders', () => {
  const renderedValue = renderer.create(<Chronology />)
    .toJSON();
  expect(renderedValue)
    .toMatchSnapshot();
});
