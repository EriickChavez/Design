import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { DATA_F2 } from '../../json/index';

const _Filter = (data, filt) => {
  return data.filter((x) => x.d == filt);
}

export default (props) => {
  const {data, setList} = props;

  const Component = [];
  
  DATA_F2.forEach(elem => {
    Component.push(
      <TouchableOpacity
        onPress={() => setList(_Filter(data, elem.d))}
        style={styles.item_container}
        key={elem.key}>
        <Text>{elem.d}</Text>
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
    borderColor: '#rgba(255, 103, 125, 1)',
    backgroundColor: '#rgba(255, 96, 119, 0.77)',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
  },
})