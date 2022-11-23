import { StyleSheet, Text, View,TextInput,Image,TouchableOpacity } from 'react-native'
import React,{useEffect,useState} from 'react'
import { db,auth } from '../../firebase'
import { Divider } from 'react-native-elements'
import Feather from "react-native-vector-icons/Feather"
import { useNavigation } from '@react-navigation/native'
const StudHomeScreen = () => {
    const navigation =useNavigation()
    const [StudentIDC,setStudentIDC]=useState([])
    
    const user = auth.currentUser.uid;
    useEffect(()=>{
   
      db.ref('/AcceptedStudents').on('value',snap=>{
            
        const StudentIDC=[]
           snap.forEach(action=>{
               const key=action.key
               const data =action.val()
               StudentIDC.push({
                   key:key,
                  ComName:data.ComName,
                   Duties:data.Duties,
                   Status:data.Status,location:data.location,
                   IDnumber:data.IDnumber,
                   email:data.email,
                phonenumber:data.phonenumber  
               })
         })
         setStudentIDC(StudentIDC)
        
           
        
       })
    },[])
    const [NewStudentIDC,setNewStudentIDC]=useState([])
  const [searchtext,setSearchtext] = useState('');
    const FilterFunction =(text)=>{
        if(text){
            const newData = StudentIDC.filter(function(item){
                const itemData = item.IDnumber? item.IDnumber
                :''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf( textData)>-1;
    
            })
            setNewStudentIDC(newData)
            setSearchtext(text)
        } 
      
      }
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
      <Text style={{fontWeight:'bold'}}>Enter Your Student Number</Text>

<View
               style={{
                 flexDirection: "row",
                 alignItems: "center",
                 borderColor: "rgba(0,0,0,.2)",
                 borderWidth: 1,
                 height: 60,
                 borderRadius: 15,
                 paddingHorizontal: 5,
                 marginVertical: 10
               }}
             >
               <View
                 style={{
                   justifyContent: "center",
                   alignItems: "center",
                   justifyContent:'center',
                   backgroundColor: "#DEEDF0",
                   width: 40,
                   height: 40,
                   borderRadius: 10
                 }}
               ><Feather name="user" size={22}

               style={{marginRight:10}}/></View>
                <TextInput
                 style={styles.input}
               value={searchtext}
                 placeholder="Enter Student Number"
                 // onChangeText={(text) => Search(text)}
                 onChangeText={(text) => FilterFunction(text)}
               />
             </View>
             {
              NewStudentIDC.map(item=>
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
    </View>
  )
}

export default StudHomeScreen

const styles = StyleSheet.create({
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