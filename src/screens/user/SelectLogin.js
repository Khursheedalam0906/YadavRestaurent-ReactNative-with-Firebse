import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const SelectLogin = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.btnText}>Admin Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('UserLogin');
        }}>
        <Text style={styles.btnText}>User Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  btn: {
    backgroundColor: 'purple',
    height: 50,
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  selectLangaugeBtn: {
    width: '50%',
    height: 50,
    borderWidth: 0.2,
    borderRadius: 10,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
