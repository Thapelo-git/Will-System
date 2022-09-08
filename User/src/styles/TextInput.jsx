import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FONTS } from './Font'
import COLORS from './Colors'
import Icon from 'react-native-vector-icons'
const TextInput = ({placeholder,keyboardType,onChangeText,value,name,type}) => {
    return (
        <View style={styles.inputContainer}>
        <View style={styles.inputIconView}>
            <Icon 
            styel={{color:'#fff',textAlign:'center',
        fontSize:18}}
            />
        </View>
            <TextInput
             style={styles.inputs}
             />
        
        </View>
    )
}

export default TextInput

const styles = StyleSheet.create({
    inputs:{
        borderBottomColor:'#fff',
        flex:1,
        paddingLeft:10,
        fontFamily:FONTS.Regular,
    },
    inputContainer:{
        borderRadius:30,
        height:48,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        elevation:2,

    },
    inputIconView:{
        width:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#4A1DD6',
        height:'100%',
        borderRadius:30,
        alignSelf:'center',
        borderTopRightRadius:0,
        borderBottomRightRadius:0,
        elevation:2,
    }
})
