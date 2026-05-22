import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  sendPasswordResetEmail,
} from 'firebase/auth';

import { auth } from '../firebaseConfig';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);

      Alert.alert(
        'Success',
        'Password Reset Email Sent'
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>
        Forgot Password
      </Text>

      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 15,
          borderRadius: 10,
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: 'orange',
          padding: 15,
          borderRadius: 10,
        }}
        onPress={resetPassword}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Reset Password
        </Text>
      </TouchableOpacity>
    </View>
  );
}
