import React, { useState } from 'react';
import { View, Text, TextInput, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { memo } from 'react';
import mime from "mime";
import envVars from '../config';
import { useSelector } from 'react-redux';

const MyComponent = ({navigation}) => {
  const { info } = useSelector(state => state.userInfo)
  const [image, setImage] = useState(null);
  const [textInputValue, setTextInputValue] = useState('');

  const handleImagePicker = async () => {
    // const assets = await ImagePicker.launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if(status !== 'granted'){
      alert('Sorry! We need camera roll permission.');
    }
    else if(status === 'granted'){
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true
      })
      if(!result.canceled) setImage(result.assets[0].uri);
    }
  };

  const handleTextInput = (value) => {
    setTextInputValue(value);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    let imageType = mime.getType(image);
    formData.append('object', JSON.stringify({
        // user: {
        //     _id: info._id,
        //     name: info.name,
        //     profileImagePath: info.profileImagePath
        // },
        userID: info._id,
        content: {
          text: textInputValue,
          imagePath: '',
        }
    }));
    formData.append('photo', {
      uri: image,
      type: imageType,
      name: Date.now() + `.${imageType.substring(imageType.indexOf('/') + 1)}`,
    });

    try {
      const response = await fetch(`http://${envVars.Server_IP}:5000/api/post/create-post`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload successful!');
      if(response) {
        navigation.goBack()
      }
    } catch (error) {
      console.error("POST ERROR",error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <Text style={styles.label}>Text Input:</Text>
        <TextInput
          style={styles.textInput}
          value={textInputValue}
          onChangeText={handleTextInput}
        />
      </View>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Button title="Take Photo" onPress={handleImagePicker} />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  imageContainer: {
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  textInputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
});

export default memo(MyComponent);