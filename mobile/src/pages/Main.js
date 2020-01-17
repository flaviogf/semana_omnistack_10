import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import api from '../services/api'

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  callout: {
    width: 280,
  },
  userAvatar: {
    borderColor: '#fff',
    borderWidth: 4,
    borderRadius: 4,
    height: 56,
    width: 56,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userTechs: {
    color: '#999',
    fontSize: 12,
  },
  userBio: {
    fontSize: 16,
  },
})

const useMain = function() {
  const [currentRegion, setCurrentRegion] = useState(null)
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function tryGetRegion() {
      const permission = await Location.requestPermissionsAsync()

      if (!permission.granted) {
        return
      }

      const position = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = position.coords

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      })
    }

    tryGetRegion()
  }, [])

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await api.get('/user')
        setUsers(response.data)
      } catch (e) {
        console.log(e)
      }
    }

    loadUsers()
  }, [])

  return {
    currentRegion,
    users,
  }
}

function Main({ navigation }) {
  const main = useMain()

  if (!main.currentRegion) {
    return null
  }

  return (
    <MapView region={main.currentRegion} style={styles.map}>
      <Marker
        coordinate={{
          longitude: -47.4196327,
          latitude: -20.5434353,
        }}
      >
        <Image
          source={{
            uri: 'https://avatars2.githubusercontent.com/u/17479978?v=4',
          }}
          style={styles.userAvatar}
        />

        <Callout
          onPress={() =>
            navigation.navigate('Profile', { username: 'flaviogf' })
          }
        >
          <View style={styles.callout}>
            <Text style={styles.userName}>Flavio</Text>
            <Text style={styles.userTechs}>NodeJS, React JS, React Native</Text>
            <Text style={styles.userBio}>Developer at smn.</Text>
          </View>
        </Callout>
      </Marker>
    </MapView>
  )
}

export default Main
