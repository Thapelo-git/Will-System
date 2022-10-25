import React,{useState,Component} from 'react'
import { StyleSheet, Text, View ,StatusBar,TextInput,
TouchableOpacity,Image,Dimensions,Alert} from 'react-native'

import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"

import { Images,Colors } from '../contants'
import { Display } from '../utils'
import { Formik } from 'formik'
import * as yup from 'yup'
import CompanySignUp from './CompanySignUp'
import StudentSignUp from './StudentSignUp'


const deviceHeight=Dimensions.get("window").height
const SignupScreen = ({navigation}) => {
    const [page,setPage]=useState(0)
   
    return (
        <View style={styles.container}>
          
            <View style={{flex:1,justifyContent:'center',alignItems:'center', }}>
            <Image style={{height:100,width:100}} source={require('../assets/Images/logo2.png')}/>
            </View>
            
            <View style={{backgroundColor:'#fff',width:'100%',borderTopLeftRadius:20,
    borderTopRightRadius:20,paddingHorizontal:10,
    maxHeight:deviceHeight * 0.9}}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
        width:250,height:60,backgroundColor:'gainsboro',borderRadius:30}}>
              <TouchableOpacity style={{width:130,height:58,backgroundColor:page === 0?'#EC8F05':'gainsboro',justifyContent:'center',
            alignItems:'center',borderRadius:30}} 
            onPress={()=>setPage(0)}>
                  <Text style={{color:page===0?'#fff':'#000',fontWeight:'bold'}}>Company</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={{width:130,height:58,backgroundColor:page === 1?'#EC8F05':'gainsboro',justifyContent:'center',
            alignItems:'center',borderRadius:30}}
            onPress={()=>setPage(1)}>
                  <Text style={{color:page===1?'#fff':'#000',fontWeight:'bold'}}>Student</Text>
              </TouchableOpacity> */}
          </View>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
        width:'100%',}}>
            {
                page === 0?(<CompanySignUp navigation={navigation}/>):(null)
            }
            {/* {
                page === 1?(<StudentSignUp/>):(null)
            } */}
            
            </View>
            <View style={styles.signupContainer}>
                <Text style={styles.accountText}>
                    Already have account?
                </Text>
                <Text style={styles.signupText}
                onPress={()=>navigation.navigate('Signup')}
                >Sign In</Text>
            </View>
            </View>

        </View>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container:{
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
       width:Display.setWidth(80),
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
                
                    },
})
