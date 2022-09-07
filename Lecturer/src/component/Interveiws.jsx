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
const Interveiws = () => {
  const [Interveiws,setInterviews]=useState([])
  useEffect(()=>{

  
    db.ref('Interview').on('value',snap=>{
      
      setInterviews({...snap.val() });
      

    }) 
  },[])
  console.log(Interveiws)
  const updateBooking = (index, status) => {

    db.ref('Interview').child(index).update({Status:status})
    .then(()=>db.ref('Interview').once('value'))
    .then(snapshot=>snapshot.val())
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message
    }));
    
    
  };
  return (
    <div>
       <div className='heading'>
        <h2>Interviews</h2>
      </div>
          {Interveiws ? (
        <Table
          striped
          bordered
          hover
          size="sm"
          style={{ marginTop: "10px", width: "100%" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              
              <th>Status</th>
              <th>Accept</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(Interveiws).map((id,booking) => (

           



  

              <tr key={Interveiws.id}>
                
              <>
              
               
                  <td>{id}</td>
                  <td>{Interveiws[id].email}</td>
                  <td>{Interveiws[id].phonenumber}</td>
                  
                  <td>{Interveiws[id].title}</td>
                  <td>{Interveiws[id].desc}</td>
                  <td>{Interveiws[id].interviewDate}</td>
                  <td>{Interveiws[id].interviewTime}</td>
                  <StatusTD type={Interveiws[id].Status}>{Interveiws[id].Status}</StatusTD>
                  {Interveiws[id].Status === "Pending" ? (
                    <>
                      <td style={{ textAlign: "center" }}>
                        <FaCheckCircle
                          color="green"
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={() => updateBooking(id, "Accepted")}
                        />
                      </td>
                      <td style={{ textAlign: "center" }}>
 
                        <FaTimesCircle
                          color="red"
                          style={{
                            cursor: "pointer",
                            fontSize: "20px",
                          }}
                          onClick={() => updateBooking(id, "Rejected")}
                        />
                      </td>
                    </>
                  ) : (
                    <></>
                  )}
                  
                 
                </>
                 
                 
              </tr>
             
            ))}
          </tbody>
        </Table>):(<h1>Nothing</h1>)}
    </div>
  )
}

export default Interveiws