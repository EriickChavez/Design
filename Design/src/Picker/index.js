import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  FlatList,
} from 'react-native';
import {ActionSheet, Root, Button} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {useMutation, gql} from '@apollo/client';

const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload) {
    singleUpload(file: $file) {
      url
    }
  }
`;

export default (props) => {
  const [singleUpload] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => console.log(data),
  });
  const handleFileChange = (e) => {
    const file = e;
    console.log('[file]', file);
    if (!file) return;
    singleUpload({variables: {file}}).catch((e) => console.log('[e]', e));
  };

  const _fetch = async (img) => {
    let formData = new FormData();

    formData.append('file', {uri: img.path, type:img.mime, name: img.filename});

    fetch('http://localhost:3000/uploadfile/', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).catch((error) => console.error(error));
  };

  const [fileList, setFileList] = useState([]);

  const onSelectedImage = async (image) => {
    let newDataImg = [...fileList];

    const source = {uri: image.path};
    let item = {
      id: Date.now(),
      url: source,
      content: image.data,
      mime: image.mime,
    };
    image.sourceURL = "".replace("file://","");
    _fetch(image);
    console.log('[item]', image);
    newDataImg.push(item);
    setFileList(newDataImg);
  };

  const _takePhotoFromCamera = async () => {
    const image = await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    });
    onSelectedImage(image);
  };

  const _choosePhotoFromLibrary = async () => {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      includeExif: true,
    });

    onSelectedImage(image);
  };

  const onClickAddImage = () => {
    const BUTTONS = ['Take Photo', 'Choose Photo Library', 'Cancel'];
    ActionSheet.show(
      {options: BUTTONS, cancelButtonIndex: 2, title: 'Select a Photo'},
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            _takePhotoFromCamera();
            break;
          case 1:
            _choosePhotoFromLibrary();
            break;
          case 2:
            break;
        }
      },
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={[{backgroundColor: 'red'}, {width: 300, height: 300}]}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{uri: item.url.uri}}
        />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <View style={{height: 100}}>
        <Root
          style={{
            backgroundColor: 'red',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}>
          <View>
            <Button transparent onPress={onClickAddImage}>
              <Text>Seleccionar foto</Text>
            </Button>
          </View>
        </Root>
      </View>
      <FlatList
        style={{backgroundColor: 'blue', width: '100%', height: 200}}
        data={fileList}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity
        onPress={() => {
          _fetch(fileList[0]);
        }}>
        <Text>Button</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
