import React, {Component} from 'react';
import {
  Scene,
  Router,
  ActionConst
} from 'react-native-router-flux';

import Auth from './components/pages/Auth';
import AlbumsList from './components/pages/AlbumsList';
import PhotoList from './components/pages/PhotoList';

export default class Routers extends Component {

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene
            type={ActionConst.RESET}
            key="auth"
            component={Auth}
            title={'Auth'}
            initial
          />

          <Scene
            type={ActionConst.RESET}
            key="albumsList"
            component={AlbumsList}
            rightTitle={'LogOut9'}
            rightButtonTextStyle={{color: 'red'}}
            onRight={() => {}}
          />

          <Scene
            key="photoList"
            component={PhotoList}
            rightTitle={'LogOut'}
            rightButtonTextStyle={{color: 'red'}}
            onRight={() => {}}
          />
        </Scene>
      </Router>
    );
  };
};