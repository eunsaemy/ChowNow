import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
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

const SignUp1Screen = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const [phone, setPhone] = useState("");

  const navigation = useNavigation();

  const handlePhone = () => {
    let formatted_phone = phone.replace(/-/g, "");
    formatted_phone = formatted_phone.replace(" ", "");
    formatted_phone = formatted_phone.replace(".", "");
    formatted_phone = formatted_phone.replace("(", "");
    formatted_phone = formatted_phone.replace(")", "");
    formatted_phone = "+1" + formatted_phone;

    updateDoc(doc(db, "Users", auth.currentUser.uid), {
      phone: formatted_phone,
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
          { phone === "" ? 
            <TouchableOpacity
              style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          :
            <TouchableOpacity
              onPress={handlePhone}
              style={styles.button}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          }
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp1Screen;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    margin: 20,
    marginBottom: 40,
    marginTop: 80,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain",
  },
  inputContainer: {
    flex: 1,
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
    justifyContent: "center",
    marginTop: 40,
    width: "100%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#F57C00",
    borderRadius: 12,
    marginTop: 40,
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
});
