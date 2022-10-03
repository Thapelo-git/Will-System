import React from 'react'
import Card from './Card'
import Data from './Interveiws'
const ListColumn = () => {
  return (
   <>
   <section>
    <div className='container'>
        <div className='heading'>
                <h4>List of Registed Companies</h4>
        </div>
        <div className='content grid'>
            {
            Data.map((val,index)=>{
                return <Card key={index} name={val.name} email={val.email} location={val.location}
                Duties={val.Duties} contactPerson={val.contactPerson} contactPhonenum={val.contactPhonenum}/>
            })
            }
        </div>
    </div>
   </section>
   </>
  )
}

export default ListColumn