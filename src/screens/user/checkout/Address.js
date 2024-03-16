import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Address = ({navigation}) => {
  const [addressList, setAddressList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getAddressList();
  }, [isFocused]);

  const getAddressList = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('users').doc(userId).get();
    let tempCart = [];
    tempCart = user._data.Address;
    setAddressList(tempCart);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={addressList}
        renderItem={() => {
          return <View style={styles.addressItem}></View>;
        }}
      />
      <TouchableOpacity style={styles.addNewBtn}>
        <Text
          style={styles.btnText}
          onPress={() => {
            navigation.navigate('AddNewAddress');
          }}>
          Add New Address
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addNewBtn: {
    width: '90%',
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  addressItem: {
    with: '90%',
    height: 100,
    backgroundColor: '#fff',
    elevation: 4,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
});
