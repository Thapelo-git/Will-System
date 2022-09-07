import React,{useRef,useState} from 'react'
import '../Style/SignIn.css'
import { Formik,Form } from 'formik'
import * as Yup from 'yup'
import {useAuth} from '../component/contexts/AuthContext'
import { db,auth } from '../firebase'
import {useNavigate} from 'react-router-dom'
import {Alert} from 'react-bootstrap'
function SignUp() {
  // /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
 // /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
  const navigate =useNavigate()
  const validate=Yup.object({
    email:Yup.string().email().required("Email is required"),
    phonenumber:Yup.string().min(10).max(10).required("Phone number is required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,

      "Invalid phone number"
    ),
    confirmPassword:Yup.string().min(6).required('Confirm Password is required'),
    password:Yup.string().min(6).required('Confirm Password is required')
  })
  const [error, setError] = useState('')
  const handleSubmit = async (data) => {
    // e.preventDefault()
    const {email,phonenumber,password,confirmPassword}=data
    if (password !== confirmPassword) {
        return setError('password do not match')
    }
    try {
        setError('')

       
        await auth.createUserWithEmailAndPassword(email, password)
            .then(res => {
                const user={
                    
                    email: email,
                    phonenumber: phonenumber,
                    uid: res.user.uid
                }
                  console.log(user)
                db.ref('/AdminPuser')
                .child(res.user.uid)
                .set(user)
                .then((result) => {
                    console.log(result, "<<<<<<<<<<<<<<<<<<<<<<<<")
                    try {
            
                        localStorage.setItem("AdminPuser", res.user.uid)
                    } catch (e) {
                      // saving error
                      console.log('no data')
                    }
                    navigate('/')
                }).catch((error) => {
                    console.log(error, "----------------------")
                    setError(error)
                })
            })
    } catch (error) {
        setError('failed to create an account',)
    }


}
  return (
    <div>
      <Formik
      initialValues={{
        email:'',phonenumber:'',confirmPassword:'',password:''
      }}
      validationSchema={validate}
      onSubmit={(values,action)=>{
        action.resetForm()
        handleSubmit(values)
      }}
      >
        {
          (formik)=>{
            const {
              values,handleChange,handleBlur,errors,touched,
              isValid,dirty
            }=formik;
            return(
            <>
           
         {/* onSubmit={handleSubmit} */}
      <Form >
        <div className='header'>
          <h3>SignUp</h3>
          {error && <Alert variant='danger'>{error}</Alert>}
        </div>
        <div className='form_innerCon'>
      <table>
        <tr>
          
        <td><th><label>Email</label></th>
        <input placeholder='Enter Email' type='email' className='Signinput' name='email'
        value={values.email} onChange={handleChange} onBlur={handleBlur}
        />{
          errors.email && touched.email?<span className='error'>{errors.email}</span>:null
        }
        
        
        </td>
        <td><th><label>Phonenumber</label></th>
        <input placeholder='Enter Phonenumber' type='text' className='Signinput' name='phonenumber'
        value={values.phonenumber}  onChange={handleChange} onBlur={handleBlur}
        />
        {
          errors.phonenumber && touched.phonenumber?<span className='error'>{errors.phonenumber}</span>:null
        }
        </td>
        </tr>
        <tr>
        <td><th><label>Password</label></th>
        <input placeholder='Enter Password' type='password' className='Signinput' name='password'
         value={values.password} onChange={handleChange} onBlur={handleBlur}/>
       {
          errors.password && touched.password?<span className='error'>{errors.password}</span>:null
        }
        </td>
        <td><th><label>ConfirmPassword</label></th>
        <input placeholder='Confirm Password' type='password' className='Signinput' name='confirmPassword'
         value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur}/>
      {
          errors.confirmPassword && touched.confirmPassword?<span className='error'>{errors.confirmPassword}</span>:null
        }
        </td>
        </tr>
      </table>
      <div className='button_container'>
        <button type='submit' onClick={()=>handleSubmit} className='button'><h4 className='button_Lable'>Register</h4></button></div>
   
      </div>
      </Form>
      </>)
          }
      }
      </Formik>
    </div>
  )
}

export default SignUp