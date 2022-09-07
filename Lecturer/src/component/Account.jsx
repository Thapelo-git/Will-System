import React,{useState,useRef,useEffect} from 'react'
import '../Style/Account.css'
import logo from "../IMAGES/logo.png"
import { useAuth } from './contexts/AuthContext'
import { auth,db } from '../firebase'
function Account() {
    const emailRef=useRef()
    const passwordRef=useRef()
    const [email,setEmail]=useState()
      const [Phonenumber,setPhonenumber]=useState('')
      
  
    const {currentUser,updateEmail,updatePassword}=useAuth()
    const [error,setError]=useState('')
    const user = auth.currentUser.uid
  
    
  
    useEffect(()=>{
      db.ref(`/AdminPuser/`+ user).on('value',snap=>{
    // setPhonenumber(snap.val().phonenumber)
    // setEmail(snap.val().email)
    
  
      })
      
    },[])
  return (
      <>
    <div className='Account_cover' >
    <div className='img_cover'>
    <img src={logo} className="profile_pic"/>
    </div>
    <div className='right_box_shadow'>
      {/* onSubmit={formSubmit} */}
      <form >
      <div className='f_flex'>
        <div className='inputrow'>
          <span>Your Email</span>
          {/* placeholder={email} */}
          <input type='text' name='email' />
        </div>
        <div className='inputrow'>
          <span>Your Phone Number</span>
          {/* placeholder={Phonenumber} */}
          <input type='number' name='phonenumber' />
        </div>
        </div>
        <div className='input'>
          <span>Your Password</span>
          <input type='password' name='password' placeholder='*******'/>
        </div>
        <div className='input'>
          <span>Confirm Password</span>
          <input type='password' name='confirmpassword' placeholder='*******'/>
        </div>
        <div className='input'>
          <span>Your message</span>
          <textarea cols='password' rows='10' name='message' placeholder='message'/>
        </div>
      <button className='btn_shadow'>Update</button>
      </form>
    </div>
    {/* <div className='Account_form'>
        <div className='Acc_column'>
            <div className='row_Accinput'>
    <div className='Acc_input'>
        <div><i class="bi bi-envelope-fill"></i></div>
    <input name='email' type='email' className='input' placeholder={email}/>
    </div>
    </div>
    <div className='row_Accinput'>
    <div className='Acc_input'>
        <div><i class="bi bi-telephone-fill"></i></div>
        <input name='phonenumber' type='number' className='input' placeholder={Phonenumber}/>
    </div>
    </div>
    <div className='row_Accinput'>
    <div className='Acc_input'>
        <div><i class="bi bi-lock-fill"></i></div>
        <input name='password' type='password' className='input' placeholder='********' />
    </div>
    </div>
    <div className='row_Accinput'>
    <div className='Acc_input'>
        <div><i class="bi bi-lock-fill"></i></div>
        <input name='confirmpassword' type='password' className='input' placeholder='*******'/>
    </div>
    </div>
    
    <div className='button_cover'>
        <button className='button'><label className='button_Lable'>Update</label></button>
    </div>
    </div>
    </div> */}
    
    </div>
    </>
  )
}

export default Account