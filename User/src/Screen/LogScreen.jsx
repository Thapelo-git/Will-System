import { StyleSheet, Text, View ,TextInput,TouchableOpacity} from 'react-native'
import React,{useEffect,useState} from 'react'
import { db,auth } from '../../firebase'
import {Picker} from '@react-native-picker/picker';
import { ScrollView } from 'react-native-gesture-handler';
const LogScreen = ({navigation,route}) => {
    const [StudentNum,setStudentNum]=useState(route.params.StudentNum)
    const [name, setname] = useState(route.params.name)
    const [ComName, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [Contributed,setContributed]=useState('Never')
    const [Performed,setPerformed]=useState('Never')
    const [Produced,setProduced]=useState('Never')
    const [Managed,setManaged]=useState('Never')
    const [Comment,setComment]=useState('')
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
           Contributed,Performed,Produced,
           Managed
           
          })
          setComment('Successfully Added')
    }
  return (
    <View>
           <View style={styles.headerContainer}
            >
     <Text style={styles.headerTitle}>Evaluation Form</Text>
            </View>
            
                <View style={{width:'100%',height:'100%',padding:10,backgroundColor:'#fff'}}>
      <Text style={{marginVertical:10}}>He/she contributed with good ideas that 
      added value to the work place</Text>

<Picker
    selectedValue={Contributed}
    style={{ width: 300, height: 50, backgroundColor: '#eee' }}
    onValueChange={(text)=>setContributed(text)}   
            
>
    <Picker.Item label="1.Never" value="Never" />
    <Picker.Item label="2.Seldom" value="Seldom" />
    <Picker.Item label="3.Sometimes" value="Sometimes" />
    <Picker.Item label="4.Frequently" value="Frequently" />
    <Picker.Item label="5.Always" value="Always" />
</Picker>
<Text style={{marginVertical:10}}>He/she performed his or her tasks in line
with what was expected of him/her</Text>

<Picker
    selectedValue={Performed}
    style={{ width: 300, height: 50, backgroundColor: '#eee' }}
    onValueChange={(text)=>setPerformed(text)}   
            
>
    <Picker.Item label="1.Never" value="Never" />
    <Picker.Item label="2.Seldom" value="Seldom" />
    <Picker.Item label="3.Sometimes" value="Sometimes" />
    <Picker.Item label="4.Frequently" value="Frequently" />
    <Picker.Item label="5.Always" value="Always" />
</Picker>
<Text style={{marginVertical:10}}>He/she produced high Quality work</Text>

<Picker
    selectedValue={Produced}
    style={{ width: 300, height: 50, backgroundColor: '#eee' }}
    onValueChange={(text)=>setProduced(text)}   
            
>
    <Picker.Item label="1.Never" value="Never" />
    <Picker.Item label="2.Seldom" value="Seldom" />
    <Picker.Item label="3.Sometimes" value="Sometimes" />
    <Picker.Item label="4.Frequently" value="Frequently" />
    <Picker.Item label="5.Always" value="Always" />
</Picker>
<Text style={{marginVertical:10}}>He/she managed his/her own time well and 
met deadlines</Text>

<Picker
    selectedValue={Managed}
    style={{ width: 300, height: 50, backgroundColor: '#eee' }}
    onValueChange={(text)=>setManaged(text)}   
            
>
    <Picker.Item label="1.Never" value="Never" />
    <Picker.Item label="2.Seldom" value="Seldom" />
    <Picker.Item label="3.Sometimes" value="Sometimes" />
    <Picker.Item label="4.Frequently" value="Frequently" />
    <Picker.Item label="5.Always" value="Always" />
</Picker>
<TouchableOpacity style={styles.signinButton}
         onPress={()=>Addlogbook()} >
                <Text style={styles.signinButtonText}>Submit</Text>
            </TouchableOpacity>
            <Text style={{color:'green'}}>{Comment}</Text>
{/* <Text style={{marginVertical:10}}>If Other specify</Text>
<View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>

                    <TextInput placeholder="Enter Comment"
                    selectionColor='gainsboro'
                    style={styles.inputText}
                    onChangeText={(text)=>setComment(text)}
                    
                    value={Comment}
          
                    />
                </View>
            </View> */}
</View>

    </View>
  )
}

export default LogScreen

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
   width:'100%'
       },
       inputSubContainer:{
           flexDirection:'row',
           alignItems:'center'
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