import React, { PropTypes, Component, StyleSheet, View, Image } from 'react-native';
import Button from 'react-native-button';

export default class MainMenu extends Component {
  render() {

    return <View style={styles.container}>
      <Image source={require('./../../images/icon.png')} style={styles.logo}/>
      <Button containerStyle={buttonStyles.container}
              style={buttonStyles.text}>
        بازی جدید
      </Button>
      <Button containerStyle={buttonStyles.container}
              style={buttonStyles.text}>
        تنظیمات
      </Button>
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 70
  }
});

const buttonStyles = StyleSheet.create({
  container: {
    backgroundColor: '#94c500',
    width: 300,
    padding: 15,
    borderRadius: 28,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#7EB530'
  },
  text: {
    color: '#fff',
    fontFamily: 'Vazir',
    fontSize: 16
  }
});
