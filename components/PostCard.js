import { useState, useEffect, useCallback } from 'react'
import { TouchableOpacity, Image, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Avatar, Button } from '@react-native-material/core';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import envVars from './../config';
import { fetchingOtherUsersPosts } from '../redux/actions_&_reducers/fetchingOtherUsersPostsSlice';
import { fetchingSingleUserPosts } from '../redux/actions_&_reducers/fetchingSingleUserPosts';

const PostCard = ({item, userTimeline, openLikedByModal}) => {
  const { textPrimaryColor, textSecondaryColor, primaryColor2, primaryColor, secondaryColor } = useSelector(state => state.themeColor)
  const { info } = useSelector(state => state.userInfo)
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  
  // console.log('ITEM', {...item, userID: info._id, posterID: item.user._id, likedBy: [], comments: []})
  useEffect(() => {
    item?.likedBy?.filter(item => item._id == info._id).length == 0 ? setLiked(false) : setLiked(true)
  }, [onLike])
  // useEffect(() => {
  //   (item?.user._id == info._id) ? setShared(true) : setShared(false);
  //   (item?.poster !== undefined) ? setShared(false) : setShared(true);
  // }, [onShare])
  

  const dispatch = useDispatch();
  const apiCallForLike = async () => {
    try {
      const res = await axios.patch(`http://${envVars.Server_IP}:5000/api/post/handle-like-post`,
        {
          postID: item._id,
          likedBy: {
              _id: info._id,
              name: info.name,
              profileImagePath: info.profileImagePath,
          }
        }
      );
      console.log('RESPONSE', res.data);
      if(res) {
        setLiked(!liked);
        await dispatch(fetchingOtherUsersPosts({_id: info._id}));
        await dispatch(fetchingSingleUserPosts({_id: info._id}));
      }

    } catch (error) {
      console.log('LIKE ERROR',error);
    }
  }

  const apiCallForShare = async () => {
    const post = {...item, userID: info._id, posterID: item.user._id, likedBy: [], comments: []};
    delete post._id
    delete post.user;
    (post.poster !== undefined) && (delete post.poster);
    console.log('ITEM', post)
    try {
      const res = await axios.post(`http://${envVars.Server_IP}:5000/api/post/share-others-post`, post);
      res && setShared(!shared);
    } catch (error) {
      console.log('SHARE ERROR', error)
    }
  }

  const onLike = () => {
    apiCallForLike();
  }

  const onShare = () => {
    apiCallForShare();
  }

2
  return (
    <>
    {
      item?.poster === undefined ?
      <Card style={{backgroundColor: `${primaryColor}`, width: '90%', marginVertical: 5}}>
        <Card.Content style={{ marginTop: 5, marginBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {
            item?.user?.profileImagePath ?
            <Avatar image={{ uri: `http://${envVars.Server_IP}:5000/${(item?.user?.profileImagePath).replace(/\\/g, "/")}` }}
              size={50} style={{marginRight: 10}} />
            :
            <Avatar label={`${item.user.name}`} autoColor size={50} style={{marginRight: 10}} />
          }
          <Text variant="titleLarge" style={{color: `${textPrimaryColor}`}}>{item.user.name}</Text>
        </Card.Content>
        <Card.Content style={{marginTop: 10, marginBottom: 10}}>
          <Text variant="bodyLarge" style={{textAlign: 'justify'}}>{item.content.text}</Text>
          {
            item?.content?.imagePath &&
            <View style={{marginHorizontal: 0, marginTop: 10, marginBottom: 5}}>
              <Image source={{ uri: `http://${envVars.Server_IP}:5000/${(item?.content?.imagePath).replace(/\\/g, "/")}` }}
                onLoad={(event) => {
                  const { width, height } = event.nativeEvent.source;
                  setImageSize({ width, height });
                }}
                style={{width: undefined, height: undefined, aspectRatio: (imageSize.width && imageSize.height) && imageSize.width / imageSize.height}}
              />
            </View>
          }
        </Card.Content>
        <Card.Actions style={{flexDirection: 'column', alignItems: 'stretch'}}>
            <TouchableOpacity onPress={() => openLikedByModal(true, item.likedBy)}>
              <Text variant="labelMedium" style={{color: 'grey', fontWeight: 'bold'}}>{`${item.likedBy.length} Likes`}</Text>
            </TouchableOpacity>
        </Card.Actions>
        <Card.Actions>
          <Button variant={!liked ? 'outlined' : 'contained'} title="Like" color={secondaryColor}
            style={{flex: 1, borderRadius: 25}} onPress={onLike} />
          <Button variant={!shared ? 'outlined' : 'contained'} title="Share" color={textPrimaryColor}
            style={{flex: 1, borderRadius: 25}} onPress={onShare} />
        </Card.Actions>
      </Card>
      :
      <Card style={{backgroundColor: `${primaryColor}`, width: '90%', marginVertical: 5}}>
        <Card.Content style={{ marginTop: 5, marginBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          {
            item?.user?.profileImagePath ?
            <Avatar image={{ uri: `http://${envVars.Server_IP}:5000/${(item?.user?.profileImagePath).replace(/\\/g, "/")}` }}
              size={50} style={{marginRight: 10}} />
            :
            <Avatar label={`${item.user.name}`} autoColor size={50} style={{marginRight: 10}} />
          }
          <Text variant="titleLarge" style={{color: `${textPrimaryColor}`}}>{item.user.name}</Text>
        </Card.Content>
        <Card.Content>
          <Card style={{backgroundColor: `${primaryColor}`, width: '100%', marginVertical: 5}}>
            <Card.Content style={{ marginTop: 5, marginBottom: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              {
                item?.poster?.profileImagePath ?
                <Avatar image={{ uri: `http://${envVars.Server_IP}:5000/${(item?.poster?.profileImagePath).replace(/\\/g, "/")}` }}
                  size={40} style={{marginRight: 10}} />
                :
                <Avatar label={`${item?.poster?.name}`} autoColor size={40} style={{marginRight: 10}} />
              }
              <Text variant="titleLarge" style={{color: `${textPrimaryColor}`}}>{item?.poster?.name}</Text>
            </Card.Content>
            <Card.Content style={{marginTop: 10, marginBottom: 10}}>
              <Text variant="bodyLarge" style={{textAlign: 'justify'}}>{item.content.text}</Text>
              {
                item?.content?.imagePath &&
                <View style={{marginHorizontal: 0, marginTop: 10, marginBottom: 5}}>
                  <Image source={{ uri: `http://${envVars.Server_IP}:5000/${(item?.content?.imagePath).replace(/\\/g, "/")}` }}
                    onLoad={(event) => {
                      const { width, height } = event.nativeEvent.source;
                      setImageSize({ width, height });
                    }}
                    style={{width: undefined, height: undefined, aspectRatio: (imageSize.width && imageSize.height) && imageSize.width / imageSize.height}}
                  />
                </View>
              }
            </Card.Content>
          </Card>
        </Card.Content>
        <Card.Actions style={{flexDirection: 'column', alignItems: 'stretch'}}>
            <TouchableOpacity onPress={() => openLikedByModal(true, item.likedBy)}>
              <Text variant="labelMedium" style={{color: 'grey', fontWeight: 'bold'}}>{`${item.likedBy.length} Likes`}</Text>
            </TouchableOpacity>
        </Card.Actions>
        <Card.Actions>
          <Button variant={!liked ? 'outlined' : 'contained'} title="Like" color={secondaryColor}
            style={{flex: 1, borderRadius: 25}} onPress={onLike} />
          <Button variant={!shared ? 'outlined' : 'contained'} title="Share" color={textPrimaryColor}
            style={{flex: 1, borderRadius: 25}} onPress={onShare} />
        </Card.Actions>
      </Card>
    }
    </>
  )
}

export default PostCard