import React,{useState,useEffect} from 'react'
import "../Style/Header.css"
import logo from "../IMAGES/logo.png"
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
const Header = () => {
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
    const [Mobile,setMobile]=useState(false)
  return (
    <>
    <header className='header'>
        <div className='container d_flex'>
            <div className='logo'>
                {/* <img src={logo} alt=''/> */}
            </div>
            <div className='navlink'>
                {/* <ul className='link f_flex uppercase'> */}
                    <ul className={Mobile ? 'nav-links-mobile' :'link f_flex uppercase'} onClick={()=>setMobile(false)}>
                    <li><Link to="dashboard"><a>Dashboard</a></Link></li>
                    <li><Link to="visits"><a>Visits</a></Link></li>
                    <li><Link to="interviews" >
                    <a >
                   Interviews
                </a>
                </Link></li>
                    <li> <Link to="account" >
                    <a >
                   Account
                </a>
                </Link></li> 
                    
                    <li><button className='btn' onClick={handleLogout}>
    <a>Logout</a>
    <i class="fas fa-sign-out-alt"></i>
    
    </button></li>
                    </ul>
                {/* </ul> */}
                <button className='toggle' onClick={()=>setMobile(!Mobile)}>
                    {
                        Mobile ?<i className='fas fa-times close home-btn'></i>:<i className='fas fa-bars open'></i>
                    }
                </button>
            </div>
        </div>

    </header>
    {/* <section className='demo'></section> */}
    <Outlet/>
</>
  )
}

export default Header