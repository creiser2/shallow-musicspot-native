import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants, Svg } from 'expo';

export default class Test extends Component {
  render() {
    return (
      <View style={styles.container}>


        <Svg height={100} width={100}>
          <Svg.Path
            d="M19.1 10.64C15.23 8.34 8.85 8.13 5.16 9.25a1.123 1.123 0 1 1-.65-2.15c4.23-1.28 11.28-1 15.73 1.61a1.12 1.12 0 1 1-1.14 1.93zM19 14a.94.94 0 0 1-1.29.31A15.73 15.73 0 0 0 5.73 13a.94.94 0 0 1-.55-1.79 17.54 17.54 0 0 1 13.48 1.59A.94.94 0 0 1 19 14zm-1.5 3.31a.75.75 0 0 1-1 .25c-2.82-1.73-6.37-2.11-10.55-1.16a.75.75 0 0 1-.33-1.46c4.57-1 8.49-.59 11.66 1.34a.75.75 0 0 1 .22 1.03zM12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0z"
            fill="#57b560"
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
    backgroundColor: '#ecf0f1',
  },
});
