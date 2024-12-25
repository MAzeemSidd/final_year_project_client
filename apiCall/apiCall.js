import { useDispatch } from 'react-redux';
import envVars from '../config';
import axios from 'axios';

import { setInfo } from '../redux/actions_&_reducers/userInfoSlice';
import { login } from '../redux/actions_&_reducers/isLoginSlice'

const dispatch = useDispatch();

//Call for Login User
export const loginUser = async (obj) => {
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