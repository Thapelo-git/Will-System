import { StyleSheet, Text, View,Image,SafeAreaView,TouchableOpacity } from 'react-native'
import React, {Component} from 'react';


const GetStarted = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor:'#fff',flex:1,justifyContent:'center',alignItems:'center'}}>
    <View>
     <Image style={{height:150,width:150}} source={require('../assets/Images/logo.png')}/>
    </View>
    <Text style={styles.content}>Wil(Workplace Intergrated Learning)</Text>
    <TouchableOpacity style={styles.signinButton}
    onPress={()=>navigation.navigate('Signin')}>
                <Text style={styles.signinButtonText}
                
                >Sign In</Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
                <Text style={styles.accountText}>
                    Don't have account?
                </Text>
                <Text style={styles.signupText}
                onPress={()=>navigation.navigate('Signup')}
                >Sign Up</Text>
            </View>
    </SafeAreaView>
  )
}

export default GetStarted

const styles = StyleSheet.create({
    signinButton:{
        backgroundColor:'#000',
        borderRadius:8,
        marginHorizontal:20,
        marginVertical:20,
        justifyContent:'center',
        alignItems:'center',
       height:45,width:260
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
        color:'#000'
    },
    signupText:{
        fontSize:13,
        lineHeight:13 * 1.4,
        color:'#EC8F05',
        marginLeft:5,

    },
    content:{
        fontSize:20,
        marginTop:10,
        marginBottom:20,
        marginHorizontal:20,
    },
})