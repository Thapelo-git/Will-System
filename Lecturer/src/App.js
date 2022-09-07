import logo from './logo.svg';
import './App.css';
import SideNaveBar from './component/SideNaveBar';
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import AddScreen from './component/AddScreen';
import { AuthProvider } from './component/contexts/AuthContext';
import { auth } from './firebase';
import { useState } from 'react';
import WelcomScreen from './component/WelcomScreen';
import { Dashboard } from './component/Dashboard';
import Home from './component/home';
import Account from './component/Account';
import Visits from './component/Visits';
import Interveiws from './component/Interveiws';
import Viewuser from './component/Viewuser';
import Header from './component/Header';
function App() {
  const [signedin,setSignin]=useState(false)
  auth.onAuthStateChanged((user)=>{
    if(user){
      setSignin(true)
      console.log('login///////////////////////////')
    }else{
      setSignin(false)
    }
  })
  return (
    <AuthProvider>
  <BrowserRouter>
   
   <Routes>
   
   <Route  path="login" element={<WelcomScreen/>} />
   <Route  path="/" element={<Header/>}>
    <Route path='account' element={<Account/>}/>
    <Route  path='dashboard/*' element={<Home/>}/>
    <Route path='visits' element={<Visits/>}/>
    <Route path='interviews' element={<Interveiws/>}/>
   
    </Route>
     {/* {!signedin?(
       <>
     
     <Route  path="login" element={<WelcomScreen/>} />
       </>
     ):(
      <>
      
     <Route  path="/" element={<Header/>}>
    <Route path='account' element={<Account/>}/>
    <Route  path='dashboard/*' element={<Home/>}/>
    <Route path='visits' element={<Visits/>}/>
    <Route path='interviews' element={<Interveiws/>}/>
   
    </Route></>
     )} */}
   
   
     
     </Routes>
  
   </BrowserRouter>
   </AuthProvider>
  );
}

export default App;
