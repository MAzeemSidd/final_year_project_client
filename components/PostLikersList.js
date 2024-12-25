import React from 'react'
import { ScrollView } from 'react-native';
import {Text, Modal, Portal, List } from 'react-native-paper';
import { Avatar } from '@react-native-material/core';
import envVars from '../config'
import { useSelector } from 'react-redux';


const PostLikersList = ({list, setList, visibility, setVisibility}) => {
    const { textPrimaryColor, textSecondaryColor, primaryColor2, primaryColor, secondaryColor } = useSelector(state => state.themeColor)
    
    return (
        <Portal>
            <Modal visible={visibility}
                onDismiss={() => {
                    setVisibility(false)
                    setList([])
                }}
                contentContainerStyle={{backgroundColor: 'white', padding: 20, margin: 20, maxheight: '60%', height: '60%'}}
            >
            <ScrollView>
                <List.Subheader style={{paddingHorizontal: 0}}>
                <Text variant='titleMedium' style={{fontWeight: 'bold', color: `${textSecondaryColor}`, padding: 0}}>
                    Liked by
                </Text>
                </List.Subheader>
                {
                    list?.map(item => (
                        <List.Item
                            title={`${item.name}`}
                            titleStyle={{color: `${textPrimaryColor}`, fontSize: 18}}
                            left={() =>(
                                item?.profileImagePath ?
                                <Avatar image={{
                                    uri: `http://${envVars.Server_IP}:5000/${(item?.profileImagePath).replace(/\\/g, "/")}`
                                    }} style={{marginRight: 10}} size={36}
                                /> :
                                <Avatar label={`${item.name}`} autoColor size={36} />
                            )}
                            style={{borderBottomWidth: 0.5, paddingHorizontal: 5}}
                        />
                    ))
                }
            </ScrollView>
            </Modal>
        </Portal>
    )
}

export default PostLikersList