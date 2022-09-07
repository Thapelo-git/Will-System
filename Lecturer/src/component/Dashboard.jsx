import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import '../Style/Dashboard.css'
import {  Routes,Route  } from 'react-router-dom'
import AddScreen from './AddScreen'
import Viewuser from './Viewuser'
import logo from "../IMAGES/logo.png"
import { db } from '../firebase'
export const Dashboard = () => {
  const [user,setUser] = useState({});
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
    useEffect(()=>{
        db.ref("Puser").on("value",(snapshot)=>{
            // setUser({
            //     ...snapshot.val(),
            // })
            setFilteredDataSource({
                  ...snapshot.val(),
               });
        setMasterDataSource({
          ...snapshot.val(),
       });
        })
       
    },[]);
   
    const [searchtext,setSearchtext] = useState('');
  

const searchFilterFunction =(text)=>{
  if(text){
      const newData = masterDataSource.filter((item)=>{
          // const itemData = item.name ? item.name.toUpperCase()
          // :''.toUpperCase();
          // const textData = text.toUpperCase();
          // return itemData.indexOf( textData)>-1;
          return Object.values(item).join('').toLowerCase().includes(text.toLowerCase())

      })
      setFilteredDataSource(newData);
      setSearchtext(text)
  }else {
      setFilteredDataSource(masterDataSource);
      setSearchtext(text)
  }
}
  return (
    <div className='dashboard_cover'>
        <div className='addbutton_cover'>
            <Link to="AddScreen">
            <button className='button_Add'>
                <h3 className='button_text'>Add New</h3>
            </button>
            </Link>
            </div>
            <div className='search'>
                <div className='search_icon'><i className='fas fa-search'></i></div>
            <input type="text" className='search_input' placeholder='search' icon='search'
            onChange={(e)=>searchFilterFunction(e.target.value)}/>
            </div>
            <div className='users_container'>
              {
              // Object.keys(user).length>0?(
                Object.keys(filteredDataSource).map((id,index)=>{
                  return(

                 
            <div className='users'>
            <img src={filteredDataSource[id].url} className="profile_pic"/>
            <p>{filteredDataSource[id].name} </p>
            <p>{filteredDataSource[id].surname}</p>
            <Link to={`viewuser/${id}`}><i className='fas fa-chevron-right'></i></Link>
            
            </div>
             )
            })
          // ):(<h3>No Users</h3>)
          }
            </div>
            
           
   
  
   
    </div>
  )
}
