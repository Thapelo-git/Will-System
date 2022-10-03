import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React,{useState,useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from './firebase';
import SplashScreen from './src/Screen/SplashScreen';
import GetStarted from './src/Screen/GetStarted';
import SignupScreen from './src/Screen/SignupScreen';
import SigninScreen from './src/Screen/SigninScreen';
import TabScreen from './src/Screen/TabScreen';
import SearchScreen from './src/Screen/SearchScreen';
import SignupSteps from './src/Screen/SignupSteps';
const Stack = createNativeStackNavigator()
export default function App() {
  const [signedIn,setSignedIn]=useState(false)

  auth.onAuthStateChanged((user)=>{
    if(user){
        setSignedIn(true);
       console.log(user.uid,"user------------")
     
    }else{
     
        setSignedIn(false);
    }
});
  return(
      <NavigationContainer>
          {!signedIn ?(
              <>
              <Stack.Navigator screenOptions={{headerShown:false}}>
               <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Welcome" component={GetStarted}/> 
              <Stack.Screen name="Signup" component={SignupScreen}/> 
              <Stack.Screen name="Signin" component={SigninScreen}/> 
              <Stack.Screen name="SignupSteps" component={SignupSteps}/>
              {/* <Stack.Screen name="forgetPassword" component={forgetPassword}/>
              <Stack.Screen name="RegisterPhone" component={RegisterPhone}/>  */}
              </Stack.Navigator>
              </>
          ):(
              <>
           <Stack.Navigator screenOptions={{headerShown:false}}>
          

          {/* <Stack.Screen name="homeScreen" component={AuthStack}/>
          <Stack.Screen name="UserDetails" component={UserDetails}/> */}
          <Stack.Screen name="Companyhome" component={TabScreen}/>
           <Stack.Screen name="Search" component={SearchScreen}/>
           
          {/*<Stack.Screen name="PolLocation" component={PolLocation}/>
          <Stack.Screen name="PolProfile" component={PolProfile}/>
          <Stack.Screen name="PolUserDetails" component={PolUserDetails}/>
          
          <Stack.Screen name="Visisthistory" component={Visitshistory}/>
          <Stack.Screen name="Visistupcoming" component={Visitsupcoming}/>
          <Stack.Screen name="Notification" component={Notification}/>
          <Stack.Screen name="AccountDetails" component={AccountDetails}/> */}
      </Stack.Navigator>
              </>
          )}

      </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});