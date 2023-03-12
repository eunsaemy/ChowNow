import { TouchableOpacity, View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function HomeTitle() {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const getAddress = async () => {
      const docRef = doc(db, "Users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      setAddress(docSnap.data().address);
    };

    getAddress();
  }, []);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Text style={styles.captionText}>Your location</Text>
        <Image
          style={styles.dropdownImage}
          source={require("../assets/down-arrow-icon.png")}
        />
      </View>
      <Text style={styles.bodyText}>
        {address.streetNumber} {address.street}
      </Text>
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
