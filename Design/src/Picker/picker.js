import React from 'react';
import {View, TouchableOpacity, Image, SafeAreaView, Text} from 'react-native';
import {ActionSheet, Button, Root} from 'native-base';

var BUTTONS = ['Option 0', 'Option 1', 'Option 2', 'Delete', 'Cancel'];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

const placeholder = require('../assets/img/img.png');
export default class ProfileImage extends React.Component {
  render() {
    return (
        <Root
            style={{justifyContent:'center', alignItems:'center', width:'100%'}}
        >
      <View>
        <Button
          transparent
          onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: 'Testing ActionSheet',
              },
              (buttonIndex) => {
                this.setState({clicked: BUTTONS[buttonIndex]});
              },
            )
          }>
          <Image source={placeholder} style={{width: 20, height: 20}} />
        </Button>
      </View>
      </Root>
    );
  }
}
