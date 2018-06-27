import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity, 
  ImageBackground,
  StyleSheet, 
} from 'react-native';
export class ImgCard extends Component {
  static defaultProps = {
    onPress: undefined, 
    imagePreview: '', 
    label: ''
  };

  shouldComponentUpdate() {
    return false
  }

  render() {
    const {onPress, imagePreview, label} = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={style.tuch}>
        <ImageBackground source={{uri: imagePreview}} style={style.img}>
          <Text style={style.label} numberOfLines={1}>
            {label}
          </Text>
        </ImageBackground> 
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  tuch: {
    width: 150,
    height: 150,
    backgroundColor: '#aaa'
  },
  img: {
    flex: 1,
    width: null,
    height: '100%',
  },
  label: {
    position: 'absolute',
    paddingVertical: 10,
    paddingHorizontal: 5,
    bottom: 0,
    fontSize: 14,
    textAlign: 'center',
    color: '#fff'
  }
});
