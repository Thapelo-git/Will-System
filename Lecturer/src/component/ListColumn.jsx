import React,{useState,useEffect} from 'react'
import Card from './Card'
import Data from './Interveiws'
import { auth,db } from '../firebase'
const ListColumn = () => {
    const [Companies,setCompanies]=useState([])
  useEffect(()=>{
    
    db.ref('Company').on('value',snap=>{
      
      setCompanies({...snap.val()});
    })
    
  },[])
  return (
   <>
   <section>
    <div className='container'>
        <div className='heading'>
                <h4>List of Registed Companies</h4>
        </div>
        <div className='content grid'>
        {Object.keys(Companies).map((id,booking) => (
          <div className='box btn_shadow'>
                <tr >
                  {/* <p>Ticket ID</p> */}
                  <h4> Company: {Companies[id].name}</h4>
                  <div className='viewRow'>
                    <h4>Email  </h4>
                  <td>{Companies[id].email}</td>
                  
                  </div>
                  <div className='viewRow'>
                  <h4>Location</h4>
                  <td>{Companies[id].location}</td>
                  </div>
                  <div >
                  <h4>Duties</h4>
                  <td>{Companies[id].Duties}</td>
                  
                  </div>
                  <div className='viewRow'>
                  <td>Contact Person {Companies[id].contactPerson}</td>
                  <td> cell No {Companies[id].phonenumber}</td>
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
   </>
  )
}

export default ListColumn