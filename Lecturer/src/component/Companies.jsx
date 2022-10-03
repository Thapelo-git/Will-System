import React,{useEffect,useState} from 'react'
import Slide from './Slide'
import { db } from '../firebase'
import Infor from '../component/Interveiws'
import '../Style/Companies.css'
const Companies = () => {
    const [CompaniesList,setCompaniesList]=useState([])
  useEffect(()=>{

  
    db.ref('Company').on('value',snap=>{
      
      setCompaniesList({...snap.val() });
      

    }) 
  },[])
  const [Data,setdata]=useState(Infor)
  const [index,setIndex]=useState(0)
//   useEffect(()=>{
//     const lastIndex =Data.length-1
//     if(index<0){
//         setIndex(lastIndex)
//     }
//     if(index >lastIndex){
//         setIndex(0)
//     }
//   },[index,Data])
  
//   useEffect(()=>{
//     let slider=setInterval(()=>{
//         setIndex(index +1)
//     },3000)
//     return ()=>clearInterval(slider)
//   },[index])
  return (
    <>
    <section className='Company' id='clients'>
    <div className='container'>
        <div className='heading text-center'>
            <h4>List Of Companies</h4>
        </div>
        <div className='slide'>
        {/* {Object.keys(CompaniesList).map((value,valueIndex) =>{
            return<Slide key={value.id} {...value} valueIndex={valueIndex} />index={index}
        })} */}
    {
        Data.map((value,valueIndex)=>{
            return<Slide key={value.id} {...value} valueIndex={valueIndex} />
        }

        )
    }
        
        <div className='slide_button'>
            <button className='btn_shadow prev_btn' >
                <i className='fas fa-arrow-left'></i>
            </button>
            {/* onClick={()=>setIndex(index-1)} onClick={()=>setIndex(index+1)} */}
            <button className='btn_shadow next_btn' >
                <i className='fas fa-arrow-right'></i>
            </button>
        </div>
        </div>
    </div>
    </section>
    </>
  )
}

export default Companies