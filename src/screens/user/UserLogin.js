import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../common/Loader';

const UserLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const adminLogin = async () => {
    setModalVisible(true);
    firestore()
      .collection('users')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(querySnapshot => {
        setModalVisible(false);
        /* ... */
        console.log(querySnapshot.docs);
        if (querySnapshot.docs[0]._data !== null) {
          if (
            querySnapshot.docs[0]._data.email === email &&
            querySnapshot.docs[0]._data.password === password
          ) {
            goToNextScreen();
          }
        }
      })
      .catch(error => {
        setModalVisible(false);
        console.log(error);
        alert('Please Check Email/Password');
      });
  };

  const goToNextScreen = async () => {
    await AsyncStorage.setItem('EMAIL', email);
    // await AsyncStorage.setItem('USERID', userId);
    navigation.navigate('Home');
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Email Id'}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Password '}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (email !== '' && password !== '') {
            adminLogin();
          } else {
            alert('Please Enter Data');
          }
        }}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.createNewAccount}
        onPress={() => {
          navigation.navigate('UserSignup');
        }}>
        Create New Account
      </Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

export default UserLogin;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginTop: 100,
    alignSelf: 'center',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
  },
  loginBtn: {
    backgroundColor: 'orange',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  createNewAccount: {
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 50,
    alignSelf: 'center',
  },
});
