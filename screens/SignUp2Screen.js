import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { StatusBar } from 'expo-status-bar'
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const SignUp2Screen = () => {
  const [location, setLocation] = useState()
  const [address, setAddress] = useState("Current Address")

  const navigation = useNavigation()

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Please grant location permissions")
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, [])

  const handleDone = () => {
    navigation.replace("Home")
  }

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address)
    console.log("Geocoded Address:", geocodedLocation)
  }

  const reverseGeocode = async () => {
    try {
      const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude
      })
      let address = reverseGeocodeAddress[0]
      setAddress(address)
  
      updateDoc(doc(db, "Users", auth.currentUser.uid), {
        address: address
      })
    } catch (error) {
    }
  }

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
      <View style={styles.container}>
        {address === "Current Address"
          ? 
          <Text>
            <ActivityIndicator size="large" />
          </Text>
          :
          <Text>{address.streetNumber} {address.street}, {address.city}, {address.region} {address.postalCode}</Text>
        }
        <TouchableOpacity
          onPress={reverseGeocode}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Current Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDone}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUp2Screen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColzontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
