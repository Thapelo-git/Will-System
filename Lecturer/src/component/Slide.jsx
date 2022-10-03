import React from 'react'
import Infor from '../component/Interveiws'
// import '../Style/Companies.css'
const Slide = ({id,name,email,location,Duties,contactPerson,contactPhonenum,valueIndex,index}) => {
    // let position ='nextSlide'
    // if(valueIndex === index){
    //     position ='activeSlide'
    // }
    // if(valueIndex === index -1 || (index === 0 && valueIndex=== Infor.length-1)){
    //     position = 'lastSlide'
    // }
  return (
    <>
    {/* <article className={`d_flex${position}`} key={id}> */}
    <article className='d_flex'>
        <div className='left box_shodow'>
            <div className='details mtop'>
            <span>company{id}</span>
            <h2>{name}</h2>
            <label>{email}</label>
            </div>
        </div>
        <div className='right'>
        <div className='icon'>
            <div className='quote'>
                <i className='fal fa-quote-right'></i>
            </div>
        </div>
        <div className='content box_shodow mtop'>
            <h1>{location}</h1>
            <h3>{Duties}</h3>
            <p>{contactPerson}{contactPhonenum}</p>
        </div>
        </div>
    </article>
    </>
  )
}

export default Slide