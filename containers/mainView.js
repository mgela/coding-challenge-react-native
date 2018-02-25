/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from 'react-native';

import {nav} from '../actions'
import {connect} from 'react-redux';

export class MainView extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.counterWrapper}>
          <Text style={styles.text}>Number of articles: </Text>
          <Text style={styles.counter}>{this.props.listItems.length}</Text>
          <TouchableOpacity onPress={this.props.enterMainView}>
            <View style={styles.button}>
              <Text style={styles.text}>Enter List</Text>
            </View>
          </TouchableOpacity>
        </View>
        </View>
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
  listItems: state.counterIncrease.actualArticles
})
const mapDispatchToProps = (dispatch) => ({
  enterMainView: ()=> dispatch(nav())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  counterWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '50%',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    backgroundColor: 'lime',
    borderRadius: 10,
  },
  counter: {
    fontSize: 60,
  },
  text: {
    fontSize: 24,
    color: '#2196f3',
  },

});
