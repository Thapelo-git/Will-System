import React, { useState } from 'react'
import '../Style/Welcome.css'
import Logo from '../IMAGES/logo.png'
import SignUp from './SignUp'
import SignIn from './SignIn'
import ForgetPassword from './ForgetPassword'
function WelcomScreen() {
    const [page,setPage]=useState(0)
  return (
    <div className='cover'>
        <div className='logo-container'>
        <img  src={Logo} className="logoH"/>
        {/* <h1>Welco</h1> */}
        </div>
        <div className='form-cover'>
            <div className='button-container'>
                {/* className='Regis-button' '#EC8F05' */}
                <div style={{borderRadius: '20px',
            
    backgroundColor: page === 0 ?'#fff':'#000',alignItems:'center',
    width: '120px',display:'flex',justifyContent:'center',cursor:'pointer',
    height: '44px'}}
    onClick={()=>setPage(0)}
     >
      <p style={{color:page === 0 ?'#000':'#fff'}}>Register</p>
                </div>
                <div style={{borderRadius: '20px',
                backgroundColor: page === 1 ?'#fff':'#000',
                  display:'flex',justifyContent:'center',alignItems:'center',
                  width:'120px',height:'44px',cursor:'pointer',
                }}
                onClick={()=>setPage(1)}
                >
                  <p style={{color: page === 1 ?'#000':'#fff'}}>Login</p>
                </div>
            </div>
            
            <div className='form_container'>
              <div className='inner'>
            {
              page===0?<SignUp/>:null
            }
            {
              page===1?<SignIn/>:null
            }
             {
              page===2?<ForgetPassword/>:null
            }
            </div>
           
            </div>
            <div className='forgetPassword_container'>
              <p  onClick={()=>setPage(2)} className='forgetPassword'>ForgetPassword</p></div>
        </div>
        
    </div>
  )
}

export default WelcomScreen