import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import {connect} from "react-redux";
import propTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';

import {
  Spinner,
  Input,
  ImgCard,
  ViewPhoto,
  AddImg
} from '@common';
import {
  loadingPhotos,
  addNewPhoto,
  loguot
} from '@actions';

class PhotoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loadingPhoto: false,
      error: '',
      photoVisible: false,
      photo: ''
    }
  }

  static propTypes = {
    loadingAlbums: propTypes.func.isRequired
  };

  static defaultProps = {
    loadingAlbums: undefined
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

  componentDidMount() {
    Actions.refresh({
      title: this.props.album.title,
      onRight: this.props.loguot
    });
  }

  static createPhoto(item, i) {
    return (
      <ImgCard
        key={item.id + i}
        onPress={this.openViewPhoto.bind(this, item)}
        imagePreview={item.thumbnailUrl}
        label={item.title}
      />
    )
  }

  closeViewPhoto() {
    Actions.refresh({title: this.props.album.title});
    this.setState({photoVisible: false})
  }

  openViewPhoto(item) {
    Actions.refresh({title: item.title || 'User image as save local'});
    this.setState({
      photoVisible: true,
      photo: item.url
    })
  }

  addNewPhoto() {
    this.setState({loadingPhoto: true});

    this.props.addNewPhoto(this.props.album)
      .then(res => console.log(res))
      .catch(error => error.status === 404 ? alert('This user does not exist') : this.setState({error: error.message}))
      .finally(() => this.setState({loadingPhoto: false}));
  }

  render() {
    return (
      <View style={style.main}>
        <ViewPhoto
          modalVisible={this.state.photoVisible}
          closeViewPhoto={this.closeViewPhoto.bind(this)}
          image={this.state.photo}
        />
        {this.errorMsg()}
        {
          this.state.loading ?
            <Spinner/>
            :
            <ScrollView style={style.sizeList} contentContainerStyle={style.list}>
              <AddImg onPress={this.addNewPhoto.bind(this)} loading={this.state.loadingPhoto}/>

              {this.props.photos[this.props.album.id].map(PhotoList.createPhoto.bind(this))}
            </ScrollView>
        }
      </View>
    )
  };
}

export default connect(
  ({
     user,
     albums,
     photos
   }) => {
    return {
      user,
      albums,
      photos
    }
  }, {
    loadingPhotos,
    addNewPhoto,
    loguot
  }
)(PhotoList);

const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 10,
  },
  error: {
    textAlign: 'center',
    marginVertical: 30,
    fontSize: 22,
  }
});
