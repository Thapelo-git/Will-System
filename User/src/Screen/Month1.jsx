import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native'
import React,{useEffect,useState} from 'react'
import { db,auth } from '../../firebase'
import {Picker} from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
//Month2
const Month1 = ({navigation,route}) => {
    const [StudentNum,setStudentNum]=useState(route.params.StudentNum)
    const [name, setname] = useState(route.params.name)
    const [ComName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [task1,setTask1]=useState('')
    const [Week1,setWeek1]=useState('')
    const [Day1,setDay1]=useState('')
    const [Evaluation1,setEvaluation1]=useState('Poor')
    const [task2,setTask2]=useState('')
    const [Week2,setWeek2]=useState('')
    const [Day2,setDay2]=useState('')
    const [Evaluation2,setEvaluation2]=useState('Poor')
  const [Comment,setComment]=useState('Successfully Added')
  const [Absent,setAbsent]=useState('')
  const [Reason,setReason]=useState('')
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
           month:'Month1',task1,Week1,Day1,Evaluation1,
           task2,Week2,Day2,Evaluation2,Absent,Reason
          })
          setComment('Successfully Added')
          setTask1(''),setTask2(''),setDay1(''),setDay2(''),
          setWeek1(''),setWeek2('')
    }
  return (
    <View>
           <View style={styles.headerContainer}
            >
     <Text style={styles.headerTitle}>Month 1</Text>
            </View>
            <View>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
<TextInput placeholder="Summary of Tasks"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                   
                    onChangeText={(text)=>setTask1(text)}
             value={task1}
         
                    />
                    </View></View>
                    <View style={{flexDirection:'row',padding:1}}>
                    <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
<TextInput placeholder="Weeks"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='numeric'
                    onChangeText={(text)=>setWeek1(text)}
             value={Week1}
         
                    />
                    </View></View> 
                    <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
<TextInput placeholder="Days"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='numeric'
                    onChangeText={(text)=>setDay1(text)}
             value={Day1}
         
                    />
                    </View></View>
                    </View> 
                    <Picker
    selectedValue={Evaluation1}
    style={{ width: 300, height: 50, backgroundColor: '#eee' }}
    onValueChange={(text)=>setEvaluation1(text)}   
            
>
    <Picker.Item label="1.Poor" value="Poor" />
    <Picker.Item label="2.Satisfactory" value="Satisfactory" />
    <Picker.Item label="3.Good" value="Good" />
    
</Picker> 
            </View>
            <View>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
<TextInput placeholder="Summary of Tasks"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                   
                    onChangeText={(text)=>setTask2(text)}
             value={task2}
         
                    />
                    </View></View>
                    <View style={{flexDirection:'row',padding:1}}>
                    <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
<TextInput placeholder="Weeks"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='numeric'
                    onChangeText={(text)=>setWeek2(text)}
             value={Week2}
         
                    />
                    </View></View> 
                    <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
<TextInput placeholder="Days"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='numeric'
                    onChangeText={(text)=>setDay2(text)}
             value={Day2}
         
                    />
                    </View></View>
                    </View> 
                    <Picker
    selectedValue={Evaluation2}
    style={{ width: 300, height: 50, backgroundColor: '#eee' }}
    onValueChange={(text)=>setEvaluation2(text)}   
            
>
    <Picker.Item label="1.Poor" value="Poor" />
    <Picker.Item label="2.Satisfactory" value="Satisfactory" />
    <Picker.Item label="3.Good" value="Good" />
    
</Picker> 
            </View>
            <Text>Number of days absent from work</Text>
            <View style={{flexDirection:'row',padding:1}}>
                    <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
<TextInput placeholder="Number of days absent from work"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    keyboardType='numeric'
                    onChangeText={(text)=>setAbsent(text)}
             value={Absent}
         
                    />
                    </View></View> 
                    <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
<TextInput placeholder="Reason"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    
                    onChangeText={(text)=>setReason(text)}
             value={Reason}
         
                    />
                    </View></View>
                    </View> 
<TouchableOpacity style={styles.signinButton}
         onPress={()=>Addlogbook()} >
                <Text style={styles.signinButtonText}>Submit</Text>
            </TouchableOpacity>


    </View>
  )
}

export default Month1

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
    inputContainer:{
        backgroundColor:'#fff',
   marginVertical:10,
   borderWidth:1,
   borderColor:'#000',
   justifyContent:'center',
   width:200,
   height:40
       },
       inputSubContainer:{
           flexDirection:'row',
           alignItems:'center'
       },
       inputText:{
           fontSize:18,
           textAlignVertical:'center',
           padding:0,
           height:60,
           color:'#000',
          
   
       },
       signinButton:{
        backgroundColor:'blue',
      
        marginHorizontal:20,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
    },
    signinButtonText:{
        fontSize:18,
        lineHeight:18 * 1.4,
        color:'#fff',
        
    },
})