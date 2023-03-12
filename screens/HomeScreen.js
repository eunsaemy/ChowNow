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
        <View style={styles.bottomNavButton}>
          <Image
            style={styles.bottomNavButtonImage}
            source={require("../assets/home-active-48.png")}
          />
          <Text>Home</Text>
        </View>

        <View style={styles.bottomNavButton}>
          <Image
            style={styles.bottomNavButtonImage}
            source={require("../assets/browse-inactive-48.png")}
          />
          <Text>Browse</Text>
        </View>

        <View style={styles.bottomNavButton}>
          <Image
            style={styles.bottomNavButtonImage}
            source={require("../assets/cart-inactive-48.png")}
          />
          <Text>Cart</Text>
        </View>

        <View style={styles.bottomNavButton}>
          <Image
            style={styles.bottomNavButtonImage}
            source={require("../assets/profile-inactive-48.png")}
          />
          <Text>Profile</Text>
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
    paddingTop: 8,
    paddingBottom: 8,
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
    width: 32,
    height: 32,
  },
});
