import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { db,auth } from '../../firebase'
const StudentHome = () => {
    const user = auth.currentUser.uid;
    const [StudentNum,setStudentNum]=useState('')
    const [filteredDataSource, setFilteredDataSource] = useState();
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [Student, setStudent] = useState([])
    const [ComName, setName] = useState('')
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
                    monthNum: data.monthNum,ComName:data.ComName,email,phonenumber,
                     Duties:data.Duties,location:data.location
                })
                const text=StudentNum
                if(text){
                 const newData = Student.filter(function(item){
                     const itemData = item.IDnumber ? item.IDnumber
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
     
        db.ref('/IDCStudent/' + user).on('value', snap => {

            setName(snap.val() && snap.val().name);
            setStudentNum(snap.val().IDnumber)
            
        })


    }, [])
    const Card = ({ element, index }) => {
        return (
           <>
           <View style={{ margin: 20,backgroundColor: '#fff',elevation: 3 }}>
           <View style={{width:'100%'}}>
                      <View style={{ backgroundColor: 'gray', justifyContent: 'flex-start', flexDirection: 'row', padding: 8, alignItems:'center', borderBottomRightRadius:10}}>
                       
                        <Text style={{color: '#fff'}}>
                          Company Name:
                        </Text>
                        <Text style={{color: '#fff'}}>
                          {" "}{element.ComName}
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
                  {/* <View style={{ justifyContent: 'center',  padding: 8,marginHorizontal:10 }}>
                  <TouchableOpacity style={styles.signinButton}
              onPress={()=>updateAccept(element.key,'Accepted',element.IDnumber,
              element.faculty,element.monthNum,element.UniversityName,element.name,
              element.surname)} >
                <Text style={styles.signinButtonText}
                
                >Accept</Text>
            </TouchableOpacity>
                  </View> */}
                  </View>
           </>)
    }
  return (
    <View>
           <FlatList
                    keyExtractor={(_, key) => key.toString()}
                   horizontal
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingLeft: 20 }}
                    data={Student}
                    renderItem={({ item, index }) => <Card element={item} index={index} />}
                />
    </View>
  )
}

export default StudentHome

const styles = StyleSheet.create({})