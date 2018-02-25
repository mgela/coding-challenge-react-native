
//redux
import {combineReducers} from 'redux';
import { connect } from 'react-redux';

//navigation
import { NavigationActions, StackNavigator } from 'react-navigation'
import {StackConfigs} from '../navigation/index'
import {AppRouteConfigs} from '../navigation/index'

import MainView from '../containers/mainView'
import ListView from '../containers/listView'


// create StackNavigator
export const AppNavigator = StackNavigator(AppRouteConfigs, StackConfigs);

//initialStates
let counterState = { articlesFetched: 0, actualArticles: [], totalPages: 0, totalArticles: 0, nextPage: 1,}
const navState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('MainView'));

//REDUCERS
const counterIncrease = (state = counterState, action) => {
  switch (action.type) {
    case 'ARTICLES':
    let dataCounter = state.actualArticles.length
      return {
        ...state,
        actualArticles: [...state.actualArticles, ...action.data],
        totalPages: action.totalPages,
        totalArticles: action.totalArticles,
        nextPage: state.nextPage + 1
      }
    case 'PAGINATE':
      return {
        ...state,
        actualArticles: [...state.actualArticles, ...action.data],
        nextPage: state.nextPage + 1
      }
      break;
    default:
    return state;
  }
}


const navReducer = (state = navState, action) => {
  switch (action.type) {
    case 'NAVLIST':
        const nextState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('ListView'), state);
        return nextState || state;
      break;
    case 'Navigation/BACK':
        const resetAction = NavigationActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'MainView' })],
        });
        const previousState = AppNavigator.router.getStateForAction(resetAction, state);
        return previousState || navState
      break;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  counterIncrease: counterIncrease,
   nav: navReducer,
})
