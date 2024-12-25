import axios from 'axios';
import { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { TextInput, Text, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import envVars from '../config'
import { setInfo } from '../redux/actions_&_reducers/userInfoSlice';

const UpdateUserInfo = () => {
    const { textSecondaryColor, secondaryColor, primaryColor2, primaryColor } = useSelector(state => state.themeColor)
    const [formData, setFormData] = useState({});
    const { info } = useSelector(state => state.userInfo);

    useEffect(() => {
        const initialValues = {
            name: info.name,
            emailID: info.emailID,
            password: info.password,
            day: info.dob.day,
            month: info.dob.month,
            year: info.dob.year,
            education: info.education,
            maritalStatus: info.maritalStatus,
        };
        setFormData(initialValues);
      }, []);
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        try {
            const data = {
                _id: info._id,
                name: formData.name,
                emailID: formData.emailID,
                password: formData.password,
                dob:{
                    day: formData.day,
                    month: formData.month,
                    year: formData.year,
                },
                education: formData.education,
                maritalStatus: formData.maritalStatus,
            }
            console.log("FORMDATA", data);
            const res = await axios.patch(`http://${envVars.Server_IP}:5000/api/user/update-user`, data)
            if(res) {
                alert('Info Updated');
                dispatch(setInfo(res.data));
            }
        } catch (error) {
            alert(error.message);
        }
    };

  return (
    <ScrollView>
        <View style={{display: 'flex', flexDirection: 'column', marginHorizontal: 10}}>
            <Text variant="headlineSmall" style={{color:`${textSecondaryColor}`}}>Update Form</Text>
            <TextInput mode='outlined' label="Name" value={formData.name} style={{marginVertical: 5}}
                onChangeText={value => setFormData({...formData, name: value})}
            />
            <TextInput mode='outlined' label="EmailID" value={formData.emailID} style={{marginVertical: 5}}
                onChangeText={value => setFormData({...formData, emailID: value})}
            />
            <TextInput mode='outlined' label="Password" value={formData.password} style={{marginVertical: 5}}
                onChangeText={value => setFormData({...formData, password: value})}
            />
            <Text variant="titleMedium" style={{color:`${textSecondaryColor}`}}>Date</Text>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <TextInput mode='outlined' label="Day" value={formData.day} style={{marginVertical: 5, width: '25%'}}
                    onChangeText={value => setFormData({...formData, day: value})}
                />
                <TextInput mode='outlined' label="Month" value={formData.month} style={{marginVertical: 5, width: '25%'}}
                    onChangeText={value => setFormData({...formData, month: value})}
                />
                <TextInput mode='outlined' label="Year" value={formData.year} style={{marginVertical: 5, width: '25%'}}
                    onChangeText={value => setFormData({...formData, year: value})}
                />
            </View>
            <TextInput mode='outlined' label="EmailID" value={formData.education} style={{marginVertical: 5}}
                onChangeText={value => setFormData({...formData, education: value})}
            />
            <TextInput mode='outlined' label="Password" value={formData.maritalStatus} style={{marginVertical: 5}}
                onChangeText={value => setFormData({...formData, maritalStatus: value})}
            />
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginVertical: 5}}>
                <Button mode="contained" buttonColor={secondaryColor} textColor={primaryColor}
                    onPress={handleSubmit}>Submit</Button>
            </View>
        </View>
    </ScrollView>
  )
}

export default UpdateUserInfo