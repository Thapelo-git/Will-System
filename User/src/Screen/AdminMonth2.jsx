import React,{useState,useEffect,Component} from 'react'
import { StyleSheet, Text, View ,Image,TouchableOpacity,FlatList} from 'react-native'
import { Divider } from 'react-native-elements'
import { db } from '../../firebase'
//AdminMonth1
const AdminMonth2 = () => {
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
                    
                     StudentNum:data.StudentNum,
                     name:data.name,
                     email:data.email,
                     
                    month:data.month,task1:data.task1,
                    Week1:data.Week1,Day1:data.Day1,Evaluation1:data.Evaluation1,
                    task2:data.task1,Week2:data.Week2,Day2:data.Day2,Evaluation2:data.Evaluation2
                    ,Absent:data.Absent,Reason:data.Reason
                 })
                })
                
                const text='Month2'
                if(text){
                 const newData = Companies.filter(function(item){
                     const itemData = item.month ? item.month
                     :'';
                     const textData = text;
                     return itemData.indexOf( textData)>-1;
     
                 })
                 setCompanies(newData)
                 
               }
                  
             
                 
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
  <Text style={styles.titles}>Summary of Tasks 1</Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.task1}   </Text>
  
  
  </View>
  <View style={{flexDirection:'row',}}>
  <View>
  <Text style={styles.titles}>Days 1</Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.Day1}   </Text>
  
  
  </View>
  <View>
  <Text style={styles.titles}>Weeks </Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.Week1}   </Text>
  
  
  </View>
  <View>
  <Text style={styles.titles}>Evaluation </Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.Evaluation1}   </Text>
  
  
  </View>
  </View>     
  <View>
  <Text style={styles.titles}>Summary of Tasks 2</Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.task2}   </Text>
  
  
  </View>
  <View style={{flexDirection:'row',}}>
  <View>
  <Text style={styles.titles}>Days 1</Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.Day2}   </Text>
  
  
  </View>
  <View>
  <Text style={styles.titles}>Weeks </Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.Week2}   </Text>
  
  
  </View>
  <View>
  <Text style={styles.titles}>Evaluation </Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.Evaluation2}   </Text>
  
  
  </View>
  </View> 
  <View>
  <Text style={styles.titles}>Number of days Absent</Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.Absent}   </Text>
  
  
  </View>
  <View>
  <Text style={styles.titles}>Reason</Text>
  <Text style={{color:'#032B7A',fontWeight:'bold',fontSize:15}}>
  {item.Reason}   </Text>
  
  
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

export default AdminMonth2

const styles = StyleSheet.create({})