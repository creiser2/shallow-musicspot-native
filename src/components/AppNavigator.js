import { createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';

const AppNavigator = createStackNavigator({
    HomeScreen: { screen: HomeScreen },
    MapScreen : { screen: MapScreen }
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