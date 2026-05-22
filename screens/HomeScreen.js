import React from 'react';

import {
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function HomeScreen({ navigation }) {

  const logoutUser = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>

      <Text style={{ fontSize: 30, marginBottom: 20 }}>
        Govt All Web
      </Text>

      <Text>• Krushak Odisha</Text>
      <Text>• CM Kisan</Text>
      <Text>• PM Kisan</Text>
      <Text>• Ayushman Card</Text>
      <Text>• e-Shram Card</Text>
      <Text>• SSEPD Odisha</Text>
      <Text>• Agristack</Text>

      <Text>• AEPS</Text>
      <Text>• PayNearby</Text>
      <Text>• Fino Payment Bank</Text>
      <Text>• Space Money</Text>

      <Text>• Bus Ticket Booking</Text>
      <Text>• RedBus</Text>
      <Text>• AbhiBus</Text>

      <Text>• PDF Editor</Text>
      <Text>• JPG to PDF</Text>
      <Text>• GPS Camera</Text>
      <Text>• Notes Tool</Text>
      <Text>• Gemini AI</Text>

      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          padding: 15,
          borderRadius: 10,
          marginTop: 30,
        }}
        onPress={logoutUser}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Logout
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}
