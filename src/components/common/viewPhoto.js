import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Image
} from 'react-native';
import propTypes from 'prop-types';

export const ViewPhoto = ({modalVisible, closeViewPhoto, image}) => {
  console.log(image);
  return (
    <View style={style.wrap}>
      <Modal
        animationType="fade"
				transparent
        visible={modalVisible}
        onRequestClose={closeViewPhoto}
      >
        <View style={style.box}>
          <Image source={{uri: image}} style={style.img} />
        </View>  
      </Modal>
    </View>
  )
};

ViewPhoto.propTypes = {
  modalVisible: propTypes.bool,
  closeViewPhoto: propTypes.func.isRequired,
  image: propTypes.string
};

ViewPhoto.defaultProps = {
  modalVisible: false,
  closeViewPhoto: undefined,
  image: ''
};

const style = StyleSheet.create({
  wrapSpinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    flex: 1,
    width: '100%',
    height: null,
  },
  box: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)'
  }
});