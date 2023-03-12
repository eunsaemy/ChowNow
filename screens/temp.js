import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const SignUp2Screen = () => {
    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch((error) => alert(error.message))
    }

    const handleBack = () => {
        navigation.replace("SignUp1")
    }

    return (
        <View style={styles.container}>
            <Text>Email: {auth.currentUser.email}</Text>
            <TouchableOpacity
                onPress={handleBack}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUp2Screen

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
