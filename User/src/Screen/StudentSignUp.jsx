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

const deviceHeight=Dimensions.get("window").height
const deviceWidth=Dimensions.get("window").width
const StudentSignUp = ({navigation}) => {
    const [isPasswordShow,setPasswordShow]=useState(false)
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const ReviewSchem=yup.object({
        Studentnumber:yup.number().required().min(10),
        phonenumber:yup.string().required().matches(phoneRegExp,'Phone number is not valid'),
        email:yup.string().required().min(6),
        password:yup.string().required().min(6),
        confirmpassword:yup.string().required().min(6).oneOf([yup.ref('password'),null],'password does not match')
    })
    const addUser= async (data)=>{
        try{
          const {uid,email,password,Studentnumber,phonenumber} =data
  await auth.createUserWithEmailAndPassword(
      email.trim().toLowerCase(),password
    ).then(res =>{
       
          db.ref(`/IDCStudent`).child(res.user.uid).set({
            Studentnumber:Studentnumber,
            email:email.trim().toLowerCase(),
            phonenumber:phonenumber,
            uid:res.user.uid
          })
          navigation.navigate('StudentHome')
        //   res.user.sendEmailVerification()
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
    <View>
       <View style={{width:deviceWidth *0.9,top:10,}}>
       <Formik
        initialValues={{Studentnumber:'',phonenumber:'',email:'',password:'',confirmpassword:''}}
        validationSchema={ReviewSchem}
        onSubmit={(values,action)=>{
            action.resetForm()
            addUser(values)
        }}
        >
            {(props)=>(
                <>
            <View style={{ paddingHorizontal:15,
        marginHorizontal:15,}}>
            <Text style={{fontWeight:'bold'}}>Enter Student number</Text>
        </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="user" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                    
                    <TextInput placeholder="Student Number"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    onChangeText={props.handleChange('Studentnumber')}
                    value={props.values.Studentnumber}
                    onBlur={props.handleBlur('Studentnumber')}
                    />
                </View>
            </View>
            <Text style={{color:'red',marginTop:-10}}>{props.touched.Studentnumber && props.errors.Studentnumber}</Text>
            <View style={{height:7}}></View>
            <View style={{ paddingHorizontal:15,
        marginHorizontal:15,}}>
            <Text style={{fontWeight:'bold'}}>Email Address</Text>
        </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="mail" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                    
                    <TextInput placeholder="email@gmail.com"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='email-address'
             onChangeText={props.handleChange('email')}
             value={props.values.email}
             onBlur={props.handleBlur('email')}
                    />
                </View>
            </View>
            <Text style={{color:'red',marginTop:-15}}>{props.touched.email && props.errors.email}</Text>
            <View style={{height:7}}></View>
            <View style={{ paddingHorizontal:15,
        marginHorizontal:15,}}>
            <Text style={{fontWeight:'bold'}}>Phone Number</Text>
        </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather name="phone" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                    
                    <TextInput placeholder="Phone number"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='numeric'
             onChangeText={props.handleChange('phonenumber')}
             value={props.values.phonenumber}
             onBlur={props.handleBlur('phonenumber')}
                    />
                </View>
            </View>
            <Text style={{color:'red',marginTop:-15}}>{props.touched.phonenumber && props.errors.phonenumber}</Text>
            <View style={{height:7}}></View>
            <View style={{ paddingHorizontal:15,
        marginHorizontal:15,}}>
            <Text style={{fontWeight:'bold'}}>Password</Text>
        </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                <Feather name="lock" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                 <TextInput
                 secureTextEntry={isPasswordShow? false :true}
                 placeholder="Password"
                 selectionColor='gainsboro'
                 style={styles.inputText}
                 onChangeText={props.handleChange('password')}
             value={props.values.password}
             onBlur={props.handleBlur('password')}/>
                 <Feather
                 name="eye" size={22}
                 color='#000'
                 style={{marginRight:10}}
                 onPress={()=>setPasswordShow(!isPasswordShow)}
                 />
                </View>
            </View>
            <Text style={{color:'red',marginTop:-15}}>{props.touched.password && props.errors.password}</Text>
            <View style={{height:7}}></View>
            <View style={{ paddingHorizontal:15,
        marginHorizontal:15,}}>
            <Text style={{fontWeight:'bold'}}>Confirm Password</Text>
        </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                <Feather name="lock" size={22}
                    color='#000'
                    style={{marginRight:10}}/>
                 <TextInput
                 secureTextEntry={isPasswordShow? false :true}
                 placeholder=" confirm Password"
                 selectionColor='gainsboro'
                 style={styles.inputText}
                 onChangeText={props.handleChange('confirmpassword')}
                 value={props.values.confirmpassword}
                 onBlur={props.handleBlur('confirmpassword')}/>
                 <Feather
                 name="eye" size={22}
                 color='#000'
                 style={{marginRight:10}}
                 onPress={()=>setPasswordShow(!isPasswordShow)}
                 />
                </View>
            </View>
            <Text style={{color:'red',marginTop:-15}}>{props.touched.confirmpassword && props.errors.confirmpassword}</Text>
            <TouchableOpacity style={styles.signinButton}
            // onPress={()=>navigation.navigate('RegisterPhone')}
            onPress={props.handleSubmit}
            >
                <Text style={styles.signinButtonText}>Create Account</Text>
            </TouchableOpacity>
            </>
                )}
            </Formik>
       </View>
    </View>
  )
}

export default StudentSignUp

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
                
                    },
})