import { 
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function RestaurantCard() {
  const navigation = useNavigation();

  const cardClicked = () => {
    navigation.replace("Restaurant");
  };

  return (
    <TouchableOpacity
      onPress={cardClicked}
      style={styles.restaurantCard}>
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
    borderRadius: 12,
    height: 200,
    marginBottom: 8,
    overflow: "hidden",
    width: "100%",
  },
  restaurantCard: {
    marginBottom: 20,
  },
  restaurantImageContainer: {
  },
  starRatingContainer: {
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "#21212175",
    borderRadius: 20,
    display: "flex",
    gap: 4,
    flexDirection: "row",
    margin: 8,
    overflow: "hidden",
    padding: 8,
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
    color: "#757575",
    fontSize: 14,
  },
});
