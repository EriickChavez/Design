import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const _filter_name = (filt, data) => {
  return data.filter((x) => x.cat == filt);
};

export default function Item(props) {
  const {elem, DATA_LIST} = props;
  return (
    <TouchableOpacity
      style={styles.item_container}
      key={elem.key}
      onPress={() => setLista(_filter_name(elem.name, DATA_LIST))}>
      <Text style={styles.text}>Name: {elem.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item_container: {
    borderWidth: 2,
    borderColor: '#28DF99',
    backgroundColor: '#rgba(40, 223, 153, 0.50)',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
  item_text: {
    width: '90%',
    padding: '2%',
    borderWidth: 2,
    borderColor: '#rgba(0, 183, 212, 1)',
    backgroundColor: '#rgba(0, 183, 212, 0.45)',
    borderRadius: 10,
    marginHorizontal: '5%',
    marginVertical: '2%',
  },

  item_container_f2: {
    borderWidth: 2,
    borderColor: '#rgba(255, 103, 125, 1)',
    backgroundColor: '#rgba(255, 96, 119, 0.77)',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
});
