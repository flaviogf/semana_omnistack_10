import React, { useEffect, useMemo, useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import { MaterialIcons } from '@expo/vector-icons'
import * as Location from 'expo-location'

import api from '../services/api'
import createSocket from '../services/socket'

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
  searchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    left: 0,
    justifyContent: 'space-between',
    position: 'absolute',
    padding: 16,
    right: 0,
    top: 0,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 4,
    elevation: 2,
    flex: 1,
    height: 54,
    marginRight: 4,
    paddingHorizontal: 16,
  },
  searchButton: {
    backgroundColor: '#7d40e7',
    elevation: 2,
    alignItems: 'center',
    borderRadius: 50,
    justifyContent: 'center',
    height: 54,
    width: 54,
  },
})

const useMain = function() {
  const socket = useMemo(() => createSocket())
  const [currentRegion, setCurrentRegion] = useState(null)
  const [techs, setTechs] = useState('')
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
      const response = await api.get('/user')
      setUsers(response.data)
    }

    loadUsers()
  }, [])

  async function searchUsers() {
    const { latitude, longitude } = currentRegion

    const response = await api.get('search', {
      params: {
        latitude,
        longitude,
        techs,
      },
    })

    setUsers(response.data)

    socket.connect({ latitude, longitude, techs })

    socket.subscribe({
      callback: (user) => {
        console.log(`${user.name} has been added`)

        setUsers((users) => [...users, user])
      },
      event: 'new-dev',
    })
  }

  return {
    currentRegion,
    users,
    techs,
    setTechs,
    searchUsers,
  }
}

function Main({ navigation }) {
  const main = useMain()

  if (!main.currentRegion) {
    return null
  }

  return (
    <>
      <MapView region={main.currentRegion} style={styles.map}>
        {main.users.map((it) => (
          <Marker
            key={it._id}
            coordinate={{
              longitude: it.location.coordinates[0],
              latitude: it.location.coordinates[1],
            }}
          >
            <Image source={{ uri: it.avatar_url }} style={styles.userAvatar} />

            <Callout
              onPress={() =>
                navigation.navigate('Profile', { username: it.username })
              }
            >
              <View style={styles.callout}>
                <Text style={styles.userName}>{it.name}</Text>
                <Text style={styles.userTechs}>{it.techs.join(',')}</Text>
                <Text style={styles.userBio}>{it.bio}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by techs ..."
          onChangeText={main.setTechs}
          style={styles.searchInput}
          value={main.techs}
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={main.searchUsers}
        >
          <MaterialIcons name="my-location" color="#fff" size={20} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Main
