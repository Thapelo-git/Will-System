import React,{useState,Component} from 'react'
import { StyleSheet, Text, View ,StatusBar,TextInput,
TouchableOpacity,Image,Dimensions,Alert} from 'react-native'

import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"

import { Images,Colors } from '../contants'
import { Display } from '../utils'
import { Formik } from 'formik'
import * as yup from 'yup'
import { auth,db } from '../../firebase'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
const deviceHeight=Dimensions.get("window").height
const deviceWidth=Dimensions.get("window").width
const CompanySignUp = ({navigation}) => {
    const [isPasswordShow,setPasswordShow]=useState(false)
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const ReviewSchem=yup.object({
        name:yup.string().required().min(2),
        phonenumber:yup.string().matches(phoneRegExp,'Phone number is not valid'),
        email:yup.string().required().min(6),
        password:yup.string().required().min(6),
        confirmpassword:yup.string().required().min(6).oneOf([yup.ref('password'),null],'password does not match')
    })
    const addUser= async (data)=>{
        try{
          const {uid,email,password,name,phonenumber} =data
  await auth.createUserWithEmailAndPassword(
      email.trim().toLowerCase(),password
    ).then(res =>{
       
          db.ref(`/Company`).child(res.user.uid).set({
            name:name,
            email:email.trim().toLowerCase(),
            phonenumber:phonenumber,
            uid:res.user.uid
          })
          navigation.navigate('Companyhome')
          res.user.sendEmailVerification()
          })
        }
        catch(error){
          if(error.code === 'auth/email-already-in-use'){
            Alert.alert(
              'That email address is already inuse'
            )
          }
          if(error.code === 'auth/invalid-email'){
            Alert.alert(
              'That email address is invalid'
            )
          }
          else{
            Alert.alert(error.code)
          }
          
        }
        
      }
  return (
    
        
      <View style={{width:deviceWidth *0.9,top:10,justifyContent:'center',alignItems:'center'}}>
        <View style={{ paddingHorizontal:15,
        marginHorizontal:15,}}>
            <Text style={{fontWeight:'bold'}}>Create Company Profile</Text>
        </View>
        <View style={{ paddingHorizontal:15,
        marginHorizontal:15,}}>
            <Text style={{fontWeight:'bold',color:'gray'}}>This information will let us know more 
            about your company</Text>
        </View>
         <TouchableOpacity style={styles.signinButton}
           onPress={() => navigation.navigate('SignupSteps')}
            
            >
                <Text style={styles.signinButtonText}>Create Account</Text>
            </TouchableOpacity>
     
      </View>
      
  )
}

export default CompanySignUp

const styles = StyleSheet.create({ container:{
    flex:1,
    backgroundColor:'#EC8F05'
} ,
headerContainer:{
    flexDirection:'row' ,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:40,
    paddingHorizontal:20
 },
 headerTitle:{
   fontSize:20,
   lineHeight:20 * 1.4,
//    width:Display.setWidth(80),
   textAlign:'center'  

 },
 
        content:{
            fontSize:20,
            marginTop:10,
            marginBottom:20,
            marginHorizontal:20,
        },
        inputContainer:{
            backgroundColor:'#F5F5F5',
            paddingHorizontal:20,
            marginHorizontal:20,
            borderRadius:8,
            borderWidth:0.5,
            borderColor:'#F5F5F5',
            justifyContent:'center',
        },
        inputSubContainer:{
            flexDirection:'row',
            alignItems:'center'
        },
        inputText:{
            fontSize:18,
            textAlignVertical:'center',
            padding:0,
            height:Display.setHeight(6),
            color:Colors.DEFAULT_BLACK,
            flex:1
    
        },
        signinButton:{
            backgroundColor:'#000',
            borderRadius:8,
            marginHorizontal:20,
            height:Display.setHeight(6),
            justifyContent:'center',
            alignItems:'center',
            marginTop:20,
        },
        signinButtonText:{
            fontSize:18,
            lineHeight:18 * 1.4,
            color:'#fff',
            
        },
        title:{
            fontSize:20,
            lineHeight:20 * 1.4,
            marginTop:20,
            marginBottom:30,
            marginHorizontal:20
                },
                signupContainer:{
                    marginHorizontal:20,
                    justifyContent:'center',
                    paddingVertical:20,
                    flexDirection:'row',
                    alignItems:'center'
                },
                accountText:{
                    fontSize:13,
                    lineHeight:13 * 1.4,
                    color:Colors.DEFAULT_BLACK
                },
                signupText:{
                    fontSize:13,
                    lineHeight:13 * 1.4,
                    color:'#EC8F05',
                    marginLeft:5,
            
                },})