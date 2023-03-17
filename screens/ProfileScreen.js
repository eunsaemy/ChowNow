import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const getAddress = async () => {
      const docRef = doc(db, "Users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      setAddress(docSnap.data().address);
    };

    const getPhone = async () => {
      const docRef = doc(db, "Users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      setPhone(docSnap.data().phone);
    };

    getAddress();
    getPhone();
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.buttonContainer}>
      <Text style={styles.bodyText}>Email: {auth.currentUser.email}</Text>
      <Text style={styles.bodyText}>Phone: {phone}</Text>
      { address === undefined
      ?
        <Text style={styles.bodyText}>
          <Text style={styles.bodyText}>Address: No current location</Text>
        </Text>
      :
        <Text style={styles.bodyText}>
          Address: {address.streetNumber} {address.street}, {address.city}, {address.region} {address.postalCode}
        </Text>
      }

      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
    margin: 20,
    marginBottom: 40,
    marginTop: 80,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F57C00",
    borderRadius: 12,
    padding: 16,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  bodyText: {
    fontSize: 16,
    paddingBottom: 20,
    textAlign: "center",
  },
  heading3: {
    fontSize: 24,
    fontWeight: "700",
    paddingBottom: 12,
    textAlign: "center",
  },
  marginTopMedium: {
    marginTop: 20,
  },
});
