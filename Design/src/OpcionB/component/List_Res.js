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


export default (props) => {
  
    const {data} = props;

    const Component = []
    data.forEach(elem => {
        Component.push(
            <TouchableOpacity
                style={styles.item_container}
                key={elem.key}>
                <Text>{elem.name} - {elem.cat} - {elem.d}</Text>
            </TouchableOpacity>
        )
    })
  return (
    <ScrollView>
        {Component}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    item_container:{
        width:'90%',
        marginHorizontal:'5%',
        marginVertical:'2%',
        borderWidth:1,
        borderRadius:10,
        padding:'2%',
        justifyContent:'center',
        alignItems:'center',
        borderColor: '#rgba(0, 183, 212, 1)',
        backgroundColor: '#rgba(0, 183, 212, 0.45)',
    }
})