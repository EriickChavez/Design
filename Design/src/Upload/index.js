import React, {useState} from 'react';
import {View,Image, FlatList, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {useMutation} from "@apollo/client";

import {ActionSheet, Root, Button} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import {UPLOAD_FILE} from "./querys";



export default function componentName() {




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

    const [fileList, setFileList] = useState([]);
    const [imgSend, setImgSend] = useState('')
    const onSelectedImage = async (image) => {
        let newDataImg = [...fileList];

        const source = {uri: image.path};
        let item = {
            id: Date.now(),
            url: source,
            content: image.data,
            mime: image.mime,
        };

        newDataImg.push(item);
        setImgSend(image);
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
        let image = null
        try{
            image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64: true,
                includeExif: true,
            });
        }catch(err){
            console.log(err)
        }
        if(image)
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


    const [uploadFile, {error}] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    })

    const handleFileChange = () => {
        const img = imgSend
        const file = {uri: img.path, type:img.mime, name: img.filename}
        // const file = img.url.uri
        const formData = new FormData()
        formData.append({'file':file})

        uploadFile({variables:{ file: formData[0]}})
    }

    return (
        <SafeAreaView>
            <View style={{height: 500}}>
            
                <FlatList
                    style={{backgroundColor: 'blue', width: '100%', height: 200}}
                    data={fileList}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
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
                <TouchableOpacity onPress={handleFileChange} >
                    <Text>Press</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );


}


