import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Image, ImagePropTypes } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import mime from "mime";
import axios from 'axios';
import envVars from '../config';
// import { LOCAL_HOST } from '@env';


import InputField from '../components/InputField';
import { login } from '../redux/actions_&_reducers/isLoginSlice';




export default function Login({ navigation }) {
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [education, setEducation] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [profileImageUri, setProfileImageUri] = useState(null);



  const dispatch = useDispatch();


  /*****     API Call     *****/

  //This function creates an account for user and get him/her login
  async function signupUser() {

    //Creating Form Data to send to the server
    const formData = new FormData();
    //Getting image type (mime type)
    let imageType = mime.getType(profileImageUri);
    
    formData.append('profileImage', {
      uri: profileImageUri,
      type: imageType,
      //Creating file name & Apending type extension to it.
      name: Date.now() + `.${imageType.substring(imageType.indexOf('/') + 1)}`,
    });
    formData.append('credentials', JSON.stringify({
      name: name,
      emailID: email,
      password: password,
      dob: {
        day: day,
        month: month,
        year: year
      },
      education: education,
      maritalStatus: maritalStatus
    }));  


    //Api Calls
    try {

      // Checking if the user a/c is already exist on an Email ID
      const res1 = await axios.post(
        `http://${envVars.Server_IP}:5000/api/user/is-exist`,
        {emailID: email}
      );
      if(res1.data.error) throw new Error(res1.data.error);
   

      //Sending User data to server to create a/c.
      const res2 = await fetch(
        `http://${envVars.Server_IP}:5000/api/users/add-user`,
        {
          method: 'post',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const data = await res2.json();
      
      if(data.error) throw new Error(data.error);
      else if(data.success){
        alert('Your account is created successfully');
      } 
      else throw new Error('Server is disconnected Or not responding');
    }
    
    //If error then show error message
    catch (error) {
      alert(error.message);
    }
  }
  
  /*****     API Call Ends     *****/
  

  // For Image Upload
  async function openImageLibrary() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if(status !== 'granted'){
      alert('Sorry! We need camera roll permission.');
    }
    else if(status === 'granted'){
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        base64: true
      })
      if(!response.canceled) setProfileImageUri(response.assets[0].uri);
      console.log(response.assets[0].uri);
    }

  } 


  return (
    <ScrollView>
      <View style={styles.container}>
        
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Name</Text>
        </View>
        <InputField
          placeholder='Enter your full Name' 
          value={name} 
          setValue={setName}
        />

        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Email ID</Text>
        </View>
        <InputField
          placeholder='Enter your Email ID' 
          value={email} 
          setValue={setEmail}
        />

        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Password</Text>
        </View>
        <InputField 
          placeholder='Enter Password' 
          value={password} 
          setValue={setPassword}
          secureTextEntry={true}
        />

        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Date of Birth</Text>
        </View>
        <View style={styles.dateContainer}>
          <View style={styles.dateInputWrapper}>
            <TextInput
              styles={styles.dateInput}
              placeholder='dd'
              value={day}
              onChangeText={setDay}
              maxLength={2}
            />  
          </View>
          <View style={styles.dateInputWrapper}>
            <TextInput
              styles={styles.dateInput}
              placeholder='mm'
              value={month}
              onChangeText={setMonth}
              maxLength={2}
            />  
          </View>
          <View style={styles.dateInputWrapper}>
            <TextInput
              styles={styles.dateInput}
              placeholder='yyyy'
              value={year}
              onChangeText={setYear}
              maxLength={4}
            />  
          </View>
        </View>

        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Education</Text>
        </View>
        <InputField
          placeholder='Enter your full Name' 
          value={education} 
          setValue={setEducation}
        />

        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Marital Status</Text>
        </View>
        <InputField
          placeholder='Enter your full Name' 
          value={maritalStatus} 
          setValue={setMaritalStatus}
        />

        <View style={styles.labelWrapper}>
          <Text style={styles.label}>Upload your profile picture</Text>
        </View>
        <View style={styles.picSelectBtnContainer}>
          {
            profileImageUri !== null ? (
              <TouchableOpacity 
                style={[styles.picSelectBtn, {borderColor: 'lightgrey'}]}
                onPress={openImageLibrary}
                disabled={true}
              >
                <Text style={[styles.picSelectBtnText, {color: 'lightgrey'}]}>
                  Select
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                style={styles.picSelectBtn}
                onPress={openImageLibrary}
              >
                <Text style={styles.picSelectBtnText}>Select</Text>
              </TouchableOpacity>
            )
          }
          {
            profileImageUri !== null &&
            <TouchableOpacity 
              style={[styles.picSelectBtn, {borderColor: 'red'}]}
              onPress={()=>setProfileImageUri(null)}
            >
              <Text style={[styles.picSelectBtnText, {color: 'red'}]}>Cancel</Text>
            </TouchableOpacity>
          } 
        </View>
        {
          profileImageUri !== null &&
          <View style={styles.imgPreviewContainer}>
            <Image style={styles.imgPreview} source={{uri: profileImageUri}} />
          </View>
        }

        <TouchableOpacity
          style={styles.btn}
          onPress={() => signupUser()}
          >
            <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#EBECEC',
    paddingTop: 30,
    paddingBottom: 100
  },
  btn: { 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '75%', 
    marginTop: 30,
    backgroundColor: '#2a7cf7',
    borderRadius: 5
  },
  btnText: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    letterSpacing: 2
  },
  labelWrapper: {
    minWidth: '90%',
    marginTop: 10,
    marginBottom: 0,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'serif',
    fontSize: 15,
    color: 'grey',
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    minWidth: '90%'
  },
  dateInputWrapper: {
    backgroundColor: 'white',
    width: '20%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  dateInput: {
    fontSize: 15
  },
  picSelectBtnContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minWidth: '90%',
    marginBottom: 10,
  },
  picSelectBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: '25%', 
    marginTop: 30,
    backgroundColor: 'white',
    borderColor: '#2a7cf7',
    borderWidth: 1,
    borderRadius: 30/2,
    marginTop: 10,
    marginLeft: 5
  },
  picSelectBtnText: {
    color: '#2a7cf7',
    fontWeight: 'bold',
  },
  imgPreviewContainer: {
    width: '90%',
    height: 100,
  },
  imgPreview: {
    borderColor: 'black',
    borderWidth: 1,
    width: 100,
    height: 100,
    overflow: 'hidden'
  }
})