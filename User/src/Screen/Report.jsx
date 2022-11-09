import React,{useState,useEffect,Component} from 'react'
import { StyleSheet, Text, View ,Image,TouchableOpacity,FlatList} from 'react-native'
import { Divider } from 'react-native-elements'
import { db } from '../../firebase'
//Report
const Report = () => {
    const [Companies,setCompanies]=useState([])
 
    useEffect(()=>{
    
        db.ref('/Logbook').on('value',snap=>{
              
          const Companies=[]
             snap.forEach(action=>{
                 const key=action.key
                 const data =action.val()
                 Companies.push({
                     key:key,
                     ComName:data.ComName,
                     Contributed:data.Contributed,
                     StudentNum:data.StudentNum,
                     name:data.name,
                     email:data.email,
                    Managed:data.Managed,
                    Performed:data.Performed,
                   Produced:data.Produced,
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
                          {" "}{item.ComName}
                        </Text>
                      </View>
                    </View>
                    <Divider style={{width: 90, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>
           
                    <View>
  <Text style={styles.titles}>1. He/she performed his or her tasks in line with what was expected of him/her</Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.Performed}   </Text>
  
  
  </View>
          
                      <View>
  <Text style={styles.titles}>2. He/she contributed with good ideas that added value to the work place</Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.Contributed}   </Text>
  
  
  </View>
  
  <View>
  <Text style={styles.titles}>3. He/she produced high Quality work</Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.Produced}   </Text>
  
  
  </View>
  <View>
  <Text style={styles.titles}>4. He/she managed his/her own time well and met deadlines</Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.Managed}   </Text>
  
  
  </View>
             <View style={{flexDirection:'row'}} >
                 
                  
                 <View style={{marginTop:20,}}>
                 <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  Student Details      </Text>
                 {/* <View style={{flexDirection:'column',alignItems:'stretch',justifyContent:'space-between'}}>
                  <Text>Email:</Text>
                 <Text
                   style={{color:'#032B7A',fontWeight:'bold',fontSize:15}} >
                     
                     {item.email}
             
                 </Text>
              
                 </View> */}
                   <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                   <Text> Student Name:  </Text>
                   <Text> {item.name} </Text>
                 </View>
                 <View style={{flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start'}}>
                   <Text> Student Number:  </Text>
                   <Text> {item.StudentNum} </Text>
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

export default Report

const styles = StyleSheet.create({})