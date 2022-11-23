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
import ForgetPassword from './src/Screen/ForgetPassword';
import LogScreen from './src/Screen/LogScreen';
import StudentHome from './src/Screen/StudentHome';
import AdminHome from './src/Screen/AdminHome';
import RegisteredC from './src/Screen/RegisteredC';
import AdminSignIn from './src/Screen/AdminSignIn';
import AdminSignUp from './src/Screen/AdminSignUp';
import StudHomeScreen from './src/Screen/StudHomeScreen';
import Month1 from './src/Screen/Month1';
import Month2 from './src/Screen/Month2';
const Stack = createNativeStackNavigator()
export default function App() {
//   const [signedIn,setSignedIn]=useState(false)

//   auth.onAuthStateChanged((user)=>{
//     if(user){
//         setSignedIn(true);
//        console.log(user.uid,"user------------")
     
//     }else{
     
//         setSignedIn(false);
//     }
// });
  return(
      <NavigationContainer>
          {/* {!signedIn ?(
              <>
              <Stack.Navigator screenOptions={{headerShown:false}}>
               <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Welcome" component={GetStarted}/> 
              <Stack.Screen name="Signup" component={SignupScreen}/> 
              <Stack.Screen name="Signin" component={SigninScreen}/> 
              <Stack.Screen name="SignupSteps" component={SignupSteps}/>
              <Stack.Screen name="forgetPassword" component={ForgetPassword}/>
  
              </Stack.Navigator>
              </>
          ):(
              <>
           <Stack.Navigator screenOptions={{headerShown:false}}>
          

      
          <Stack.Screen name="Companyhome" component={TabScreen}/>
          <Stack.Screen name="StudentHome" component={StudentHome}/>
           <Stack.Screen name="Search" component={SearchScreen}/>
           <Stack.Screen name="LogScreen" component={LogScreen}/>
          
          
      </Stack.Navigator>
              </>
          )} */}
    <Stack.Navigator screenOptions={{headerShown:false}}>
               <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Welcome" component={GetStarted}/> 
              <Stack.Screen name="Signup" component={SignupScreen}/> 
              <Stack.Screen name="Signin" component={SigninScreen}/> 
              <Stack.Screen name="SignupSteps" component={SignupSteps}/>
              <Stack.Screen name="forgetPassword" component={ForgetPassword}/>
              <Stack.Screen name="Companyhome" component={TabScreen}/>
           <Stack.Screen name="Search" component={SearchScreen}/>
           <Stack.Screen name="LogScreen" component={LogScreen}/>
           <Stack.Screen name="StudentHome" component={StudentHome}/>
           <Stack.Screen name="AdminHome" component={AdminHome}/>
           <Stack.Screen name="AdminSignIn" component={AdminSignIn}/>
           <Stack.Screen name="AdminSignUp" component={AdminSignUp}/>
           <Stack.Screen name="StudHomeScreen" component={StudHomeScreen}/>
           <Stack.Screen name="Month1" component={Month1}/>
           <Stack.Screen name="Month2" component={Month2}/>
              </Stack.Navigator>
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