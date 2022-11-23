
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, StatusBar,  Alert
} from 'react-native' 
import React,{useEffect,useState} from 'react'
import { db,auth } from '../../firebase'
import { Divider } from 'react-native-elements'
import Feather from "react-native-vector-icons/Feather"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native'
const PolProfile = () => {
    const navigation =useNavigation()
  const onSignout =()=>{
    // auth
    // .signOut()
    navigation.navigate('Welcome')
    
}
const [Student, setStudent] = useState([])

    const user = auth.currentUser.uid;
    useEffect(() => {
        db.ref('/Appointment').on('value', snap => {

            const Student = []
            snap.forEach(action => {
                const key = action.key
                const data = action.val()
                Student.push({
                    key: key,
                    email:data.email,interviewDate:data.interviewDate,
                    interviewTime:data.interviewTime,title:data.title,
             
                    Status:data.Status
                })
                setStudent(Student)
               
               

            })
        })

    }, [])
    const updateAccept = (key,) => {
        db.ref('Appointment').child(key).update({Status:"Accepted"})
        .then(()=>db.ref('Appointment').once('value'))
        .then(snapshot=>snapshot.val())
        .catch(error => ({
          errorCode: error.code,
          errorMessage: error.message
        }))
      
  
    }
    const Card = ({ element, index }) => {
        return (
           <>
           <View style={{ margin: 20,backgroundColor: '#fff',elevation: 3 ,height:150}}>
           <View style={{width:'100%'}}>
                      <View style={{ backgroundColor: '#fff', justifyContent: 'flex-start', flexDirection: 'row', padding: 8, alignItems:'center', borderBottomRightRadius:10}}>
                       
                        <Text >
                          
                        </Text>
                        <Text >
                          {" "}{element.email}
                        </Text>
                      </View>
                    </View>

                    <Divider style={{width: 90, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                    {/* event type */}
                    <View style={{flexDirection:'row',}}>
                    <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'column', padding: 8, alignItems:'center'}}>
                      {/* <Ionicons name="documents" color='#333' size={20} /> */}
                      <Text style={{paddingHorizontal: 5,color:'#333'}}>
                     Date
                      </Text>
                      <Text style={{paddingHorizontal: 5,color:'#333'}}>
                        {element.interviewDate}  
                      </Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'column', padding: 8, alignItems:'center'}}>
                    <Text style={{paddingHorizontal: 5,color:'#333'}}>
                       Time 
                      </Text>
                      <Text style={{paddingHorizontal: 5,color:'#333'}}>
                       {element.interviewTime}  
                      </Text>
                    </View>
                    </View>
                    <Divider style={{width: 120, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>
                    <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'column', padding: 8, alignItems:'center'}}>
                    <Text style={{paddingHorizontal: 5,color:'#333'}}>
                       Description 
                      </Text>
                      <Text style={{paddingHorizontal: 5,color:'#333'}}>
                       {element.title}  
                      </Text>
                    </View>
                    <Divider style={{width: 120, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>
                    {/* date */}
                    <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8, alignItems:'center' }}>
                      {/* <Feather
                        name="calendar" size={20}
                        style={{ paddingHorizontal: 5 }}
                        color='blue'
                      /> */}
                      <Text>Status:</Text>
                      <Text style={{color:'blue', fontSize:12}}>
                        {element.Status}
                      </Text>
                    </View>

                    <Divider style={{width: 170, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                  {/* location */}
  
                 
                  {/* description */}
                  <View style={{ justifyContent: 'center',  padding: 8,marginHorizontal:10 }}>
                  <TouchableOpacity onPress={()=>updateAccept(element.key)}>
        <Text>Approve</Text>
        </TouchableOpacity>
                  </View>
                  </View>
           </>)
    }
  return (
    <View style={{backgroundColor: '#ffffff', justifyContent: 'center', 
        alignItems: 'center', alignContent: 'center', width: '100%'}}>
             <TouchableOpacity onPress={onSignout} style={{backgroundColor:'red', width:140, marginTop: 50, borderRadius:5, padding:5}}>

<View style={{flexDirection: 'row', justifyContent:'center'}}>


</View>
</TouchableOpacity>
            <TouchableOpacity onPress={onSignout} style={{backgroundColor:'red', width:140, marginTop: 50, borderRadius:5, padding:5}}>

<View style={{flexDirection: 'row', justifyContent:'center'}}>
<Icon
    name='ios-log-out'
    type='Ionicon'
    color='#fff'
    size={25}/>
    <Text style={{padding: 5, paddingTop: -15, fontSize: 18, color: '#fff'}}>
        Log-out
    </Text>
</View>
</TouchableOpacity>
         
            
                <View style={{flexDirection:'column',justifyContent:'flex-start', 
                    width: '100%', height: '100%', alignItems:'flex-start', paddingBottom: 20, paddingLeft: 20}}>

                    {/* Settings Tabs    */}
                    
                    <View style={{paddingTop: 70, width: '100%', height: 1000}}>

                    <FlatList
            keyExtractor={(_, key) => key.toString()}
           horizontal
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20 }}
            data={Student}
            renderItem={({ item, index }) => <Card element={item} index={index} />}
        />

                    {/* Logout     */}

                   

                    </View>
                    
                    
                </View>
                
        </View>
  )
}

export default PolProfile
const styles = StyleSheet.create({
  moreContainer: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      alignContent: 'flex-start',
      
  },
  moreIcon: {
      color: '#d6d7da',
      paddingRight:15,
      justifyContent: 'flex-end'
  }
})