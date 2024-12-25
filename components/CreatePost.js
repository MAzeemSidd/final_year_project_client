import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';

export default CreatePost = () => {
    const [postFormVisible, setPostFormVisible] = useState(false);

    const [postTextContent, setPostTextContent] = useState('');
    const [postData, setPostData] = useState(null);

  return (
    <View>
        {
            !postFormVisible ? 
            (<View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button mode='elevated' onPress={()=>setPostFormVisible(true)}>
                Creat Post
            </Button>
            </View>)
            :
            (<Card>
                <TextInput
                style={{height: 100, padding: 5, margin: 0, backgroundColor: '#e4eaf2', color: '#525559', borderWidth: 2,
                borderColor: 'lightgrey', borderTopWidth: 0, borderRightWidth: 0, borderLeftWidth: 0, fontSize: 20,
                fontFamily: 'sans-serif', textAlign: 'justify'}}
                multiline
                editable
                numberOfLines={4}
                placeholder='Whats in your mind'
                placeholderTextColor='grey'
                onChange={setPostTextContent}
                />
            <Card.Actions>
                <Button mode="outlined" buttonColor='#ffffff' onPress={()=>setPostFormVisible(false)}>Cencel</Button>
                <Button mode="contained" buttonColor='#145792' onPress={setPostData(postTextContent)}>POST</Button>
            </Card.Actions>
            </Card>)
        }
    </View>
  )
}