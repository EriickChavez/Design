import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {DATA, DATA_LIST, DATA_F2} from '../../json/index';

const _filter_name = (filt, data) => {
  return data.filter((x) => x.cat == filt)
};
const _filter_d = (filt, data) => {
  return data.filter((x) => x.d == filt);
};

export default () => {
  const [lista, setLista] = useState(DATA_LIST);
  const ComponentsFilter1 = [];
  const ComponentsFilter2 = [];
  const ComponentList = [];

  DATA_F2.forEach((elem) => {
    ComponentsFilter2.push(
      <TouchableOpacity
        style={styles.item_container_f2}
        key={elem.key}
        onPress={() => setLista(_filter_d(elem.d, DATA_LIST))}>
        <Text style={styles.text_f2}>d: {elem.d}</Text>
      </TouchableOpacity>,
    );
  });

  DATA.forEach((elem) => {
    ComponentsFilter1.push(
      <TouchableOpacity
        style={styles.item_container}
        key={elem.key}
        onPress={() => setLista(_filter_name(elem.name, DATA_LIST))}>
        <Text style={styles.text}>Name: {elem.name}</Text>
      </TouchableOpacity>,
    );
  });

  lista.forEach((elem) => {
    ComponentList.push(
      <View style={styles.item_text} key={elem.key}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.text}>
            name: {elem.name}, cat: {elem.cat} d: {elem.d}
          </Text>
        </View>
      </View>,
    );
  });

  return (
    <SafeAreaView>
      <ScrollView
        horizontal
        style={{marginVertical: '1%', paddingHorizontal: '5%', width: '100%'}}>
        {ComponentsFilter1}
      </ScrollView>
      <ScrollView
        horizontal
        style={{marginVertical: '1%', paddingHorizontal: '5%', width: '100%'}}>
        {ComponentsFilter2}
      </ScrollView>
      <ScrollView>{ComponentList}</ScrollView>
    </SafeAreaView>
  );
};

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
