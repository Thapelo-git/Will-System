import { StyleSheet, Text, View ,StatusBar,TextInput,
    TouchableOpacity,Image,Dimensions,Alert} from 'react-native'
import React,{useState} from 'react'
import Feather from "react-native-vector-icons/Feather"
import { Images,Colors } from '../contants'
import { Display } from '../utils'
import { Formik } from 'formik'
import * as yup from 'yup'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { auth,db } from '../../firebase'
const deviceWidth=Dimensions.get("window").width
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
const SignupSteps = () => {
    const [isPasswordShow,setPasswordShow]=useState(false)
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const ReviewSchem=yup.object({
        name:yup.string().required().min(2),
        phonenumber:yup.string().matches(phoneRegExp,'Phone number is not valid'),
        email:yup.string().required().min(6),
        password:yup.string().required().min(6),
        Duties:yup.string().required().min(10),
        confirmpassword:yup.string().required().min(6).oneOf([yup.ref('password'),null],'password does not match')
    })
    const addUser= async (data)=>{
        try{
          const {uid,email,password,name,phonenumber,Duties} =data
  await auth.createUserWithEmailAndPassword(
      email.trim().toLowerCase(),password
    ).then(res =>{
       
          db.ref(`/Company`).child(res.user.uid).set({
            name:name,
            email:email.trim().toLowerCase(),
            phonenumber:phonenumber,
            Duties:Duties,
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
    <Formik
    initialValues={{name:'',phonenumber:'',email:'',password:'',confirmpassword:'',Duties:''}}
    validationSchema={ReviewSchem}
    onSubmit={(values,action)=>{
        action.resetForm()
        addUser(values)
    }}
    >
        {(props)=>(
            <>
            <Text style={{top:60,}}>Create Company Profile</Text>
            <View style={styles.container}>
                
          <ProgressSteps >
        <ProgressStep label="First Step" >
            <View style={{ alignItems: 'center',padding:20 }}>
            
            <View style={{ paddingHorizontal:15,
    marginHorizontal:15,}}>
        <Text style={{fontWeight:'bold'}}>Company Name</Text>
    </View>
        <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
                <Feather name="user" size={22}
                color='#000'
                style={{marginRight:10}}/>
                
                <TextInput placeholder="FirstName"
                selectionColor='gainsboro'
                style={styles.inputText}
                onChangeText={props.handleChange('name')}
                value={props.values.name}
                onBlur={props.handleBlur('name')}
                />
            </View>
        </View>
        <Text style={{color:'red',marginTop:-10}}>{props.touched.name && props.errors.name}</Text>
            </View>
        </ProgressStep>
        <ProgressStep label="Duties">
            <View style={{ alignItems: 'center' ,padding:20}}>
                <Text>Duties(briefly tell us more about your duties and how 
                    our students will gain experience)
                </Text>
                <View
                      style={{
                        flexDirection: "row",
                        // alignItems: "center",
                        borderColor: "rgba(0,0,0,.2)",
                        borderWidth: 1,
                        Minheight: 100,
                        borderRadius: 15,
                        paddingHorizontal: 5,
                        marginVertical: 10
                      }}
                    >
                       <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          // backgroundColor: "#DEEDF0" ,
                          width: 40,
                          height: 40,
                          borderRadius: 10
                        }}
                      >
                        <SimpleLineIcons name="note" type="material" />
                      </View>
                      <TextInput
                        style={{
                          padding: 10,
                          margin: 10,
                          borderColor: "rgba(0,0,0,.2)",
                          
                          flex: 1,
                          
                          textAlign: "auto",
                         
                        }}
                        placeholder="Add description"
                        multiline={true}
                        numberOfLines={10}
                        textAlignVertical={"top"}
                        onChangeText={props.handleChange('Duties')}
                value={props.values.Duties}
                onBlur={props.handleBlur('Duties')}
                      />
                    
                    </View>
                    <Text style={{color:'red',marginTop:-10}}>{props.touched.Duties && props.errors.Duties}</Text>
            </View>
        </ProgressStep>
        <ProgressStep label="Third Step">
            <View style={{ alignItems: 'center' }}>
                <Text>This is the content within step 3!</Text>
            </View>
        </ProgressStep>
    </ProgressSteps>
    </View>
        {/* <View style={{ paddingHorizontal:15,
    marginHorizontal:15,}}>
        <Text style={{fontWeight:'bold'}}>Company Name</Text>
    </View>
        <View style={styles.inputContainer}>
            <View style={styles.inputSubContainer}>
                <Feather name="user" size={22}
                color='#000'
                style={{marginRight:10}}/>
                
                <TextInput placeholder="FirstName"
                selectionColor='gainsboro'
                style={styles.inputText}
                onChangeText={props.handleChange('name')}
                value={props.values.name}
                onBlur={props.handleBlur('name')}
                />
            </View>
        </View>
        <Text style={{color:'red',marginTop:-10}}>{props.touched.name && props.errors.name}</Text>
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
       onPress={() => navigation.navigate('SignupSteps')}
        // onPress={props.handleSubmit}
        >
            <Text style={styles.signinButtonText}>Create Account</Text>
        </TouchableOpacity>
         */}
        </>
            )}
        </Formik>
   
  )
}

export default SignupSteps

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
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
                // flex:1
                width:'100%'
        
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