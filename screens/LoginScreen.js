import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
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

const LoginScreen = () => {
  const [inputFocused, setInputFocused] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "Users", user.uid), {
          email: user.email,
        });
        navigation.replace("SignUp1");
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // navigation.replace("Home");
        navigation.replace("SignUp2");
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
        <Text style={styles.heading3}>Chow anytime, chow now.</Text>
        <Text style={styles.bodyText}>Log in to your Chow Now account.</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.input, styles.marginTopMedium]}
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
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    marginBottom: 100,
    margin: 20,
    marginTop: 80,
    justifyContent: "space-between",
    gap: 40,
  },
  imageContainer: { flex: 1 },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  marginTopMedium: {
    marginTop: 20,
  },
  inputContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    marginTop: 40,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#F57C00",
    width: "100%",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    marginTop: 20,
    borderColor: "#F57C00",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#F57C00",
    fontWeight: "700",
    fontSize: 16,
  },
  heading3: {
    fontWeight: "700",
    fontSize: 24,
    paddingBottom: 12,
    textAlign: "center",
  },
  bodyText: {
    textAlign: "center",
    fontSize: 16,
    paddingBottom: 20,
  },
});
