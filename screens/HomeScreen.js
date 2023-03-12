import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import RestaurantCard from "../components/RestaurantCard";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{
          rowGap: 0,
        }}>
        <RestaurantCard></RestaurantCard>
        <RestaurantCard></RestaurantCard>
        <RestaurantCard></RestaurantCard>
        <RestaurantCard></RestaurantCard>
        <RestaurantCard></RestaurantCard>
        <RestaurantCard></RestaurantCard>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 0,
    flex: 1,
    alignItems: "center",
  },
  scrollContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
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
