import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import QueueScreen from './screens/QueueScreen';

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