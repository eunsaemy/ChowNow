import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
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
    alignItems: "center",
    flex: 1,
    padding: 20,
    paddingBottom: 0,
  },
  scrollContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  bottomNavContainer: {
    borderColor: "#EEEEEE",
    borderTopWidth: 1.25,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 5,
    width: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0782F9",
    borderRadius: 10,
    marginTop: 40,
    padding: 15,
    width: "60%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  largeText: {
    fontSize: 32,
  },
  bottomNavButton: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  bottomNavButtonImage: {
    height: 30,
    width: 30,
  },
  bottomNavTextInactive: {
    color: "#757575",
    fontWeight: "400",
  },
  bottomNavTextActive: {
    color: "#F57C00",
    fontWeight: "600",
  },
});
