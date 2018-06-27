import React, {Component} from 'react';
import {TextInput, StyleSheet, Platform} from 'react-native';

export const Input = (props) => { 
  return (
    <TextInput
      style={[styles.input, props.style]}
      value={props.value || null}
      onChangeText={props.onChangeText}
      placeholder={props.placeholder || null}
      keyboardType={Platform.OS === 'ios'? 'number-pad': 'numeric'}
      secureTextEntry={props.secureTextEntry}
      underlineColorAndroid="transparent"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 12,
    textAlign: 'center'
  }
});
