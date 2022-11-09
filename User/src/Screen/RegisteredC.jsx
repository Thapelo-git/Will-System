import React,{useState,useEffect,Component} from 'react'
import { StyleSheet, Text, View ,Image,TouchableOpacity,FlatList} from 'react-native'
import { Divider } from 'react-native-elements'
import { db } from '../../firebase'
const RegisteredC = () => {
    const [Companies,setCompanies]=useState([])
 
    useEffect(()=>{
    
        db.ref('/Company').on('value',snap=>{
              
          const Companies=[]
             snap.forEach(action=>{
                 const key=action.key
                 const data =action.val()
                 Companies.push({
                     key:key,
                     Duties:data.Duties,
                     contactPerson:data.contactPerson,
                     location:data.location,
                     email:data.email,
                     name:data.name,
                    phonenumber:data.phonenumber,
                 })
                })
                
            
                  setCompanies(Companies)
             
                 
                }
              
        )
         
         
      },[])
      const NewCard = ({ item, index }) => {
        return (
           
                <>
                <View style={{ margin: 5,backgroundColor: '#fff',elevation: 3 }}>
           <View style={{width:250,padding:10}}>
           <View style={{width:'100%'}}>
                      <View style={{ backgroundColor: '#fff', justifyContent: 'flex-start', flexDirection:'column', padding: 8, alignItems:'center', borderBottomRightRadius:10}}>
                       <Text>company name:</Text>
                   
                        <Text style={{fontWeight:'bold'}}>
                          {" "}{item.name}
                        </Text>
                      </View>
                    </View>
                    <Divider style={{width: 90, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>
           
          
           <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  location    </Text>
                      <View>
  <Text style={styles.titles}>{item.location}</Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
 Duties    </Text>
  
  <Text>{item.Duties}</Text>
  </View>
  
  
             <View style={{flexDirection:'row'}} >
                 
                  
                 <View style={{marginTop:20,}}>
                 <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  Contact Person       </Text>
                 <View style={{flexDirection:'column',alignItems:'stretch',justifyContent:'space-between'}}>
                  <Text>Email:</Text>
                 <Text
                   style={{color:'#032B7A',fontWeight:'bold',fontSize:15}} >
                     
                     {item.email}
             
                 </Text>
              
                 </View>
                   <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                   <Text> Name:  </Text>
                   <Text> {item.contactPerson} </Text>
                 </View>
                 <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                   <Text> Phonenumber:  </Text>
                   <Text> {item.phonenumber} </Text>
                 </View>
                 </View>
                 </View>
                 <Divider style={{width: 90, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>
                   
                  
                
                    </View>
                  </View>
                </>
           
        )
          
    }
  return (
    <FlatList
    keyExtractor={(_, key) => key.toString()}
   horizontal
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingLeft: 20 }}
    data={Companies}
    renderItem={({ item, index }) => <NewCard item={item} index={index} />}
/>
  )
}

export default RegisteredC

const styles = StyleSheet.create({})