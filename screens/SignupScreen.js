import React, { useState } from 'react';
import {
  View,
 Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../firebaseConfig';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signupUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account Created');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>
        Create Account
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

      <TextInput
        placeholder="Enter Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 15,
          borderRadius: 10,
        }}
      />

      <TouchableOpacity
        style={{
          backgroundColor: 'green',
          padding: 15,
          borderRadius: 10,
        }}
        onPress={signupUser}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Signup
        </Text>
      </TouchableOpacity>
    </View>
  );
}
