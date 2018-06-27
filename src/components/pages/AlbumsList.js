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
  ImgCard
} from '@common';
import {
  loadingAlbums,
  loadingPhotos,
  loguot
} from '@actions';

class AlbumsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      currentItem: 0,
      error: '',
    };

    this.i = 0;
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
      title: 'Hi, ' + this.props.user.name,
      onRight: this.props.loguot
    });

    this.setState({loading: true});
    this.props.loadingAlbums({userId: this.props.user.id})
      .then(res => this.loadPhoto())
      .catch(error => error.status === 404 ? alert('This user does not exist') : this.setState({error: error.message}))

  }

  loadPhoto() {
    this.props.loadingPhotos(this.props.albums[this.i].id)
      .catch(error => error.status === 404 ? alert('This user does not exist') : this.setState({error: error.message}))
      .finally(() => {
        if (this.i <= this.props.albums.length) {
          this.setState({loading: false});
          this.i += 1;
          this.loadPhoto();
        }
      });
  }

  randomPhoto(id) {
    let min = 0,
      max = this.props.photos[id].length - 1;

    min = Math.ceil(min);
    max = Math.floor(max);
    const rand = Math.floor(Math.random() * (max - min)) + min;

    return this.props.photos[id][rand].thumbnailUrl
  }

  openAlbum(album) {
    Actions.photoList({album})
  }

  static createImgCard(item, i) {
    if (this.props.photos[item.id] === undefined) return (null);
    return (
      <ImgCard
        key={item.id + i}
        onPress={this.openAlbum.bind(this, item)}
        imagePreview={this.randomPhoto(item.id)}
        label={item.title}
      />
    )
  }

  render() {
    return (
      <View style={style.main}>
        {this.errorMsg()}

        {
          this.state.loading ?
            <Spinner/>
            :
            <ScrollView style={style.sizeList} contentContainerStyle={style.list}>
              { this.props.albums.map(AlbumsList.createImgCard.bind(this)) }
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
    loadingAlbums,
    loadingPhotos
  }
)(AlbumsList);

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
  sizeList: {
    flex: 1,
  },
  error: {
    textAlign: 'center',
    marginVertical: 30,
    fontSize: 22,
  }
});
