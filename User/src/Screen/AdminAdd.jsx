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
import AdminMonth1 from './AdminMonth1';
import AdminMonth2 from './AdminMonth2';
import AdminMonth3 from './AdminMonth3';
import AdminMonth4 from './AdminMonth4';
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
  const [page,setPage]=useState(0)
  return (
    <View>
      <View style={{justifyContent:'center',alignItems:'center',}}>
      <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',
    width:250,height:60,padding:10}}>
          <TouchableOpacity style={{width:80,height:45,borderColor:page === 0?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}} 
        onPress={()=>setPage(0)}>
              <Text style={{color:page===0?'#3EA055':'gainsboro',fontWeight:'bold'}}>Month1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:80,height:45,borderColor:page === 1?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}} 
        onPress={()=>setPage(1)}>
              <Text style={{color:page===1?'#3EA055':'gainsboro',fontWeight:'bold'}}>Month2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:80,height:45,borderColor:page === 2?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}}
        onPress={()=>setPage(2)}>
              <Text style={{color:page===2?'#3EA055':'gainsboro',fontWeight:'bold'}}>Month3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{width:80,height:45,borderColor:page === 3?'#3EA055':'gainsboro',justifyContent:'center',
        alignItems:'center',borderWidth:1}}
        onPress={()=>setPage(3)}>
              <Text style={{color:page===3?'#3EA055':'gainsboro',fontWeight:'bold'}}>Month4</Text>
          </TouchableOpacity>
      </View>
      <View style={{
    width:'100%',}}>
          {
            page === 0?(<AdminMonth1/>):(null)
        }
      {
            page === 1?(<AdminMonth2/>):(null)
        }
    
         {
            page === 2?(<AdminMonth3/>):(null)
        }
         {
            page === 3?(<AdminMonth4/>):(null)
        }
        
        </View>
      
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