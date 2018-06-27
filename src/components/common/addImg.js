import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  Spinner
} from '@common';

export const AddImg = ({ onPress, loading }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style.tuch}>
      {loading?
        <Spinner />
      :
        <Text style={style.label} numberOfLines={1}>
          +
        </Text>
      }
    </TouchableOpacity>
  );
};

AddImg.defaultProps = {
  onPress: undefined,
};

const style = StyleSheet.create({
  tuch: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    backgroundColor: '#aaa'
  },
  label: {
    fontSize: 50,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  }
});
