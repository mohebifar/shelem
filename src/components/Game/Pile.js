import React, { Component, PropTypes, StyleSheet, View, Image } from 'react-native';

export default class Pile extends Component {
  static contextTypes = {
    position: PropTypes.oneOf(['top', 'right', 'left', 'bottom'])
  };

  static porpTypes = {
    style: PropTypes.array,
    children: PropTypes.array
  };

  render() {
    const { style, children } = this.props;
    const { position } = this.context;
    const cards = children.map ? children : [children];
    const orientation = (position === 'top' || position === 'bottom') ? 'horizontal' : 'vertical';

    return (<View style={[styles.container, styles[orientation], style]}>
      {
        cards.map((card, index) => {
          return card;
        })
      }
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  vertical: {
    flexDirection: 'column'
  },
  horizontal: {
    flexDirection: 'row'
  }
});

