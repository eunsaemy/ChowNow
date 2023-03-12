import { TouchableOpacity, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";

export default function HomeTitle() {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.captionText}>Your location</Text>
        <Image
          style={styles.dropdownImage}
          source={require("../assets/down-arrow-icon.png")}
        />
      </View>
      <Text style={styles.bodyText}>3453 University Drive</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdownContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownImage: { width: 16, height: 16 },
  bodyText: {
    fontSize: 14,
    color: "#212121",
  },
  captionText: {
    fontSize: 12,
    color: "#757575",
  },
});
