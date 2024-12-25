import { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import envVars from '../config';
// import { LOCAL_HOST } from '@env';
import axios from 'axios';
// const axios = require('axios').default;
import { setInfo, userAuthenticationFunction } from '../redux/actions_&_reducers/userInfoSlice';
import InputField from '../components/InputField'
import { login, logout } from '../redux/actions_&_reducers/isLoginSlice'
// import { logout } from '../redux/actions_&_reducers/userInfoSlice';
// import { userInfo } from '../redux/actions_&_reducers/userInfoSlice';



export default function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null)
  const { info, message, auth } = useSelector(state => state.userInfo);
  const [refresh, setRefresh] = useState(false);
  const [msg, setMsg] = useState(message)
  // const [loginUserInfo, setLoginUserInfo] = useState(info);
  // const [authenticationMessage, setAuthenticationMessage] = useState(message);
  // console.log("SERVER_IP", envVars.Server_IP);
  const dispatch = useDispatch();
  
  
  /*****     A P I   Call     *****/
  
  //This function is used to get the user login after authentication
  const loginUser = async (obj) => {
    // dispatch(userAuthenticationFunction(obj))
    //   .then(()=>{
    //     setRefresh(!refresh);
    //   })
    //   .catch((e)=>{
    //     setRefresh(!refresh);
    //     dispatch(logout());
    //   });
    try {
      const response = await axios.post(`http://${envVars.Server_IP}:5000/api/users/authentication`, obj);
      dispatch(setInfo(response.data));
      dispatch(login());
      alert('User Authentication Successfull');
    }
    catch {
      alert('Fields are either MISSING or INCORRECT');
    }
  }

  /*****     A P I   Call  Ends     *****/

  
  return (
    <View style={styles.container}>
      <InputField
        placeholder='Enter Email'
        keyboardType='email-address'
        value={email}
        setValue={setEmail}
        // value={state.emailID} 
        // setValue={val => setState({...state, emailID: val})}
      />

      <InputField 
        placeholder='Enter Password'
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.btnLogin}
        onPress={() => loginUser({
          emailID: email,
          password: password
        })}
      >
        <Text style={styles.btnTextLogin}>LOGIN</Text>
      </TouchableOpacity>

      <Text style={styles.txtAboveSignupBtn}>Or create new account</Text>
      
      <TouchableOpacity
        style={styles.btnSignin}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.btnTextSignin}>SIGNUP</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      backgroundColor: '#EBECEC',
    },
    btnLogin: { 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: '75%', 
      marginTop: 10,
      backgroundColor: '#2a7cf7',
      borderRadius: 5
    },
    btnSignin: { 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      width: '75%', 
      marginTop: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      borderColor: 'black',
      borderWidth: 1
    },
    btnTextLogin: {
      marginVertical: 10,
      fontWeight: 'bold',
      fontSize: 15,
      color: 'white',
      letterSpacing: 2
    },
    btnTextSignin: {
      marginVertical: 10,
      fontWeight: 'bold',
      fontSize: 15,
      color: '#2a7cf7', 
      letterSpacing: 2
    },
    txtAboveSignupBtn: {
      paddingTop: 20, 
      color: 'grey'
    }
})