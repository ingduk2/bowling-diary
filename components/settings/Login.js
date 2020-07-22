/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Platform, Button } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from 'firebase';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
// import firebase from '../../constants/FireBaseInit';
import 'firebase/auth';
import 'firebase/firestore';
import { FACEBOOK_APPID, GOOGLE_IOS_CLIENT_ID } from '../../key/ApiKey';
import { TouchableOpacity } from 'react-native-gesture-handler';
// const { width, height } = Dimensions.get('window');

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: 'https://www.facebook.com/v6.0/dialog/oauth',
  tokenEndpoint: 'https://graph.facebook.com/v6.0/oauth/access_token',
};

const useProxy = Platform.select({ web: false, default: true });

export default function Login() {
  console.log('Login');
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [provider, setProvider] = useState('');

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: '749205142296622',
      scopes: ['public_profile', 'email'],
      // For usage in managed apps using the proxy
      redirectUri: makeRedirectUri({
        useProxy,
        // For usage in bare and standalone
        // Use your FBID here. The path MUST be `authorize`.
        native: 'fb749205142296622://authorize',
      }),
      // prompt: Prompt.SelectAccount,
      extraParams: {
        // Use `popup` on web for a better experience
        display: Platform.select({ web: 'popup' }),
        // Optionally you can use this to rerequest declined permissions
        auth_type: 'rerequest',
      },
    },
    discovery,
  );

  async function facebookLogin() {
    const response = await promptAsync({ useProxy });
    if (response?.type === 'success') {
      console.log('success');
      const { access_token } = response.params;

      const credential = firebase.auth.FacebookAuthProvider.credential(access_token);
      // Sign in with the credential from the Facebook user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          console.log('Use Effect user signed in', result);
          const db = firebase.firestore();

          if (result.additionalUserInfo.isNewUser) {
            db.collection('users')
              .doc(result.user.uid)
              .set({
                email: result.user.email,
                displayName: result.user.displayName,
                createdAt: Date.now(),
                providerId: result.additionalUserInfo.providerId,
              })
              .then(function () {
                console.log('Document successfully written!');
              })
              .catch(function (error) {
                console.error('Error writing document: ', error);
              });
          } else {
            db.collection('users').doc(result.user.uid).update({
              last_logged_in: Date.now(),
            });
          }
          setIsLogin(true);
          setEmail(result.user.email);
          setName(result.user.displayName);
          setProvider(result.additionalUserInfo.providerId);
        })
        .catch(function (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          // ...
          console.log('error', error);
        });
    }
  }

  function onSignIn(googleUser) {
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    const unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      // if (!isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      const credential = firebase.auth.GoogleAuthProvider.credential(
        // googleUser.getAuthResponse().id_token,
        googleUser.idToken,
        googleUser.accessToken,
      );
      // Sign in with credential from the Google user.
      firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
          console.log('user signed in', result);
          const db = firebase.firestore();
          setIsLogin(true);
          if (result.additionalUserInfo.isNewUser) {
            db.collection('users')
              .doc(result.user.uid)
              .set({
                email: result.user.email,
                displayName: result.user.displayName,
                createdAt: Date.now(),
                providerId: result.additionalUserInfo.providerId,
              })
              .then(function () {
                console.log('Document successfully written!');
              })
              .catch(function (error) {
                console.error('Error writing document: ', error);
              });
          } else {
            db.collection('users').doc(result.user.uid).update({
              last_logged_in: Date.now(),
            });
          }
          setIsLogin(true);
          setEmail(result.user.email);
          setName(result.user.displayName);
          setProvider(result.additionalUserInfo.providerId);
        })
        .catch(function (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = error.credential;
          // ...
          console.log('error', error);
        });
      // } else {
      //   console.log('User already signed-in Firebase.');
      //   setIsLogin(true);
      // }
    });
  }

  function isUserEqual(googleUser, firebaseUser) {
    console.log(googleUser, firebaseUser);
    if (firebaseUser) {
      const { providerData } = firebaseUser;
      for (let i = 0; i < providerData.length; i += 1) {
        if (
          providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.user.id
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  async function googleLogin() {
    try {
      const result = await Google.logInAsync({
        // androidClientId: YOUR_CLIENT_ID_HERE,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        onSignIn(result);
        return result.accessToken;
      }
      return { cancelled: true };
    } catch (e) {
      return { error: true };
    }
  }

  function logOut() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log('logout success');
        setIsLogin(false);
      })
      .catch((error) => {
        // An error happened.
        console.log('logout fail', error);
      });
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
        {!isLogin && (
          <View>
            <Icon.Button name="google" backgroundColor="#dc4335" size={40} onPress={googleLogin}>
              Login With Google+
            </Icon.Button>
            <Text> </Text>
            <Icon.Button
              name="facebook"
              backgroundColor="#3b5998"
              size={40}
              onPress={() => {
                facebookLogin();
              }}
            >
              Login with Facebook
            </Icon.Button>
          </View>
        )}
        {isLogin && (
          <View>
            <Text style={styles.logOutText}>{email}</Text>
            <Text style={styles.logOutText}>{name}</Text>
            <Text style={styles.logOutText}>{provider} 로그인중</Text>
            <TouchableOpacity onPress={logOut}>
              <Text style={styles.logOutText}>LogOut</Text>
            </TouchableOpacity>
          </View>
        )}
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
  logOutText: {
    fontSize: 30,
  },
});
