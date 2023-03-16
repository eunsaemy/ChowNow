import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MenuItem() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading5}>Mushroom Swiss Burger</Text>
        <Text style={styles.heading6}>$15.99</Text>
        <Text style={styles.bodyText}>
          A savory burger topped with sautéed m…
        </Text>
      </View>

      <Image
        style={styles.containerImage}
        source={require("../assets/burger-img.png")}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  containerImage: {
    borderRadius: 8,
    height: 52,
    width: 52,
  },
  heading5: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  heading6: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  bodyText: {
    color: "#757575",
    fontSize: 14,
  },
});
