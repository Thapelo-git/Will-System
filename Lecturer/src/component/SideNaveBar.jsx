import React,{useState,useEffect} from 'react'
import "../Style/SideNaveBar.css"
import logo from "../IMAGES/logo.png"
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
//https://dribbble.com/shots/18977642-POS-System-App
function SideNaveBar() {
    const [Prisoners,setPrisoners]=useState([])
    useEffect(()=>{
        db.ref("Puser").on("value",(snap)=>{
          setPrisoners({
            ...snap.val(),
          })
        })
      },[]);
    
    let plength=Prisoners.length
      console.log(plength)
    const {logOut}=useAuth()
    const [error,setError]=useState('')
    const navigate=useNavigate()

    const handleLogout=async()=>{
        try{
            setError('')

            await logOut()
           navigate('login')
        }catch{
            setError('Failed to log out')
        }
    }
    const [mobile,setMobile]=useState(false)
   
  return (
    <div className='nav-main-container'>
        <div className='inner-container'>
    <img src={logo} className="logo"/>
    <div className='toggle' onClick={()=>setMobile(!mobile)}>
      {mobile?<i className='fas fa-times close'></i>:<i className='fas fa-bars open'></i>}
      
      
    </div>
    <div className='separator'>
                    
                    </div>
        <nav>
    

        {/* <ul className=' SidebarList'> */}
          <ul className={mobile ? "nav-links-mobile" :"SidebarList"} onClick={()=>setMobile(false)}>
             
            <li className='row'>
                 
                    {/* <div className='nav-icon'>
                    <i class="	fas fa-users"></i>
                    </div> */}
                    <div className='title'>
                    
                    <Link to="dashboard"><a>Dashboard</a></Link>
                    
                
                
                </div>
                   
            </li>
            <li className='row'
            >
                 
                    {/* <div className='nav-icon'>
                    <i className='fas fa-handshake-o'></i>
                    </div> */}
                    <div className='title'>
                    <Link to="visits"><a>Visits</a></Link>
                </div>
                   
            </li>
            <li className='row'>
                 
                    {/* <div className='nav-icon'>
                    <i className='fas fa-user-circle'></i>
                    </div> */}
                    
                    <div className='title'>
                    <Link to="interviews" >
                    <a >
                   Interviews
                </a>
                </Link>
                </div>
                  
            </li>
            <li className='row'>
                  
                    {/* <div className='nav-icon'>
                    <i class="fas fa-user-circle"></i>
                    </div> */}
                    <div className='title'>
                    <Link to="account" >
                    <a >
                   Account
                </a>
                </Link>
                </div>
                   
            </li>
            <li className='row'>
            <div className='loguot-btn'>
    <button className='btn' onClick={handleLogout}>
    <a>Logout</a>
    <i class="fas fa-sign-out-alt"></i>
    
    </button>
    </div>
    </li>
        </ul>
  
    </nav>
    
    
    
    
    
    
        </div>
        <div className='inner_Container'>
        <Outlet/>
        
   
    {/* <div className='headings'>
        <h3>Welcome</h3>
      </div>
    <div className='boxRow'>
        <div className='numberBox'>
    <h2></h2>
        </div>
    </div> */}
    </div>
    </div>
  )
}

export default SideNaveBar