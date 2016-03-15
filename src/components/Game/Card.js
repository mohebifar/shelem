import React, { Component, PropTypes, StyleSheet, View, Image, Text, Animated, PanResponder } from 'react-native';
import FlipCardView from 'react-native-flip-card';
import { getCardImage } from '../../utils/cards';
const back = require('../../images/cards/back.png');
const cardsCount = 12;

export default class Card extends Component {
  static porpTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
    card: PropTypes.object,
    face: PropTypes.oneOf(['back', 'front'])
  };

  static contextTypes = {
    position: PropTypes.oneOf(['top', 'right', 'left', 'bottom'])
  };

  state = {
    visible: false,
    pan: new Animated.ValueXY(),
    position: new Animated.ValueXY()
  };

  componentWillReceiveProps(nextProps) {
    const { position } = this.context;
    if (nextProps.card && !this.props.card) {
      this.setState({
        visible: true
      });

      const toValue = {x: 0, y: 0};
      if (position === 'bottom') {
        toValue.y = 110;
      } else if (position === 'top') {
        toValue.y = 140;
      } else if (position === 'left') {
        toValue.x = 110;
      } else if (position === 'right') {
        toValue.x = -110;
      }

      Animated.spring(
        this.state.position,
        {toValue}
      ).start();
    }
  }

  constructor(props, context) {
    super(props, context);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {
        dx: this.state.pan.x,
        dy: this.state.pan.y
      }]),
      onPanResponderRelease: (e, gesture) => {
        const dy = Math.abs(gesture.moveY - gesture.y0);
        if (dy < 150) {
          Animated.spring(
            this.state.pan,
            {toValue: {x: 0, y: 0}}
          ).start();
        }
      }
    });
  }

  orientation = constants.orientation[this.context.position];
  initialRotation = constants.initialRotation[this.context.position];
  positionDirection = constants.positionDirection[this.context.position];
  rotationDirection = constants.rotationDirection[this.context.position];
  cardsGap = constants.cardsGap[this.context.position];

  render() {
    const { style, face, card, index } = this.props;
    const { visible } = this.state;
    const { position } = this.context;
    const { initialRotation, rotationDirection, positionDirection, cardsGap } = this;

    const rotation = initialRotation + rotationDirection * (0.5 - index / cardsCount ) * 30;

    const cardStyle = {
      [positionDirection]: (0.5 - index / cardsCount) * cardsCount * cardsGap - cardsGap / 2,
      transform: [
        {rotate: `${rotation}deg`}
      ]
    };

    const touchable = position === 'bottom';

    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={[this.state[touchable ? 'pan' : 'position'].getLayout(), styles.circle]}>
        <FlipCardView
          flip={(face === 'back') && !visible}
          flipHorizontal
          flipVertical={false}
          clickable={false}
          style={[styles.container, style, styles[`${face}Visible`], cardStyle]}>
          <View>
            {
              card ?
                <Image source={getCardImage(card)} style={styles.image}>
                  <Text style={styles.cardValueTop}>{card.value}</Text>
                  <Text style={styles.cardValueBottom}>{card.value}</Text>
                </Image> : null
            }
          </View>
          <View>
            <Image source={back} style={styles.image}/>
          </View>
        </FlipCardView>
      </Animated.View>);
  }
}

const styles = StyleSheet.create({
  container: {
    width: 76,
    height: 104,
    backgroundColor: '#FFF',
    borderRadius: 3,
    elevation: 10,
    borderWidth: 2,
    borderColor: '#ddd'
  },
  image: {
    width: 72,
    height: 100
  },
  cardValueTop: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: 'bold',
    left: 2,
    top: 0
  },
  cardValueBottom: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: 'bold',
    right: 2,
    bottom: 0,
    transform: [{rotate: '180deg'}]
  }
});

const constants = {
  initialRotation: {
    left: 90,
    right: 90,
    top: 0,
    bottom: 0
  },
  positionDirection: {
    left: 'top',
    right: 'top',
    bottom: 'left',
    top: 'left'
  },
  rotationDirection: {
    left: 1,
    bottom: -1,
    right: -1,
    top: -1
  },
  orientation: {
    bottom: 'horizontal',
    top: 'horizontal',
    left: 'vertical',
    right: 'vertical'
  },
  cardsGap: {
    bottom: 55,
    top: 85,
    left: 113,
    right: 113
  }
};
