import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { I18nManager } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './components/Home'
import Calendar from './components/Calendar'
import SignIn from './components/SignIn'
import Register from './components/Register'
import LoadingScreen from './components/LoadingScreen'
import { auth, db } from './firebase';


const globalScreenOption = {
  headerStyle: { backgroundColor: "#007bff", borderBottomLeftRadius: 15, borderBottomRightRadius: 15, height: 80 },
  headerTitleStyle: { color: 'white' },
  headerTintColor: 'white',
}
I18nManager.forceRTL(false);
I18nManager.allowRTL(false);
export default function App() {


  const [isLoggin, setLoggin] = useState(
    {
      status: Platform.OS === 'web' ? 'Loading' : 'not',
      user: ''
    })

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(authUser => {
      console.log(1);

      if (authUser) {
        console.log(222);
        db.collection('users').doc(authUser.uid).get().then(snap => {
          if (!snap.exists) {
            db.collection('users').doc(authUser.uid).set({
              name: authUser.displayName,
              email: authUser.email,
              uid: authUser.uid,
            })
          } else {

          }
        }).then(() => {

        }).catch(err => {

        })

        setLoggin({
          status: true,
          user: authUser.uid
        })
      } else {
        console.log(333);

        setLoggin({
          status: 'not',
          user: ''
        })
      }
    })
    return unsubscribe;
  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOption}>

        {

          isLoggin.status === true
            ?
            <>
              <Stack.Screen name='Login'>
                {(props) => <Home {...props} uid={isLoggin.user} logout={setLoggin} isLoggin={isLoggin} />}
              </Stack.Screen>
              <Stack.Screen name='Calendar' component={Calendar} />
            </>
            :
            isLoggin.status === 'not' ?
              <>
                <Stack.Screen name='SignIn'>
                  {(props) => <SignIn {...props} login={setLoggin} isLoggin={isLoggin} />}
                </Stack.Screen>
                <Stack.Screen name='Register' component={Register} />
              </>
              :
              isLoggin.status === 'loading' ?
                <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
                : <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
        }

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
