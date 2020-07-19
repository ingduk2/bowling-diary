/* eslint-disable no-use-before-define */
import * as React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import * as Facebook from 'expo-facebook';
import Icon from 'react-native-vector-icons/FontAwesome';

// const { width, height } = Dimensions.get('window');

export default function Login() {
  async function logIn() {
    try {
      await Facebook.initializeAsync('749205142296622');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        styles={{
          flex: 2,
          backgroundColor: 'blue',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <TouchableOpacity onPress={() => logIn()}>
          <Text style={styles.mainText}>FaceBook Login</Text>
        </TouchableOpacity> */}
        <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={logIn}>
          Login with Facebook
        </Icon.Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  mainText: { margin: 6, height: 40, fontSize: 30 },
});
