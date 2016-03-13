import React, { Component, PropTypes, StyleSheet, View, Text } from 'react-native';

export default class Splash extends Component {
  render() {
    return (<View style={styles.wrapper}>
      <Text style={styles.title}>شلم</Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222'
  },
  title: {
    fontSize: 50,
    color: '#FFF'
  }
});
