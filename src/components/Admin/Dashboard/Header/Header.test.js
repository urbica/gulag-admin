import React from 'react';
import renderer from 'react-test-renderer';

import Header from './Header';

it('renders', () => {
  const renderedValue = renderer.create(<Header />)
    .toJSON();
  expect(renderedValue)
    .toMatchSnapshot();
});
