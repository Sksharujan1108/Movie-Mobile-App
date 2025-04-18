import { Image, StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface SearchBarProps {
  placeholder: string
  value: string
  onChangeText: (text: string) => void
  onPress: () => void
}

const SearchBar = (props: SearchBarProps) => {
  const { placeholder, value, onChangeText, onPress } = props

  return (
    <View style={styles.container}>
      <Image
        source={icons.search}
        style={styles.icon}
        resizeMode="contain"
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'#a8b5db'}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onPressIn={onPress}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f0d23', // your dark-200
    padding: 15,
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#ab8bff',
    marginRight: 10, // this is the gap!
  },
  input: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
  },
})
