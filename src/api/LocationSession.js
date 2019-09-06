
import { Location } from 'expo';

export const watcherWithHandler = async (onNewPosition) => {
    const options = { enableHighAccuracy: true, timeInterval: 1000, distanceInterval: 1 };
    return await Location.watchPositionAsync(options, onNewPosition);
}

export const getCurrentLocation = async () => {
    return await Location.getCurrentPositionAsync();
}

export const getGeoCode = async (longitude, latitude) => {
    return await Location.reverseGeocodeAsync({ latitude, longitude })
}