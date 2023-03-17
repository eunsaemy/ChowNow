import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [newPhone, setNewPhone] = useState("");

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

  const handleChangePhone = () => {
    updateDoc(doc(db, "Users", auth.currentUser.uid), {
      phone: newPhone,
    });

    alert("Phone number has been updated");
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      {!inputFocused && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/burger.png")}
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.bodyText}>Email: {auth.currentUser.email}</Text>
        <Text style={styles.bodyText}>Phone: {phone}</Text>
        <Text style={styles.bodyText}>Address: {address.streetNumber} {address.street}, {address.city}, {address.region} {address.postalCode}</Text>

        <TextInput
          placeholder="Change phone number"
          value={setNewPhone}
          onChangeText={(text) => setNewPhone(text)}
          style={[styles.input, styles.marginTopMedium]}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleChangePhone}
          style={styles.button}>
          <Text style={styles.buttonText}>Change phone number</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>

    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior="padding">
    //   {!inputFocused && (
    //     <View style={styles.imageContainer}>
    //       <Image
    //         style={styles.image}
    //         source={require("../assets/burger.png")}
    //       />
    //     </View>
    //   )}

    //   <View style={styles.buttonContainer}>
    //     <Text>Email: {auth.currentUser.email}</Text>
    //     <Text>Phone: {phone}</Text>
    //     <Text>Address: {address.streetNumber} {address.street}, {address.city}, {address.region} {address.postalCode}</Text>
    //     <TouchableOpacity
    //       onPress={handleSignOut}
    //       style={styles.button}>
    //       <Text style={styles.buttonText}>Sign Out</Text>
    //     </TouchableOpacity>
    //   </View>
    // </KeyboardAvoidingView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "space-between",
    margin: 20,
    marginBottom: 40,
    marginTop: 80,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain",
  },
  inputContainer: {
    flex: 1,
    marginTop: 40,
    width: "100%",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  buttonContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
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
  buttonOutline: {
    backgroundColor: "transparent",
    borderColor: "#F57C00",
    borderWidth: 1,
    marginTop: 20,
  },
  buttonOutlineText: {
    color: "#F57C00",
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
