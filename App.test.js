import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow'; 


//screens
import {MainView} from './containers/mainView'
import {ListView} from './containers/listView'

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});


test('renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ListView />);
const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
test('renders correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<ListView />);
const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
});
