import React,{useEffect,useState} from 'react'
import styled from 'styled-components'
import Table from 'react-bootstrap/Table'
import { db } from '../firebase'
import {FaCheckCircle,FaTimesCircle} from 'react-icons/fa'
const StatusTD=styled.td`
font-weight:bold;
color:${(props)=>(props.type === "Pending" ? "blue":"")}
color:${(props)=>(props.type === "Accepted" ? "green" :"")}
color:${(props)=> (props.type === "Rejected"?"red":"")}
`
const Visits = () => {
  const [Interveiws,setInterviews]=useState([])
  useEffect(()=>{

  
    db.ref('Logbook').on('value',snap=>{
      
      setInterviews({...snap.val() });
      

    }) 
  },[])
  console.log(Interveiws)
  const updateBooking = (index, status) => {

    db.ref('Student').child(index).update({Status:status})
    .then(()=>db.ref('Interview').once('value'))
    .then(snapshot=>snapshot.val())
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message
    }));
    
    
  };
  return (
    <div>
     <section>
    <div className='container'>
        <div className='heading'>
                <h4>Evaluation form from companies</h4>
        </div>
        <div className='content grid'>
        {Object.keys(Interveiws).map((id,booking) => (
          <div className='box btn_shadow'>
                <tr >
                  {/* <p>Ticket ID</p> */}
                  <h4> Company: {Interveiws[id].ComName}</h4>
                  {/* <div className='viewRow'>
                    <h4>Email  </h4>
                  <td>{Interveiws[id].email}</td>
                  
                  </div> */}
                  <div className='viewRow'>
                  <h4>Student Name: {Interveiws[id].name}</h4>
                  
                  </div>
                  <div className='viewRow'>
                  <h4>Student Number: {Interveiws[id].StudentNum}</h4>
                 
                  </div>
                  <div >
                  <p>1. He/she performed his or her tasks in line
with what was expected of him/her</p>
                  <td><h4>{Interveiws[id].Performed}</h4></td>
                  
                  </div>
                  <div >
                  <p>2. He/she contributed with good ideas that 
      added value to the work place</p>
                  <td><h4>{Interveiws[id].Contributed}</h4></td>
                  
                  </div>
                  <div >
                  <p>3. He/she produced high Quality work</p>
                  <td><h4>{Interveiws[id].Produced}</h4></td>
                  
                  </div>
                  <div >
                  <p>4. He/she managed his/her own time well and 
met deadlines</p>
                  <td><h4>{Interveiws[id].Managed}</h4></td>
                  
                  </div>
                 
                
                 
                
                </tr>
                </div>
                ))}
            {/* {
            Data.map((val,index)=>{
                return <Card key={index} name={val.name} email={val.email} location={val.location}
                Duties={val.Duties} contactPerson={val.contactPerson} contactPhonenum={val.contactPhonenum}/>
            })
            } */}
        </div>
    </div>
   </section>
    </div>
  )
}

export default Visits