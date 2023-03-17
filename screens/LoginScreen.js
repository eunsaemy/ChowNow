import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
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

const LoginScreen = () => {
  const [inputFocused, setInputFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigation.replace("Profile");
      })
      .catch((error) => alert(error.message));
  };

  const handleSignUp = () => {
    navigation.replace("SignUp");
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
        <Text style={styles.heading3}>Get ready to chow.</Text>
        <Text style={styles.bodyText}>Log in to your ChowNow account.</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={[styles.input, styles.marginTopMedium]}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
