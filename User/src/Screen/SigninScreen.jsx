import React,{useState,Component} from 'react'
import { StyleSheet, Text, View ,StatusBar,
    TextInput,TouchableOpacity,Image,Modal,Dimensions} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons"
import Feather from "react-native-vector-icons/Feather"


import { Images ,Colors} from '../contants'
import { Display } from '../utils'


import CompanySignIn from './CompanySignIn'
import StudentSignIn from './StudentSignIn'
const deviceHeight=Dimensions.get("window").height
const SigninScreen = ({navigation}) => {
    const [isPasswordShow,setPasswordShow]=useState(false)
    const [modalopen,setModalopen]=useState(true)
    const [page,setPage]=useState(0)
    return (
        <View >
             <StatusBar
            barStyle="dark-content"
            style={{backgroundColor:'#EC8F05'}}
           translucent
            />
            {/* <Separator
            height={StatusBar.currentHeight}
            /> */}
            
            <Modal
   animationType='fade'
   transparent={true}
   visible={modalopen}>
       <View style={{flex:1,backgroundColor:'#EC8F05',justifyContent:"flex-end"}}>
       <View style={styles.headerContainer} 
            >
            <Ionicons name="chevron-back-outline" size={30}
            onPress={()=>navigation.goBack()}/>
            <Text style={styles.headerTitle}> </Text>
            </View>
            <View style={{flex:1,justifyContent:'center',alignItems:'center',  paddingVertical:30,}}>
            <Image source={require('../assets/Images/logo2.png')}/>
            </View>
        <View style={{backgroundColor:'#fff',width:'100%',borderTopLeftRadius:20,
    borderTopRightRadius:20,paddingHorizontal:10,
    height:deviceHeight * 0.7}}>
         <View style={{justifyContent:'center',alignItems:'center'}}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
        width:250,height:60,backgroundColor:'gainsboro',borderRadius:30}}>
              <TouchableOpacity style={{width:130,height:58,backgroundColor:page === 0?'#EC8F05':'gainsboro',justifyContent:'center',
            alignItems:'center',borderRadius:30}} 
            onPress={()=>setPage(0)}>
                  <Text style={{color:page===0?'#fff':'#000',fontWeight:'bold'}}>Company</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{width:130,height:58,backgroundColor:page === 1?'#EC8F05':'gainsboro',justifyContent:'center',
            alignItems:'center',borderRadius:30}}
            onPress={()=>setPage(1)}>
                  <Text style={{color:page===1?'#fff':'#000',fontWeight:'bold'}}>Student</Text>
              </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
        width:'100%'}}>
            {
                page === 0?(<CompanySignIn/>):(null)
            }
            {
                page === 1?(<StudentSignIn/>):(null)
            }
            
            </View>
            <View style={styles.signupContainer}>
                <Text style={styles.accountText}>
                    Don't have account?
                </Text>
                <TouchableOpacity   
                onPress={()=>navigation.goBack()}
                // onPress={()=>navigation.navigate('Signin')}
                >
                <Text style={styles.signupText}
        
                >Sign Up</Text>
           
           </TouchableOpacity>
            </View>
            </View>
            
            </View>
    </View>
   </Modal>
        </View>
    )
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'#fff'
        
    },
    headerContainer:{
       flexDirection:'row' ,
       alignItems:'center',
       justifyContent:'center',
       paddingVertical:10,
       paddingHorizontal:20
    },
    headerTitle:{
      fontSize:20,
      lineHeight:20 * 1.4,
    //   width:Display.setWidth(80),
      textAlign:'center'  

    },
    title:{
fontSize:20,
lineHeight:20 * 1.4,
marginTop:20,
marginBottom:50,
marginHorizontal:20
    },
    content:{
        fontSize:20,
        marginTop:10,
        marginBottom:20,
        marginHorizontal:20,
    },
    inputContainer:{
        backgroundColor:'#fff',
        paddingHorizontal:20,
        marginHorizontal:20,
        borderRadius:8,
        borderWidth:0.5,
        borderColor:'#000',
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
    forgotPasswordContainer:{
        marginHorizontal:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'

    },
    rememberMeText:{
        marginLeft:10,
        fontSize:12,
        lineHeight:12 * 1.4,
        color:'grey'
    },
    forgotPasswordText:{
        fontSize:12,
        lineHeight:12 * 1.4,
        color:'#EC8F05',
        fontWeight:'bold'
    },
    signinButton:{
        backgroundColor:'#000',
        borderRadius:8,
        marginHorizontal:20,
        // height:Display.setHeight(6),
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18 * 1.4,
        color:'#fff',
        
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
    orText:{
        fontSize:15,
        lineHeight:15 * 1.4,
        color:Colors.DEFAULT_BLACK,
        marginLeft:5,
        alignSelf:'center'
    },
    facebookButton:{
        backgroundColor:'blue',
        paddingVertical:15,
        marginHorizontal:20,
        borderRadius:8,
        marginVertical:20,
        justifyContent:'center',
        alignItems:'center'
    },
    googleButton:{
        backgroundColor:'#fff',
        paddingVertical:15,
        marginHorizontal:20,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    }

})
export default SigninScreen


