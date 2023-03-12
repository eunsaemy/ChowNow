import React, { useEffect, useState } from "react";
import { send_sms } from "../send_sms";
import { auth, db } from '../firebase'
import { collection, doc, getDoc } from 'firebase/firestore'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ConfirmScreen = () => {
    const [msg, setMsg] = useState('');
    const navigation = useNavigation();
  
    useEffect(() => {
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
  
      const getMsg = async () => {
        let address = await getAddress();
        let phone = await getPhone();
  
        let formatted_msg = `Please send help to ${phone} at ${address.streetNumber} ${address.street}, ${address.city}, ${address.region} ${address.postalCode}`;
        setMsg(formatted_msg);
        send_sms(formatted_msg);
        // console.log(formatted_msg);
      };
      
      getMsg();
    }, []);
  
    const handleBack = () => {
      navigation.replace("Home")
    }
  
    return (
      <View style={styles.container}>
        <Text>The following message has been sent:</Text>
        <Text>{msg}</Text>
        <TouchableOpacity
            onPress={handleBack}
            style={styles.button}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  export default ConfirmScreen;
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
      },
      button: {
          backgroundColor: '#0782F9',
          width: '60%',
          padding: 15,
          borderRadius: 10,
          alignItems: 'center',
          marginTop: 40,
      },
      buttonText: {
          color: 'white',
          fontWeight: '700',
          fontSize: 16,
      },
  })
