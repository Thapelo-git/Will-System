import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import AddScreen from './AddScreen'
import { Dashboard } from './Dashboard'
import Viewuser from './Viewuser'
const Home = () => {
  return (
      <div>
   <Routes>
    <Route  path='/' element={<Dashboard/>}/>
     <Route  path='AddScreen' element={<AddScreen/>}/>
   
   <Route path='viewuser/:id' element={<Viewuser/>}/>
   </Routes>
   
   </div>
  )
}

export default Home