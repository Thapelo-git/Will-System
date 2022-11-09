import React, { useState, useEffect, useRef } from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, StatusBar,  Alert
} from 'react-native' 
import { db,auth } from '../../firebase';
//StudentList
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Divider } from 'react-native-paper';
const { width } = Dimensions.get("screen")
const cardWidth = width / 1.8
const AdminAdd = ({navigation}) => {
    const [CurrentName, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [PhoneNum, setPhonenumber] = useState('')
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [Student, setStudent] = useState([])

    const user = auth.currentUser.uid;
    useEffect(() => {
        db.ref('/Student').on('value', snap => {

            const Student = []
            snap.forEach(action => {
                const key = action.key
                const data = action.val()
                Student.push({
                    key: key,
                    name:data.name,surname:data.surname,
                    IDnumber:data.IDnumber,UniversityName:data.UniversityName,
                    completed:data.completed, monthNum:data.monthNum,faculty:data.faculty,
                    Status:data.Status
                })
                setStudent(Student)
               
               

            })
        })

    }, [])
    const handleDelete=(key)=>{
      Alert.alert('Confirm','Are you sure you want to delete?',[
        {text:'Yes',
       onPress:()=>db.ref('Student').child(key).remove(),
      },
      {text:'No'},
      ]);
      
  
      }
   
   
  const [name,setStudentName]=useState('')
  const [surname,setSurname]=useState('') 
  const [IDnumber,setIDnumber]=useState('')
  const [UniversityName,setUniversityName]=useState('')
  const [completed,setCompleted]=useState('')
  const [monthNum,setMonthNum]=useState('')
  const [faculty,setFaculity]=useState('')
  const [Status,setStatus]=useState('Pending')
  const Seats= 65
  const addPrice = () => {
    
    db.ref('Student').push({name,surname,IDnumber,
        UniversityName,completed,
        monthNum,faculty,Status})
   
  
  };
  return (
    <View>
        <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8, alignItems:'center'}}>
        <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    
                    
                    <TextInput placeholder="Enter Name"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                  
                    onChangeText={(text)=>setStudentName(text)}
             value={name}
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    
                    
                    <TextInput placeholder="Enter Surname"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    
                    onChangeText={(text)=>setSurname(text)}
             value={surname}
                    />
                </View>
            </View>   
        </View>
        <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8, alignItems:'center'}}>
        <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    
                    
                    <TextInput placeholder="Student Number"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='numeric'
                    onChangeText={(text)=>setIDnumber(text)}
             value={IDnumber}
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    
                    
                    <TextInput placeholder="Enter Faculty"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    
                    onChangeText={(text)=>setFaculity(text)}
             value={faculty}
                    />
                </View>
            </View>   
        </View>
      <View style={{ backgroundColor: '#fff', justifyContent:'flex-start', flexDirection: 'row', padding: 8, alignItems:'center'}}>
      <View>
<Text style={styles.titles}>University Name:</Text>

<Picker
     selectedValue={UniversityName}
     style={{ width: 160, height: 50, backgroundColor: '#eee' }}
     onValueChange={(text)=>setUniversityName(text)}   >
     
    <Picker.Item label="select" value="" />
    <Picker.Item label="TUT" value="TUT" />
    <Picker.Item label="UL" value="UL" />
    <Picker.Item label="UP" value="UP" />
    <Picker.Item label="UJ" value="UJ" />
    <Picker.Item label="VUT" value="VUT" />
    <Picker.Item label="Wits" value="Wits" />
    <Picker.Item label="UNISA" value="UNISA" />
    <Picker.Item label="UCT" value="UCT" />
</Picker>
</View>
<View>
<Text style={styles.titles}>Student completed all modules ?</Text>

<Picker
     selectedValue={completed}
     style={{ width: 160, height: 50, backgroundColor: '#eee' }}
     onValueChange={(text)=>setCompleted(text)}   >
    <Picker.Item label="select" value="" />
    <Picker.Item label="No" value="No" />
    <Picker.Item label="Yes" value="Yes" />
    
</Picker>
</View>
      </View>
      <Text style={{marginVertical:10}}>Total number of Months required </Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    
                    
                    <TextInput placeholder="month number"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='numeric'
                    onChangeText={(text)=>setMonthNum(text)}
             value={monthNum}
                    />
                </View>
            </View>
            <View>



</View>
<View style={{ justifyContent: 'center',  padding: 8,marginHorizontal:10 }}>
                  <TouchableOpacity style={styles.signinButton}
              onPress={()=>addPrice()} >
                <Text style={styles.signinButtonText}>Add </Text>
            </TouchableOpacity>
                  </View>
      
        
      
    </View>
  )
}

export default AdminAdd

const styles = StyleSheet.create({
    signinButton:{
        backgroundColor:'#fff',
        borderWidth:1,
        marginHorizontal:20,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18 * 1.4,
        color:'#000',
        
    },
    // headerContainer: {
    //   top: 10,
    //   flexDirection: 'row', justifyContent: 'space-between',
    //   alignContent: 'center'
  
  
    // },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
      paddingHorizontal: 20
  },
  inputContainer:{
    backgroundColor:'#fff',
marginVertical:10,
borderWidth:1,
borderColor:'#000',
justifyContent:'center',
width:150
   },
   inputSubContainer:{
       flexDirection:'row',
       alignItems:'center'
   },
   
})