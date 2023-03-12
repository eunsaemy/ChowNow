import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUp1Screen = () => {
  const [phone, setPhone] = useState("");

  const [inputFocused, setInputFocused] = useState(false);

  const navigation = useNavigation();

  const handlePhone = () => {
    updateDoc(doc(db, "Users", auth.currentUser.uid), {
      phone: phone,
    });
    navigation.replace("SignUp2");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      {!inputFocused && (
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("../assets/toast.png")}
          />
        </View>
      )}

      <View style={styles.inputContainer}>
        <Text style={styles.heading3}>
          Enter your phone number for a better chowing experience
        </Text>
        <Text style={styles.bodyText}>
          We'll use it to send you updates and make the delivery process as
          seamless as possible.
        </Text>

        <TextInput
          placeholder="Phone number"
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.input}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handlePhone}
            style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp1Screen;

const styles = StyleSheet.create({
  imageContainer: { flex: 1, marginBottom: 20 },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  container: {
    marginTop: 80,
    margin: 20,
    display: "flex",
    flex: 1,
    marginBottom: 40,
    // justifyContent: "space-between",
  },
  inputContainer: {
    width: "100%",
    flex: 1,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    fontSize: 16,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    flex: 1,
  },
  button: {
    backgroundColor: "#F57C00",
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 40,
    fontFamily: "Karla_600SemiBold",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "Karla_600SemiBold",
  },
  heading3: {
    fontWeight: "700",
    fontSize: 24,
    paddingBottom: 12,
    textAlign: "center",
    fontFamily: "Karla_700Bold",
  },
  bodyText: {
    textAlign: "center",
    fontSize: 16,
    paddingBottom: 20,
    fontFamily: "Karla_400Regular",
  },
});
