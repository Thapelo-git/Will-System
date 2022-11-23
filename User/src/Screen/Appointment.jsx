import { StyleSheet, Text, View ,SafeAreaView,TouchableOpacity,TextInput,
    Button,Alert,Image} from 'react-native'
    import React,{useState,useEffect,Component} from 'react'
    import DateTimePicker from '@react-native-community/datetimepicker'
    import moment from 'moment'
    //Appointment
    import Icon from "react-native-vector-icons/Ionicons"
    import { db } from '../../firebase'
    import FontAwesome from 'react-native-vector-icons/FontAwesome'
    import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
  
    const Appointment = ({route}) => {
      
      const [email,setEmail]=useState('TUT Facilitator')
      const [phonenumber,setPhonenumber]=useState('0789654123')
      const [date, setDate] = useState(new Date());
      const [mode, setMode] = useState("date");
      const [show, setShow] = useState(false);
      const [displayDate, setDisplayDate] = useState();
      const [uid,setUid]=useState('')
   
      
      const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === "ios");
        setDate(currentDate);
        setDateIsSet(true);
        console.log(currentDate, "-------");
        if (mode === "date") {
          showMode("time");
          const d = moment(currentDate).format("d MMM");
          setDisplayDate(d);
          console.log(d, "<<<------->>>>>");
    
          setShow(false);
        }
    
      };
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode("date");
      };
    
      const showTimepicker = () => {
        showMode("time");
      };
      const DateShow = () => (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      );
      const _myDate = date.toString();
     
    
        let interviewDate = moment(_myDate).format("DD-MM-YYYY");
        let interviewTime = moment(_myDate).format("LT");
        const [title,setTitle]=useState('')
        const [desc,setDescription]=useState('')
        const addBooking = () => {
          if (
          
            title == '' 
          
    
          ) {
            Alert.alert("Error", "Enter all the fields", [
              {
                text: "ok",
              },
            ]);
          } else {
            db.ref('Appointment').push({
              Status:'Pending',
              title,
             
              interviewDate,
              interviewTime,email,phonenumber,
             
            })
            
            setTitle('')
          
          }
        };
      return (
        <SafeAreaView>
          <Text>Select Date and Time</Text>
          <View style={{flexDirection:'row',alignItems:'center',padding:20,justifyContent:'space-around'}}>
         <View>{show && <DateShow/>}</View>
            <TouchableOpacity style={styles.datebutton} 
            onPress={()=>showDatepicker()} >
            <Text>Date</Text>

            {/* <FontAwesome name='calendar' size={20}/> */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.datebutton}
            onPress={()=>showTimepicker()} >
              <Text>Time</Text>

            </TouchableOpacity>
          </View>
 
                      
          <View>
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
                              backgroundColor: "#DEEDF0",
                              width: 40,
                              height: 40,
                              borderRadius: 10
                            }}
                          >
            
                        </View>
                        <TextInput
                            style={styles.input}
                            autoCorrect={false}
                            placeholder="Description"
                            onChangeText={(title)=>setTitle(title)}
                       
                            value={title}
                          />
                        </View>
                        
                        
                           <TouchableOpacity style={styles.signinButton}
                           onPress={()=>addBooking()}
                  >
                    <Text style={styles.signinButtonText}>Submit</Text>
                </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    }
    
    export default Appointment
    
    const styles = StyleSheet.create({
      datebutton:{
        height:60,
        width:100,
        borderRadius:10,
        borderWidth:1,
        borderColor: "rgba(0,0,0,.2)",
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    
      },
      signinButton:{
        backgroundColor:'#000',
        borderRadius:8,
        marginHorizontal:20,
        height:60,
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