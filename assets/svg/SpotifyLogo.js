import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants, Svg } from 'expo';
import { SPOTIFY_GREEN, BLACK, WHITE, HOMESCREEN_BACKGROUND,  } from '../../constants/colors';
 
export default class SpotifyLogo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Svg height="85%" width="85%" viewBox="0 30 145 145" onPress={() => this.props.spotifyLogoClick()}>
          <Svg.Path
            d="M80.88 20.87a60.24 60.24 0 1 0 60.23 60.24 60.23 60.23 0 0 0-60.23-60.24zm27.62 86.88a3.74 3.74 0 0 1-5.16 1.24c-14.14-8.64-31.95-10.59-52.91-5.8a3.75 3.75 0 1 1-1.67-7.32c22.94-5.25 42.62-3 58.5 6.71a3.76 3.76 0 0 1 1.24 5.17zm7.38-16.41a4.69 4.69 0 0 1-6.46 1.55c-16.19-10-40.87-12.83-60-7a4.69 4.69 0 1 1-2.72-9c21.87-6.64 49.07-3.43 67.66 8a4.71 4.71 0 0 1 1.55 6.46zm.63-17.07c-19.41-11.53-51.44-12.59-70-7a5.63 5.63 0 0 1-3.27-10.78c21.28-6.46 56.65-5.21 79 8.06a5.63 5.63 0 1 1-5.75 9.69z"
            fill={BLACK}
            fillRule="evenodd"
          />
          <Svg.Path
            d="M78.59 21.08a60.24 60.24 0 1 0 60.23 60.24 60.23 60.23 0 0 0-60.23-60.24zM106.21 108a3.74 3.74 0 0 1-5.16 1.24c-14.14-8.64-31.95-10.59-52.91-5.8a3.76 3.76 0 1 1-1.67-7.33c22.94-5.24 42.62-3 58.5 6.72a3.76 3.76 0 0 1 1.24 5.17zm7.38-16.41a4.7 4.7 0 0 1-6.46 1.55c-16.19-9.95-40.87-12.83-60-7a4.7 4.7 0 1 1-2.72-9c21.87-6.63 49.07-3.42 67.66 8a4.7 4.7 0 0 1 1.55 6.45zm.63-17.08c-19.41-11.53-51.44-12.59-70-7A5.63 5.63 0 0 1 41 56.73c21.28-6.46 56.65-5.21 79 8.05a5.63 5.63 0 1 1-5.75 9.69z"
            fill={SPOTIFY_GREEN}
            fillRule="evenodd"
          />
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: HOMESCREEN_BACKGROUND,
  },
});
