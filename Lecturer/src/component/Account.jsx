import React,{useState,useRef,useEffect} from 'react'
import '../Style/Account.css'
import logo from "../IMAGES/logo.png"
import {Button,Card, Form,Container,Alert} from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext'
import { auth,db } from '../firebase'
import { Link,useNavigate, } from 'react-router-dom'
function Account() {
  const [Firstname,setFirstname]=useState('')
  const [Phonenumber,setPhonenumber]=useState('')
const emailRef=useRef()
const passwordRef=useRef()
const passwordConfirmRef=useRef()
const {currentUser,updateEmail,updatePassword}=useAuth()
const [error,setError]=useState('')
const [loading,setLoading]=useState(false)
const navigate = useNavigate()
const user = auth.currentUser.uid
useEffect(()=>{
  db.ref(`/Lecturer/`+ user).on('value',snap=>{
    
    setFirstname(snap.val() && snap.val().Firstname);
setPhonenumber(snap.val().phonenumber)

  })
  
},[])

 const  handleSubmit= (e)=>{
  e.preventDefault()
  if(passwordRef.current.value !== passwordConfirmRef.current.value){
    return setError('password do not match')
  }
  const promises=[]
  setLoading(true)
  setError('')

  if (emailRef.current.value !== currentUser.email){
      promises.push(updateEmail(emailRef.current.value))
  }
  if (passwordRef.current.value !== currentUser.email){
      promises.push(updatePassword(passwordRef.current.value))
  }

  Promise.all(promises).then(()=>{
    navigate('/')
  }).catch(()=>{
      setError('failed to update account')
  }).finally(()=>{
      setLoading(false)
  })
  
}
  return (
      <>
        <Container
    className='d-flex align-items-center justify-content-center'
    style={{minHeight:"100vh"}}>
      <div className='w-100' style={{maxWidth:"500px"}}>
         <Card>
          <Card.Body>
            <h2 className='text-center mb-4'>Update Profile</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
            {/* <Form.Group id='text'>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text"  required 
               defaultValue={Firstname} />
              </Form.Group> */}
              <Form.Group id='text'>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text"  required 
               defaultValue={Phonenumber} />
              </Form.Group>
              <Form.Group id='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required 
               defaultValue={currentUser?.email} />
              </Form.Group>
              <Form.Group id='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} 
                placeholder='Leave blank to keep the same'/>
              </Form.Group>
              <Form.Group id='password-confirm'>
                <Form.Label> Confirm Password</Form.Label>
                <Form.Control type="password" ref={passwordConfirmRef} 
                placeholder='Leave blank to keep the same'/>
              </Form.Group>
              <Button disabled={loading} className='w-100' type="submit">Update</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          <Link to="/Dashboard">cancel</Link>
        </div>
        </div>
        </Container>
    {/*
    <div className='right_box_shadow'>
       onSubmit={formSubmit} 
      <form >
      <div className='f_flex'>
        <div className='inputrow'>
          <span>Your Email</span>
          
          <input type='text' name='email' />
        </div>
        <div className='inputrow'>
          <span>Your Phone Number</span>
        
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
    </div> */}
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
    </div> 
    
    </div>*/}
    </>
  )
}

export default Account