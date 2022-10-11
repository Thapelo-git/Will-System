import React from 'react'

const Card = ({props,name}) => {
  return (
    <>
    <div className='box btn_shadow'>
    <h2>{name}</h2> 
    {/* <p>{props.email}</p> */}
    </div>
    </>
  )
}

export default Card