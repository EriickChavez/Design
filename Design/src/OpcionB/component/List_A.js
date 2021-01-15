import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { DATA_F1 } from '../../json/index';

const _Filter = (data, filt) => {
  return data.filter((x) => x.cat == filt);
}

export default (props) => {
  const {data, setList} = props;

  const Component = [];
  
  DATA_F1.forEach(elem => {
    Component.push(
      <TouchableOpacity
        onPress={() => setList(_Filter(data, elem.name))}
        style={styles.item_container}
        key={elem.key}>
        <Text>{elem.name}</Text>
      </TouchableOpacity>
    )
  })
  Component.push(
    <TouchableOpacity
      onPress={() => setList(data)}
      style={styles.item_container}
      key="All">
      <Text>All</Text>
    </TouchableOpacity>
  )
  return (
    <ScrollView
      horizontal
    >
      {Component}
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  item_container: {
    borderWidth: 2,
    borderColor: '#28DF99',
    backgroundColor: '#rgba(40, 223, 153, 0.50)',
    marginHorizontal: 10,
    marginVertical: '2%',
    padding: 10,
    borderRadius: 10,
  },
})