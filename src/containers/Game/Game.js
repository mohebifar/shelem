import React, { Component, PropTypes, StyleSheet, Image, View, Dimensions } from 'react-native';
import Player from '../../components/Game/Player';
import Card from '../../components/Game/Card';
import { load, throwCard } from '../../redux/modules/game';
import { connect } from 'react-redux';

@connect(state => ({players: state.game.players}), {load, throwCard})
export default class Game extends Component {
  componentWillMount() {
    this.props.load();
    setTimeout(() => {
      this.props.throwCard({
        suit: 'spade',
        value: 10
      }, this.props.players[1]);
    }, 2000)
    setTimeout(() => {
      this.props.throwCard({
        suit: 'spade',
        value: 10
      }, this.props.players[2]);
    }, 3000)
    setTimeout(() => {
      this.props.throwCard({
        suit: 'spade',
        value: 10
      }, this.props.players[0]);
    }, 4000)
  }

  render() {
    const { players } = this.props;
    return (<View style={styles.wrapper}>
      <Image source={require('../../images/bg/default.jpg')}
             style={styles.backgroundImage}
             resizeMode="cover">
        {
          players.map(player => <View
            style={styles[`${player.position}Position`]}
            key={player.position}>
            <Player position={player.position} name={player.name}>
              {
                player.cards.map((card, index) => <Card
                  index={index}
                  card={card}
                  face={player.position !== 'bottom' ? 'back' : 'face'}
                  key={index}/>)
              }
            </Player>
          </View>)
        }
      </Image>
    </View>);
  }
}

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    flexDirection: 'column'
  },
  backgroundImage: {
    flex: 1
  },
  bottomPosition: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  topPosition: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  rightPosition: {
    position: 'absolute',
    top: 0,
    right: 100,
    bottom: 0
  },
  leftPosition: {
    position: 'absolute',
    top: 0,
    left: 100,
    bottom: 0
  }
});