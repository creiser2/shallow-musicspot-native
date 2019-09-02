import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './login/HomeScreen';
import MapScreen from './map/MapScreen';
import QueueScreen from './queue/QueueScreen';

const AppNavigator = createStackNavigator({
    HomeScreen: { screen: HomeScreen },
    MapScreen : { screen: MapScreen },
    QueueScreen : { screen: QueueScreen }
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