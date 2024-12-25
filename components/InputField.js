import { StyleSheet, View, TextInput } from 'react-native'
import React from 'react'

export default function InputField({ value, setValue, placeholder, secureTextEntry, keyboardType }) {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={styles.inputText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '90%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 5,
    },
    inputText: {
        fontSize: 15,
    }
})