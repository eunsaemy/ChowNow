import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { StatusBar } from "expo-status-bar";
import { Image } from "react-native";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUp2Screen = () => {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState("Current Address");

  const navigation = useNavigation();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, []);

  const handleDone = () => {
    navigation.replace("HomeScreen");
  };

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded Address:", geocodedLocation);
  };

  const reverseGeocode = async () => {
    try {
      const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      });
      let address = reverseGeocodeAddress[0];
      setAddress(address);

      updateDoc(doc(db, "Users", auth.currentUser.uid), {
        address: address,
      });
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/pizza.png")}
        />
      </View>

      <View>
        <Text style={styles.heading3}>
          Allow location access for a better chowing experience
        </Text>
        <Text style={styles.bodyText}>
          Enabling location services will make it easier for you to find nearby
          restaurants and place orders for delivery or pickup.
        </Text>

        {address === "Current Address" ? (
          <Text>
            <ActivityIndicator size="large" />
          </Text>
        ) : (
          <Text>
            {address.streetNumber} {address.street}, {address.city},{" "}
            {address.region} {address.postalCode}
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={reverseGeocode}
          style={[styles.button, styles.buttonPrimary]}>
          <Text style={styles.buttonText}>Enable location services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDone}
          style={[styles.buttonOutline, styles.button, styles.marginTopMedium]}>
          <Text style={styles.buttonOutlineText}>Continue</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

export default SignUp2Screen;

const styles = StyleSheet.create({
  imageContainer: { flex: 1, marginBottom: 20 },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  buttonPrimary: {
    backgroundColor: "#F57C00",
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    marginTop: 20,
    borderColor: "#F57C00",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  marginTopMedium: {
    marginTop: 20,
  },
  buttonOutlineText: {
    color: "#F57C00",
    fontWeight: "700",
    fontSize: 16,
  },
  container: {
    margin: 20,
    display: "flex",
    marginTop: 80,
    flex: 1,
    marginBottom: 40,
    justifyContent: "space-between",
  },
  heading3: {
    fontWeight: 500,
    fontSize: 24,
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 16,
  },
});
