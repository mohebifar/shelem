import React, {
  Component,
  PropTypes
} from 'react-native';
import { Router, Actions, Route } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import createStore from '../../redux/create';
import Splash from './../../containers/Splash/Splash';
import MainMenu from './../../containers/MainMenu/MainMenu';
import Game from './../../containers/Game/Game';
const store = createStore();

export default class App extends Component {
  render() {
    return (<Provider store={store}>
      <Router hideNavBar>
        <Route name="splash" component={Splash}/>
        <Route initial name="game" component={Game}/>
        <Route name="mainMenu" component={MainMenu}/>
      </Router>
    </Provider>);
  }
}
