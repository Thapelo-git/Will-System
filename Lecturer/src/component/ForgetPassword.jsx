import React,{useRef,useState} from 'react'
import '../Style/SignIn.css'
import { auth } from '../firebase'
import { useAuth } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
const ForgetPassword = () => {
    const emailRef=useRef()
    const [error,setError]=useState('')
    const [message,setMessage]=useState('')
    const {resetPassword} = useAuth()
    const  handleSubmit = async (e)=>{
        e.preventDefault()
        
        try{
          
          setError('')
         
          await auth.sendPasswordResetEmail(emailRef.current.value)
          setMessage('Check your inbox for further instructions')
         
        } catch{
          setError('failed to reset Password')
        }
        
      }
      
  return (
    <div><form>
    <div className='header'>
      <h3>Forget Password</h3>
    </div>
    <div className='form_innerCon'>
        <p>{message}</p>
        <p className='error'>{error}</p>
  <table>
    <td><th><label>Email</label></th>
    <input placeholder='Enter Email' type='email'
     required ref={emailRef} className='Signinput'>
    </input>
    </td>
   
    
  </table>
  <div className='button_container'>
    <button className='button' onClick={handleSubmit}><h4 className='button_Lable'>Submit</h4></button></div>
  
  </div>
  </form></div>
  )
}

export default ForgetPassword