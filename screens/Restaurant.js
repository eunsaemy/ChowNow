import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
// import RadioButtonRN from "radio-buttons-react-native";
import MenuItem from "../components/MenuItem";

export default function RestaurantCard() {
  const [address, setAddress] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  useEffect(() => {
    const getAddress = async () => {
      const docRef = doc(db, "Users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      setAddress(docSnap.data().address);
    };

    getAddress();
  }, []);

  const data = [
    {
      label: "Myself",
    },
    {
      label: "Myself and others",
    },
    {
      label: "No one is hurt",
    },
  ];

  const navigation = useNavigation();

  const handleBack = () => {
    navigation.replace("Home");
  };

  const getAddress = async () => {
    const docRef = doc(db, "Users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data().address;
  };

  const getPhone = async () => {
    const docRef = doc(db, "Users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    return docSnap.data().phone;
  };

  const handleSend = async () => {
    let address = await getAddress();
    let phone = await getPhone();

    let formatted_msg = "";

    if (address === undefined) {
      formatted_msg = `Please send help to ${phone}`;
    } else {
      formatted_msg = `Please send help to ${phone} at ${address.streetNumber} ${address.street}, ${address.city}, ${address.region} ${address.postalCode}`;
    }
    console.log(formatted_msg);
    
    navigation.replace("Confirm");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          style={styles.image}
          source={require("../assets/burger-img.png")}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.iconButton}>
              <Image
                style={styles.iconButtonImage}
                source={require("../assets/close-icon-button.png")}></Image>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                inputFocused ? setInputFocused(false) : setInputFocused(true)
              }
              style={styles.iconButton}>
              <Image
                style={styles.iconButtonImage}
                source={require("../assets/ellipsis-icon-button.png")}></Image>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {inputFocused && (
        <View style={styles.contentContainer}>
          <View style={styles.contentRow}>
            <Text style={styles.heading3}>Burger Bungalow</Text>
            <View style={styles.starRatingContainer}>
              <Text style={styles.starRating}>3.6</Text>
              <Image
                style={styles.starRatingIcon}
                source={require("../assets/star-icon.png")}></Image>
            </View>
          </View>
          <Text style={styles.bodyText}>
            $2.99 delivery fee • 25—50 minutes
          </Text>

          <Text style={styles.heading4}>Buy 1 get 1 free</Text>
          <ScrollView
            style={styles.inputsContainer}
            contentContainerStyle={{
              rowGap: 24,
            }}>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
            <MenuItem></MenuItem>
          </ScrollView>

          <TouchableOpacity
            onPress={handleSend}
            style={[styles.button, styles.buttonPrimary]}>
            <Text style={styles.buttonText}>Place order • $25.07</Text>
          </TouchableOpacity>
        </View>
      )}

      {!inputFocused && (
        <View style={styles.contentContainer}>
          <ScrollView
            style={styles.inputsContainer}
            contentContainerStyle={{
              rowGap: 24,
            }}>
            <View style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <Image
                  style={styles.inputImage}
                  source={require("../assets/location-icon.png")}></Image>
                <View>
                  <Text style={styles.captionText}>Your location</Text>
                  { address === undefined
                  ?
                    <Text style={styles.inputText}>
                      No current location
                    </Text>
                  :
                    <Text style={styles.inputText}>
                      {address.streetNumber} {address.street}
                    </Text>
                  }
                </View>
              </View>
            </View>

            {/* <View> */}
            {/* <Text style={styles.captionText}>Is anyone hurt?</Text> */}
            {/* <RadioButtonRN
              deactiveColor={"#E0e0e0"}
              boxActiveBgColor={"#FFF3E6"}
              activeColor={"#F57C00"}
              data={data}
              boxStyle={[{ borderColor: "#EEEeee" }, { borderRadius: 12 }]}
              textStyle={{ fontSize: 16 }}
              selectedBtn={(e) => console.log(e)}
            /> */}
            {/* </View> */}

            <View style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <Image
                  style={styles.inputImage}
                  source={require("../assets/emergency-icon.png")}></Image>
                <TextInput
                  style={styles.input}
                  placeholder="What's the emergency?"></TextInput>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <Image
                  style={styles.inputImage}
                  source={require("../assets/time-icon.png")}></Image>
                <TextInput
                  style={styles.input}
                  placeholder="When did this occur?"></TextInput>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity
            onPress={handleSend}
            style={[styles.button, styles.buttonPrimary]}>
            <Text style={styles.buttonText}>Request for help</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  heading3: { fontSize: 24, fontWeight: 500, marginBottom: 8 },
  heading4: { fontSize: 20, fontWeight: 500, marginBottom: 12 },
  bodyText: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 24,
  },
  contentContainer: {
    padding: 20,
    flex: 1,
  },
  contentRow: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  starRatingContainer: {
    display: "flex",
    gap: 4,
    flexDirection: "row",
    padding: 8,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#424242",
    alignSelf: "flex-end",
    alignItems: "center",
  },
  starRating: {
    color: "white",
  },
  starRatingIcon: {
    height: 12,
    width: 12,
  },
  buttonContainer: {
    marginTop: 40,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    backgroundColor: "#212121",
    borderRadius: "100%",
    width: 48,
    height: 48,
  },
  iconButtonImage: {
    width: 48,
    height: 48,
  },
  input: {
    fontSize: 16,
  },
  inputText: {
    fontSize: 16,
    color: "#212121",
  },
  captionText: {
    color: "#757575",
    marginBottom: 4,
  },
  inputContainer: {
    padding: 8,
    backgroundColor: "white",
    borderRadius: 12,
    borderWidth: 1.25,
    borderColor: "#EEEEEE",
  },
  container: {
    flex: 1,
  },
  inputsContainer: {
    marginBottom: 20,
    width: "100%",
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
  },
  inputImage: {
    width: 40,
    height: 40,
  },
  inputRow: {
    display: "flex",
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#F57C00",
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
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
});
