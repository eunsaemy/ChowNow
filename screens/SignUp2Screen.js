import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUp2Screen = () => {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState("Current location");

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
    reverseGeocode();
  }, []);

  const handleSkip = () => {
    let default_address = {streetNumber: "123",
      street: "Main St",
      city: "Vancouver",
      region: "BC",
      postalCode: "V2N 3K4"};

    updateDoc(doc(db, "Users", auth.currentUser.uid), {
      address: default_address,
    });

    navigation.replace("Home");
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

      <View style={styles.inputContainer}>
        <Text style={styles.heading3}>
          Allow location access for a better chowing experience
        </Text>
        <Text style={styles.bodyText}>
          Enabling location services will make it easier for you to find nearby
          restaurants and place orders for delivery or pickup.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {address === "Current location" ?
          (
            <Text style={styles.loading}>
              <ActivityIndicator size="large" />
            </Text>
          )
          :
          (
            <Text style={styles.loading}>
              {address.streetNumber} {address.street}, {address.city},{" "}
              {address.region} {address.postalCode}
            </Text>
          )
        }
        <TouchableOpacity
          onPress={reverseGeocode}
          style={[styles.button]}>
          <Text style={styles.buttonText}>Enable location services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSkip}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp2Screen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    margin: 20,
    marginBottom: 40,
    marginTop: 80,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain",
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F57C00",
    borderRadius: 12,
    padding: 16,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    borderColor: "#F57C00",
    borderWidth: 1,
    marginTop: 20,
  },
  buttonOutlineText: {
    color: "#F57C00",
    fontWeight: "700",
    fontSize: 16,
  },
  bodyText: {
    fontSize: 16,
    paddingBottom: 20,
    textAlign: "center",
  },
  heading3: {
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 12,
    textAlign: "center",
  },
  loading: {
    paddingBottom: 12,
  },
});
