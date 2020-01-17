import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import * as Location from 'expo-location'

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
})

const useMain = function() {
  const [currentRegion, setCurrentRegion] = useState(null)

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
        latitudeDelta: 0.4,
        longitudeDelta: 0.4,
      })
    }

    tryGetRegion()
  }, [])

  return {
    currentRegion,
  }
}

function Main() {
  const main = useMain()

  if (!main.currentRegion) {
    return null
  }

  return <MapView region={main.currentRegion} style={styles.map} />
}

export default Main
