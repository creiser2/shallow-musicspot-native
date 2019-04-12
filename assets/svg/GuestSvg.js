import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants, Svg } from 'expo';
import { WHITE, HOMESCREEN_BACKGROUND  } from '../../constants/colors';


export default class GuestSvg extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Svg height="80%" width="80%" viewBox="0 100 500 500">
            <Svg.Circle
                cx="249.56"
                cy="249.69"
                r="211.03"
                fill="#fff"
                stroke="#000"
                strokeWidth={8}
            />
            <Svg.Path
                d="M103.24 402.35c0-77.08 39.75-146.72 90.15-152.3 3.87-.43 7.7 1.13 10.13 4.18l29.49 37.08c8.49 10.67 24.68 10.72 33.23.1l29.08-36.12c2.99-3.71 7.68-5.7 12.4-5.07 50.01 6.65 89.36 75.74 89.36 152.13"
                fill="none"
                stroke="#000"
                strokeWidth={8}
            />
            <Svg.Circle
                cx="249.56"
                cy="181.5"
                r="54.86"
                fill="#fff"
                stroke="#000"
                strokeWidth={7}
                onPress={() => this.props.guestLogoClick()}
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
