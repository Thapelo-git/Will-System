
import React,{useEffect,useState} from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, ImageBackground, StatusBar,  ActivityIndicator
} from 'react-native'
import {Picker} from '@react-native-picker/picker';

import { ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { auth, db } from '../../firebase.jsx'
import { Divider } from 'react-native-elements'
const Logbook = ({navigation}) => {
    const [filteredDataSource, setFilteredDataSource] = useState();
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [Student, setStudent] = useState([])
    const user = auth.currentUser.uid;
    useEffect(() => {
        db.ref('/AcceptedStudents').on('value', snap => {

            const Student = []
            snap.forEach(action => {
                const key = action.key
                const data = action.val()
                Student.push({
                    key: key,
                    IDnumber: data.IDnumber,
                    name: data.name,
                    surname: data.surname, UniversityName: data.UniversityName,
                    completed: data.completed, faculty: data.faculty,Status:data.Status,
                    monthNum: data.monthNum,user:data.user,
                })
                const text=user
                if(text){
                 const newData = Student.filter(function(item){
                     const itemData = item.user ? item.user
                     :'';
                     const textData = text;
                     return itemData.indexOf( textData)>-1;
     
                 })
                 setStudent(newData)
                 setFilteredDataSource(newData);
                 setMasterDataSource(newData);
               }
               

            })
        })
    }, [])
    const Card = ({ element, index }) => {
        return (
           <>
           <View style={{ margin: 20,backgroundColor: '#fff',elevation: 3 }}>
           <View style={{width:'100%'}}>
                      <View style={{ backgroundColor: 'gray', justifyContent: 'flex-start', flexDirection: 'row', padding: 8, alignItems:'center', borderBottomRightRadius:10}}>
                       
                        <Text style={{color: '#fff'}}>
                          Student Number:
                        </Text>
                        <Text style={{color: '#fff'}}>
                          {" "}{element.IDnumber}
                        </Text>
                      </View>
                    </View>

                    <Divider style={{width: 90, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                    {/* event type */}
                    <View style={{flexDirection:'row',}}>
                    <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8, alignItems:'center'}}>
                      <Ionicons name="documents" color='#333' size={20} />
                      <Text style={{paddingHorizontal: 5,color:'#333'}}>
                       faculty of : {element.faculty} 
                      </Text>
                    </View>
                    <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8, alignItems:'center'}}>
                    
                      <Text style={{paddingHorizontal: 5,color:'#333'}}>
                       Duration : {element.monthNum}  month
                      </Text>
                    </View>
                    </View>
                    <Divider style={{width: 120, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                    {/* date */}
                    <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8, alignItems:'center' }}>
                      {/* <Feather
                        name="calendar" size={20}
                        style={{ paddingHorizontal: 5 }}
                        color='blue'
                      /> */}
                      <Text>University Name:</Text>
                      <Text style={{color:'blue', fontSize:12}}>
                        {element.UniversityName} 
                      </Text>
                    </View>

                    <Divider style={{width: 170, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                  {/* location */}
                  <View style={{flexDirection:'row'}}>
                  <View style={{ backgroundColor: '#fff', justifyContent: 'flex-end', flexDirection: 'row', padding: 8 , alignItems:'center'}}>
                    <View>
                    <Text>Name: </Text>
                    <Text style={{color:'#333'}}>
                      {element.name}
                    </Text>
                    </View>
                    <View>
                    <Text>Surname: </Text>
                    <Text style={{color:'#333'}}>
                      {element.surname}
                    </Text>
                    </View>
                  </View>
                  <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8 , alignItems:'center'}}>
                    <View>
                    <Text>modules Completed: </Text>
                    <Text style={{color:'#333'}}>
                      {element.completed}
                    </Text>
                    </View>
                    
                  </View>
                  </View>
                  <Divider style={{width: 200, justifyContent:'flex-end', alignItems:'flex-end', alignSelf:'flex-end'}}/>

                  {/* description */}
                  <View style={{ justifyContent: 'center',  padding: 8,marginHorizontal:10 }}>
                  <TouchableOpacity style={styles.signinButton}
               onPress={()=>navigation.navigate('LogScreen',{name:element.name,StudentNum:element.IDnumber})}>
                <Text style={styles.signinButtonText}>Start Logbook</Text>
            </TouchableOpacity>
                  </View>
                  </View>
           </>)
    }
  return (
    <View>
              <View style={styles.headerContainer}
            >
     <Text style={styles.headerTitle}>List of Students you Accepted</Text>
            </View>
       <FlatList
                    keyExtractor={(_, key) => key.toString()}
                   
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 20 }}
                    data={Student}
                    renderItem={({ item, index }) => <Card element={item} index={index} />}
                />
    </View>
  )
}

export default Logbook

const styles = StyleSheet.create({
    signinButton:{
        backgroundColor:'#4bb543',
        borderRadius:8,
        marginHorizontal:20,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
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