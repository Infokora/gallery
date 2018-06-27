import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';
import {connect} from "react-redux";
import propTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';

import {
  Spinner,
  Input,
} from '@common';
import {
  auth
} from '@actions';

class Auth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: '',
      userId: ''
    }
  }

  static propTypes = {
    auth: propTypes.func.isRequired
  };

  static defaultProps = {
    auth: undefined
  };

  errorMsg() {
    if (this.state.error) {
      return (
        <Text style={style.error}>
          {this.state.error}
        </Text>
      );
    } else {
      return null
    }
  }

  auth() {
    this.setState({loading: true});

    this.props.auth(this.state.userId)
      .then(res => Actions.albumsList())
      .catch(error => {
        if (error.status === 404) {
          alert('This user does not exist')
        } else {
          this.setState({error: error.message})
        }
      })
      .finally(() => this.setState({loading: false}));
  }

  render() {
    return (
      <View style={style.main}>
        <Input
          placeholder={'Enter user id'}
          onChangeText={value => this.setState({userId: value})}
          value={this.state.userId}
        />
        {this.errorMsg()}
        {
          this.state.loading ?
            <Spinner/>
            :
            <Button
              onPress={this.auth.bind(this)}
              title="Auth"
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              disabled={this.state.userId ? false : true}
            />
        }

      </View>
    )
  };
}

export default connect(
  ({
     user
   }) => {
    return {
      user
    }
  }, {
    auth
  }
)(Auth);

const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  error: {
    textAlign: 'center',
    marginVertical: 30,
    fontSize: 22,
  }
});
