import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {useMutation, gql} from '@apollo/client'

const UPLOAD_FILE = gql`
    mutation uploadFile($file: Upload!){
        uploadFile(file:$file){
            url
        }
    }
`

export default function UploadForm() {
    const [uploadFile] = useMutation(UPLOAD_FILE, {
        onCompleted: data => console.log(data)
    });
    const handleFileChange = e => {
        const file = e.target.file[0]
        if (!file) return
        uploadFile({variables: { file }})
    }
    const alerta = () => {
        alert("si")
    }
    return (
    <View>
      <Text>Upload File</Text>
      <TouchableOpacity onPress={alerta}>
          <Text>File</Text>
      </TouchableOpacity>
     </View>
  );
}
