
import MainView from '../containers/mainView'
import ListView from '../containers/listView'

//stacknavigator config
export const StackConfigs = {
  headerMode: 'float',
  mode: 'modal',
  navigationOptions: {
    title: 'Draagu',
    gesturesEnabled: false,
    headerStyle: { backgroundColor: '#2196f3' },
		headerTintColor: '#fff',
    headerBackTitle: 'back',
  }
}
//routing
export const AppRouteConfigs = {
  MainView : {
    screen: MainView,
  },
  ListView: {
    screen: ListView,
    navigationOptions: {
      title: 'Draagu',
      gesturesEnabled: false,
      headerStyle: { backgroundColor: '#2196f3' },
  		headerTintColor: '#fff',
      headerBackTitle: 'back',
    }
  },
  initialRouteName: 'MainView'
}
