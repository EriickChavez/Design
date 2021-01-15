import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {DATA_LIST} from '../../json/index';
import ListA from '../component/List_A';
import ListB from '../component/List_B';
import ListRes from '../component/List_Res';

export default () => {
  const [list, setList] = useState(DATA_LIST);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <ListA data={DATA_LIST} setList={setList} />
        <ListB data={DATA_LIST} setList={setList} />
      </View>
      <ListRes data={list} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center'
  }
})