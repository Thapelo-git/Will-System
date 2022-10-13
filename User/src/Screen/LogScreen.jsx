import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import { db,auth } from '../../firebase'
const LogScreen = ({navigation,route}) => {
    const [StudentNum,setStudentNum]=useState(route.params.StudentNum)
    const [name, setname] = useState(route.params.name)
    const [ComName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [Gender,setGender]=useState('Male')
    const [Subject,setSubject]=useState('')
    const [Avalability,setAvalability]=useState('Public')
    const [StartDate,setStartDate]=useState('Weekends')
    const user = auth.currentUser.uid;
    useEffect(() => {
       
        db.ref('/Company/' + user).on('value', snap => {

            setName(snap.val() && snap.val().name);
            setPhonenumber(snap.val().phonenumber)
            setEmail(snap.val().email)
            
        })



    }, [])
    const Addlogbook=()=>{
        db.ref('Logbook').push({
            ComName,email,phonenumber,
            StudentNum,name,
            location,
            Description,
            date,
            price,
            time
           ,
          })
    }
  return (
    <View>
      <Text>{StudentNum}</Text>
    </View>
  )
}

export default LogScreen

const styles = StyleSheet.create({})