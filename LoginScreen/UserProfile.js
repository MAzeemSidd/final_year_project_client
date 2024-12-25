import styled from 'styled-components/native';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import UserInfoCard from '../components/UserInfoCard';
import { fetchingSingleUserPosts } from '../redux/actions_&_reducers/fetchingSingleUserPosts';
import PostCard from '../components/PostCard';
import { Provider } from 'react-native-paper';
import PostLikersList from '../components/PostLikersList';



export default function UserProfile() {
  const { textPrimaryColor, textSecondaryColor, primaryColor, primaryColor2 } = useSelector(state => state.themeColor)
  const { info } = useSelector(state => state.userInfo);
  const { singleUserPosts } = useSelector(state => state.fetchingSingleUserPosts)

  const [userDataState, setUserDataState] = useState(null)
  useEffect(() => {
    setUserDataState(info);
  }, [info])
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchingSingleUserPosts({_id: info._id}));
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
      <ScrollView>
        <Container primaryColor2={primaryColor2}>
            <UserInfoCard userDataState={userDataState} />
            {/* <View style={{marginTop: 10, marginBottom: 25}}>
              <FlatList
                data={singleUserPosts}
                renderItem={({item}) => <PostCard item={item} user={info} />}
                keyExtractor={item => item._id}
                style={{paddingTop: 10, paddingBottom: 10, marginBottom: 20}}
              />
            </View> */}
            <View style={{marginVertical: 25, width: '105%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              {
                singleUserPosts.map(item =>
                  <PostCard key={item._id} item={item} userTimeline={true} openLikedByModal={openLikedByModal} />)
              }
            </View>
            <PostLikersList list={listOfLikers} setList={setListOfLikers}
              visibility={likersListVisibility} setVisibility={setLikersListVisibility}
            />
        </Container>
      </ScrollView>
    </Provider>
  );
}



const Container = styled.View`
  flex: 1;
  background-color: ${props => props.primaryColor2};
  align-items: center;
  justify-content: flex-start;
`;

const Label = styled.Text`
  color: ${props => props.textPrimaryColor};
`;

const UserNameWrapper = styled.View`
  margin: 20px 15px;
  padding: 20px 5px;
  border-bottom-width: 2;
  border-color: ${props => props.textPrimaryColor};
`;

const UserName = styled.Text`
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: 35;
  text-align: center;
  font-family: serif;
  color: ${props => props.textPrimaryColor};
`;

const OtherInfoWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin: 3px;
  padding: 0px;
  background-color: ${props => props.primaryColor};
  min-width: 95%;
  border-radius: 10;
`;

const InfoLabel =styled.Text`
  font-size: 15;
  font-family: serif;
  padding: 5px 10px;
  border-width: 2;
  border-color: ${props => props.colors.primaryColor};
  color: ${props => props.colors.textPrimaryColor};
  background-color: ${props => props.colors.primaryColor2};
  border-radius: 10;
`;

const Info = styled.Text`
  font-size: 15;
  font-family: sans-serif;
  padding: 5px 10px;
  color: ${props => props.textSecondaryColor};
`;