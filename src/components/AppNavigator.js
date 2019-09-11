import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './login/HomeScreen';
import MapScreen from './map/MapScreen';
import QueueScreen from './queue/QueueScreen';
import QueueSearch from './queue/QueueSearch';
import Settings from './settings/Settings';

const AppNavigator = createStackNavigator({
    QueueScreen : { screen: QueueScreen },
    HomeScreen: { screen: HomeScreen },
    MapScreen : { screen: MapScreen },
    QueueSearch : { screen: QueueSearch },
    Settings : { screen: Settings }
  },  
  { 
    headerMode: 'none'
  },  
  {
    cardStyle: {
      backgroundColor: 'transparent',
    }
  }
);

export default createAppContainer(AppNavigator);