import React from 'react'
import { StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
})

function Profile({ navigation }) {
  const username = navigation.getParam('username')

  return (
    <WebView
      style={styles.webView}
      source={{ uri: `https://github.com/${username}` }}
    />
  )
}

export default Profile
