import React,{useState,useEffect} from 'react'

import { SafeAreaView, StyleSheet, Text, View,TextInput,FlatList 
    ,TouchableOpacity,Image,ScrollView,Animated,Dimensions} from 'react-native'
import BottomSheet from 'react-native-gesture-bottom-sheet'

import { COLORS } from '../styles/Colors.jsx'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
const deviceHeight=Dimensions.get("window").height
const { width } = Dimensions.get("screen")
const cardWidth = width / 1.8
import { db,auth } from '../../firebase'

const ModelSearch = ({navigation,bottomopen}) => {
  const user = auth.currentUser.uid;
  const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [searchtext,setSearchtext] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [Pusers, setPusers] = useState([])

  useEffect(() => {
    db.ref('/Student').on('value',snap=>{
          
        const Pusers=[]
           snap.forEach(action=>{
               const key=action.key
               const data =action.val()
               Pusers.push({
                   key:key,
                   name: data.name,surname: data.surname,age: data.age,IDnumber: data.IDnumber,
                   UniversityName:data.UniversityName,
                   monthNum:data.monthNum,faculty:data.faculty,
  
                   url: data.url,
               })
    
           })
           setPusers(Pusers)
        setFilteredDataSource(Pusers);
       setMasterDataSource(Pusers);
       })
     

    //   db.ref('/users/' + user).on('value', snap => {

    //     setName(snap.val() && snap.val().name);
    //     setPhonenumber(snap.val().phonenumber)
    //     setEmail(snap.val().email)
    // })

  }, [])

    const searchFilterFunction = (text) => {
      if (text) {
          const newData = masterDataSource.filter(function (item) {
              const itemData = item.faculty? item.faculty.toUpperCase()
                  : ''.toUpperCase();
              const textData = text.toUpperCase();
              return itemData.indexOf(textData) > -1;

          })
          setFilteredDataSource(newData);
          setSearchtext(text)
      } else {
          setFilteredDataSource(masterDataSource);
          setSearchtext(text)
      }
  }

    const Card = ({ Tollgate, index }) => {
      return (
          <TouchableOpacity onPress={() => navigation.navigate('HotelDetails', {
              data: Tollgate, index: index,
              phonenumber: phonenumber
          })}>
              <View style={styles.cardContainer}>
                  <Image style={styles.cardImage} source={{ uri: Tollgate.url }} />
                  <View style={{ height: 100, alignItems: 'center' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 18, color: 'gray', }}>Name: </Text>
                          <Text style={{ fontSize: 20, color: 'blue', }}>{Tollgate.name}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 18, color: 'gray', }}>faculty: </Text>
                          <Text style={{ fontSize: 20, color: 'gray', }}>{Tollgate.faculty}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: 18, color: 'gray', }}>University Name: </Text>
                          <Text style={{ fontSize: 18, color: 'gray', }}>{Tollgate.UniversityName}</Text>
                      </View>

                  </View>

              </View>
          </TouchableOpacity>)
  }
    return (
        <SafeAreaView >
          <Animated.View>
          <BottomSheet
          hasDraggableIcon
          ref={bottomopen}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}
          height={deviceHeight * 0.6}
          >
          <View style={{
                marginTop: 20,
                flexDirection: 'row',
                paddingHorizontal: 20,
            }}>
                <View style={styles.inputContainer}>

                    <Ionicons name="search" size={24} />

                    <TextInput
                        style={{ fontSize: 18, flex: 1, marginLeft: 10 }}
                        
                        placeholder="Where to go ?"
                        onChangeText={(text) => searchFilterFunction(text)} />
                  
                </View>
            </View>
        <FlatList
                keyExtractor={(_, key) => key.toString()}
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 20 }}
                data={filteredDataSource}
                renderItem={({ item, index }) => <Card Tollgate={item} index={index} />}
            />
     
        
     </BottomSheet>
   </Animated.View>
    
        </SafeAreaView>
    )
}

export default ModelSearch

const styles = StyleSheet.create({
    inputContainer:{
      
        height:50,
        width:'100%',
        borderRadius:10,
        // borderWidth:1,
        flexDirection:'row',
        backgroundColor:COLORS.lightgray,
        alignItems:'center',
        paddingHorizontal:20, 
        
        
    },
    header: {
        width:'100%',
        height:20,
        paddingVertical: 30,
        // borderRadius:10,
        alignItems:'center',
        backgroundColor: '#0225A1',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom:12
        },
    container:{
        // padding:20,
        // height:'100%',
        // marginTop:20,
    },
    card: {
      height: 220,
  },
  cardContainer: {
      height: 100,
      width: cardWidth * 1.5,
      marginRight: 20,
      // marginBottom:20,
      marginVertical: 10,
      // marginTop:5,
      borderRadius: 15,
      elevation: 15,
      backgroundColor: '#fff',
      flexDirection: 'row', alignItems: 'center'

  },
  discountcard: {
      flexDirection: 'row', justifyContent: 'center',
      width: '100%',
      height: 110,
      // width:cardWidth*1.5,
      // marginRight:20,

      // marginHorizontal:10,

      // borderRadius:15,
      // elevation:15,
      // backgroundColor:COLORS.white,
      alignItems: 'center',
  },

  cardImage: {
      height: 100,
      width: width / 3,
      marginRight: 20,
      padding: 10,
      overflow: 'hidden',
      borderRadius: 10,
  }
    
})
