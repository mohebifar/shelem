import React, { Component, PropTypes, StyleSheet, View, Image, Text } from 'react-native';
import Button from 'react-native-button';
import Pile from './Pile';

export default class Player extends Component {
  static childContextTypes = {
    position: PropTypes.oneOf(['top', 'right', 'left', 'bottom']),
    player: PropTypes.object
  };

  static porpTypes = {
    position: PropTypes.oneOf(['top', 'right', 'left', 'bottom']),
    style: PropTypes.object,
    player: PropTypes.object,
    name: PropTypes.string
  };

  getChildContext() {
    const { position, player } = this.props;
    return {
      position,
      player
    };
  }

  render() {
    const { style, children, position, name } = this.props;

    return (<View style={[styles.container, style]}>
      <View style={[styles.information, styles[`${position}Information`]]}>
        <Button containerStyle={styles.nameContainer}>
          <Text style={styles.name}>
            {name}
          </Text>

        </Button>
      </View>

      <Pile>
        { children }
      </Pile>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  information: {
    position: 'absolute'
  },
  bottomInformation: {
    bottom: 120,
    right: 220
  },
  topInformation: {
    top: 120,
    left: 220
  },
  leftInformation: {
    bottom: 150,
    left: 20
  },
  rightInformation: {
    top: 150,
    right: 20
  },
  nameContainer: {
    borderRadius: 3,
    backgroundColor: 'green',
    padding: 5
  },
  name: {
    color: '#fff',
    fontSize: 14,
    width: 80,
    fontFamily: 'Vazir',
    textAlign: 'center'
  }
});
