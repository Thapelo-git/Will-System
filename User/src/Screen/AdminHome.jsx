import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'

import { useNavigation } from '@react-navigation/native'
import { auth } from '../../firebase'
import RegisteredC from './RegisteredC'
import Report from './Report'
import AdminAdd from './AdminAdd'
import StudentList from './StudentList'
//AdminHome
const AdminHome = () => {
    const navigation =useNavigation()
    const [page,setPage]=useState(0)
    const onSignout =()=>{
    //   auth.signOut()
      navigation.navigate('Welcome')
       
  }
  return (
    <View>
      <View style={styles.headerContainer}>
     <Text style={styles.headerTitle}></Text>
            </View> 
         <View style={styles.headerContainer}
        >
          <TouchableOpacity style={{
            backgroundColor: 'white',
            opacity: 0.7, width: '100%',
            height: 30, justifyContent: 'center', alignItems: 'center',
            borderRadius: 10,
          }}>
           <Text style={styles.headerTitle}
          onPress={()=>onSignout()}>Logout</Text>
          </TouchableOpacity>
          
        </View>
        <View style={{justifyContent:'center',alignItems:'center',}}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
    width:250,height:60,padding:10}}>
          <TouchableOpacity style={{width:80,height:45,borderColor:page === 0?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}} 
        onPress={()=>setPage(0)}>
              <Text style={{color:page===0?'#3EA055':'gainsboro',fontWeight:'bold'}}>Add IDC Students</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:80,height:45,borderColor:page === 1?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}} 
        onPress={()=>setPage(1)}>
              <Text style={{color:page===1?'#3EA055':'gainsboro',fontWeight:'bold'}}>Registered Companies</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:80,height:45,borderColor:page === 2?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}}
        onPress={()=>setPage(2)}>
              <Text style={{color:page===2?'#3EA055':'gainsboro',fontWeight:'bold'}}>Logbook Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:80,height:45,borderColor:page === 3?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}}
        onPress={()=>setPage(3)}>
              <Text style={{color:page===3?'#3EA055':'gainsboro',fontWeight:'bold'}}>IDC Students</Text>
          </TouchableOpacity>
      </View>
      <View style={{
    width:'100%',}}>
          {
            page === 0?(<AdminAdd navigation={navigation}/>):(null)
        }
      {
            page === 1?(<RegisteredC/>):(null)
        }
    
         {
            page === 2?(<Report/>):(null)
        }
         {
            page === 3?(<StudentList/>):(null)
        }
        
        </View>
      
        </View>
  
    </View>
  )
}

export default AdminHome

const styles = StyleSheet.create({
    signinButton:{
        backgroundColor:'#000',
        borderWidth:1,
        marginHorizontal:20,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        width:'100%'
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18 * 1.4,
        color:'#fff',
        
    },
 
  
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20
},
headerTitle: {
    fontSize: 20,
    lineHeight: 20 * 1.4,  
    textAlign: 'center'

},
})