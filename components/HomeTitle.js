import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
      { address === undefined
      ?
        <Text style={styles.bodyText}>
          No current location
        </Text>
      :
        <Text style={styles.bodyText}>
          {address.streetNumber} {address.street}
        </Text>
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  dropdownContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
  },
  dropdownImage: {
    height: 16,
    width: 16,
  },
  bodyText: {
    color: "#212121",
    fontSize: 14,
  },
  captionText: {
    color: "#757575",
    fontSize: 12,
  },
});
