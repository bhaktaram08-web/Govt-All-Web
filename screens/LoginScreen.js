import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Login Successful');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 30, marginBottom: 20 }}>
        Govt All Web
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
          backgroundColor: 'blue',
          padding: 15,
          borderRadius: 10,
        }}
        onPress={loginUser}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={{ textAlign: 'center', marginTop: 15 }}>
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        <Text style={{ textAlign: 'center', marginTop: 10 }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
    </View>
  );
}
