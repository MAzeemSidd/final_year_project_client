import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'

export default function SubmitButton({onPress}) {
  return (
    <View style={styles.container}>
      <Button title='Login' onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3b71f3',
    width: '90%',
    padding: 7,
    marginVertical: 10,
    alignItems: 'center',
    borderRadius: 10
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
    letterSpacing: 3
  }
})