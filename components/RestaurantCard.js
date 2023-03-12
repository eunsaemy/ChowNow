import { ImageBackground, View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

export default function RestaurantCard() {
  return (
    <TouchableOpacity style={styles.restaurantCard}>
      <View style={styles.restaurantImageContainer}>
        <ImageBackground
          style={styles.restaurantImage}
          source={require("../assets/burger-img.png")}
          resizeMode="cover">
          <View style={styles.starRatingContainer}>
            <Text style={styles.starRating}>3.6</Text>
            <Image
              style={styles.starRatingIcon}
              source={require("../assets/star-icon.png")}></Image>
          </View>
        </ImageBackground>
      </View>
      <Text style={styles.bodyText}>Burger Bungalow</Text>
      <Text style={styles.captionText}>$2.99 delivery fee • 25—50 minutes</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  restaurantImage: {
    height: 200,
    width: "100%",
    overflow: "hidden",
    borderRadius: 12,
    marginBottom: 8,
  },
  restaurantCard: { marginBottom: 20 },
  restaurantImageContainer: {},
  starRatingContainer: {
    display: "flex",
    gap: 4,
    flexDirection: "row",
    padding: 8,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#21212175",
    alignSelf: "flex-end",
    margin: 8,
    alignItems: "center",
  },
  starRating: {
    color: "white",
  },
  starRatingIcon: {
    height: 12,
    width: 12,
  },
  bodyText: {
    color: "#212121",
    fontSize: 16,
    paddingBottom: 4,
  },
  captionText: {
    fontSize: 14,
    color: "#757575",
  },
});
