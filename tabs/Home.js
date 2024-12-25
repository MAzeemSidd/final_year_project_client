import { useState, useEffect } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Provider } from 'react-native-paper';
import { fetchingOtherUsersPosts } from './../redux/actions_&_reducers/fetchingOtherUsersPostsSlice'
import PostCard from '../components/PostCard';
import PostLikersList from '../components/PostLikersList';


export default function Home({navigation}) {
  const { textPrimaryColor, textSecondaryColor, primaryColor2, primaryColor, secondaryColor } = useSelector(state => state.themeColor)
  const { info } = useSelector(state => state.userInfo)
  const { otherUsersPosts } = useSelector(state => state.fetchingOtherUsersPosts)
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchingOtherUsersPosts({_id: info._id}));
  }, [])

  //Likes Related
  const [likersListVisibility, setLikersListVisibility] = useState(false);
  const [listOfLikers, setListOfLikers] = useState([]);
  const openLikedByModal = (openCondition, data) => {
    setLikersListVisibility(openCondition)
    setListOfLikers(data);
  }
  
  
  return (
    <Provider>
    <Container primaryColor2={primaryColor2}>
      
      <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 5}}>
        <Button mode='elevated' onPress={()=>navigation.navigate('CreatePost')}>
          Creat Post
        </Button>
      </View>

      <ScrollView>
        <View style={{marginTop: 10, marginBottom: 15, display: 'flex', flexDirection: 'column', alignItems: 'stretch',
          justifyContent: 'space-around', marginRight: -30, marginLeft: 5}}>
          {
            (otherUsersPosts !== []) && 
            // <FlatList
            //   data={otherUsersPosts}
            //   renderItem={({item}) => <PostCard item={item} openLikedByModal={openLikedByModal} />}
            //   keyExtractor={item => item._id}
            //   style={{paddingTop: 10, paddingBottom: 40, marginBottom: 20}}
            // />
            otherUsersPosts.map(item => <PostCard key={item._id} item={item} openLikedByModal={openLikedByModal} />)
          }
        </View>
      </ScrollView>
      <PostLikersList list={listOfLikers} setList={setListOfLikers}
        visibility={likersListVisibility} setVisibility={setLikersListVisibility}
      />

      {/* <Ionicons
        name='md-home-outline'
        size={100} 
        color={textPrimaryColor}
        />
      <Label textPrimaryColor={textPrimaryColor}>This is Home tab</Label> */}
    </Container>
    </Provider>
  );
}



const Container = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${props => props.primaryColor2};
  align-items: stretch;
  justify-content: flex-start;
  padding: 5px;
`;

const Label = styled.Text`
  color: ${props => props.textPrimaryColor};
`;