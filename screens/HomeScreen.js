import React from "react";
import { auth } from "../firebase";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
        <Text style={styles.largeText}>Hello hello</Text>
      </ScrollView>

      <View style={styles.bottomNavContainer}>
        <TouchableOpacity style={styles.bottomNavButton}>
          <Image
            style={styles.bottomNavButtonImage}
            source={require("../assets/home-active-48.png")}
          />
          <Text style={styles.bottomNavTextActive}>Home</Text>
        </TouchableOpacity>

        <View style={styles.bottomNavButton}>
          <Image
            style={styles.bottomNavButtonImage}
            source={require("../assets/browse-inactive-48.png")}
          />
          <Text style={styles.bottomNavTextInactive}>Browse</Text>
        </View>

        <View style={styles.bottomNavButton}>
          <Image
            style={styles.bottomNavButtonImage}
            source={require("../assets/cart-inactive-48.png")}
          />
          <Text style={styles.bottomNavTextInactive}>Cart</Text>
        </View>

        <View style={styles.bottomNavButton}>
          <Image
            style={styles.bottomNavButtonImage}
            source={require("../assets/profile-inactive-48.png")}
          />
          <Text style={styles.bottomNavTextInactive}>Profile</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 80,
  },
  scrollContainer: {
    width: "100%",
  },
  bottomNavContainer: {
    width: "100%",
    paddingLeft: 40,
    paddingRight: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 5,
    borderColor: "#EEEEEE",
    borderTopWidth: 1.25,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  largeText: {
    fontSize: 32,
  },
  bottomNavButton: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    alignItems: "center",
  },
  bottomNavButtonImage: {
    width: 30,
    height: 30,
  },
  bottomNavTextInactive: {
    color: "#757575",
    fontWeight: 400,
  },
  bottomNavTextActive: {
    color: "#F57C00",
    fontWeight: 600,
  },
});
