import {
  StackNavigator,
  addNavigationHelpers,
} from 'react-navigation';
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
import { Provider, connect } from 'react-redux';
import  store  from './store'
import {AppNavigator}   from './reducers/index'

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';






const addListener = createReduxBoundAddListener("root");

const AppWithNavigationState = connect(state => ({
    nav: state.nav,
}))(({ dispatch, nav }) => (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav, addListener })} />
));

export default class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
           <AppWithNavigationState/>
        </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
