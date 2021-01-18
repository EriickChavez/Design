import React, {useState, useEffect} from 'react';
import Saludo from "./hello";
import {
  Platform,
  StyleSheet,
  Button,
  View,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {gql, useMutation} from '@apollo/client';
import {ReactNativeFile} from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';

function generateRNFile(uri, name) {
  return uri
    ? new ReactNativeFile({
      uri,
      type: mime.lookup(uri) || 'image',
      name,
    })
    : null;
}

const UPLOAD_IMAGE = gql`
  mutation uploadImage($image: Uploads) {
    uploadImage(file: $image)
  }
`;

export default function App() {
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(null);
  const [uploadImage, {data, loading, error}] = useMutation(UPLOAD_IMAGE);

  async function pickImage() {
    const result = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      includeExif: true,
    });
    if (!result.cancelled) {
      setImage(result.sourceURL);
    }
  }

  async function onUploadPress() {
    status && setStatus(null);
    const file = await generateRNFile(image, `picture-${Date.now()}`);
    // file.uri = file.uri.replace('file://', '');
    const formData = new FormData();
    formData.append('file', {uri: file.uri, type: file.type, name: file.name});
    console.log('[formData]', formData);
    // console.log('[file]', file);

    try {
      await uploadImage({
        // variables: {image: {uri: file.uri, type: file.type, name: file.name}},
        variables: {image: formData},
      });
      setStatus('Uploaded')
    } catch (e) {
      console.log('Error', e);
      setStatus('error')
    }
    if (error) console.log('[Error]', error);
  }
  if(loading)
    return <Text>Loading</Text>
  
    console.log("[data]",data)
  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{uri: image}} style={{width: 200, height: 200}} />
      )}
      {image && (
        <Button
          title={loading ? 'Uploading' : 'Upload'}
          onPress={onUploadPress}
          disabled={loading}
        />
      )}
      {loading && <ActivityIndicator size="small" style={styles.loading} />}
      <Text style={{color: status === 'Uploaded' ? 'green' : 'red'}}>
        {status}
      </Text>
      {status === 'Uploaded' && <Text>URL: {data.uploadImage}</Text>}
      <Saludo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    margin: 16,
  },
});
