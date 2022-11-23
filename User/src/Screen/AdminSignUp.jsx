import React,{useState,Component,useEffect} from 'react'
import { StyleSheet, Text, View ,StatusBar,TextInput,
TouchableOpacity,Image,Dimensions,Alert} from 'react-native'
//AdminSignUp
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"

import { Formik } from 'formik'
import * as yup from 'yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { db,auth } from '../../firebase'
import { useNavigation } from '@react-navigation/native'
const deviceHeight=Dimensions.get("window").height
const deviceWidth=Dimensions.get("window").width
const AdminSignUp = () => {
     const navigation =useNavigation()
    const [code, setCode] = useState([]);
    useEffect(()=>{
        
        db.ref('Student').on('value',snap=>{
          let item = [];
          const a_ =snap.val();
          for (let x in a_){
            item.push({StudentNumber:a_[x].IDnumber ,})
          }
          setCode(item)
        })
     
      
},[])
const [error,setError]=useState('')
    const [isPasswordShow,setPasswordShow]=useState(false)
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const ReviewSchem=yup.object({
        // name:yup.string().required().min(2),
        // phonenumber:yup.string().matches(phoneRegExp,'Phone number is not valid'),
        email:yup.string().required().min(6),
        StudentNumber: yup.string().required().min(2),
        password:yup.string().required().min(6),
        // confirmpassword:yup.string().required().min(6).oneOf([yup.ref('password'),null],'password does not match')
    })
    const addUser  = async (data) => {
        const {uid,email,password,phonenumber,StudentNumber} =data

        try {
            
                code.map( async (element) =>{
                   if (element.StudentNumber.indexOf(StudentNumber)>-1){
                    const user = await auth
                    .signInWithEmailAndPassword(email.trim().toLowerCase(), password)
                    .then( async res => {
                        try { 
                            const jsonValue = JSON.stringify(res.user)
                            await AsyncStorage.setItem("IDCStudent", res.user.uid)
                          
                            navigation.navigate('StudHomeScreen')
                        } catch (e) {
                            console.log("no data ");
                        }
                    });
               
                       
                   
                   }
                   else{
                    
                    setError('Please Register Your Student number to your Facilitator')
                   }
                 
               
               })
 
        
        }
        catch (error) {
            if (error.code == 'auth/email-already-in-use') {
                Alert.alert(
                    "This email already exist"
                )
            }
            if (
                error.code == 'auth/invalid-email') {
                Alert.alert(
                    "This email already exist"
                )
            }
            else {
                Alert.alert(error.code)
            }

        }

    
}

  return (
    <View>
      <View style={{width:deviceWidth *0.9,top:10,}}>
      <Image source={require('../assets/Images/StudentIcon.png')} style={{width:150,height:150}}/>
      <Formik
        initialValues={{StudentNumber:'',email:'',password:'',}}
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
            <Text style={{color:'red'}}>{error}</Text>
            <Text style={{fontWeight:'bold'}}>StudentNumber</Text>
        </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
            
                    
                    <TextInput placeholder="StudentNumber"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    onChangeText={props.handleChange('StudentNumber')}
                    value={props.values.StudentNumber}
                    onBlur={props.handleBlur('StudentNumber')}
                    />
                </View>
            </View>
            {props.errors.StudentNumber? <Text style={{color:"red"}}>{props.errors.StudentNumber}</Text>:null}
            
            <View style={{height:7}}></View>
            <View style={{ paddingHorizontal:15,
        marginHorizontal:15,}}>
            <Text style={{fontWeight:'bold'}}>Email Address</Text>
        </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                <Image source={require("../assets/Images/email.jpg")} style={{height:20,width:20}}/>
                    
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
            <Text style={{fontWeight:'bold'}}>Password</Text>
        </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                <Image source={require("../assets/Images/log.jpg")} style={{height:20,width:20}}/>
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
     
        
            <TouchableOpacity style={styles.signinButton}
            // onPress={()=>navigation.navigate('RegisterPhone')}
            onPress={props.handleSubmit}
            >
                <Text style={styles.signinButtonText}>Submit</Text>
            </TouchableOpacity>
            </>
                )}
            </Formik>
      </View>
    </View>
  )
}

export default AdminSignUp

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
   width:80,
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
            height:60,
            color:'#000',
            flex:1
    
        },
        signinButton:{
            backgroundColor:'#000',
            borderRadius:8,
            marginHorizontal:20,
            height:60,
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
                    color:'#000'
                },
                signupText:{
                    fontSize:13,
                    lineHeight:13 * 1.4,
                    color:'#EC8F05',
                    marginLeft:5,
            
                },})