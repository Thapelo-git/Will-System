import React,{useState,useEffect} from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import { db } from '../firebase';
import '../Style/Visists.css'
function Visits() {
  let temDate=new Date()
  let nowTime=temDate.getDate()+'/'+(temDate.getMonth()+1)+'/'+temDate.getFullYear()
    const [startDate, setStartDate] = useState(temDate);
    const [time, setTime] = useState('10:00');
    const [Visits,setVisits]=useState([])
    let startDateone=startDate.getDate()+'/'+(startDate.getMonth()+1)+'/'+startDate.getFullYear()
    const handleSubmit=()=>{
      
      db.ref('Visits').push({startDateone,time})
    }
    useEffect(()=>{
      db.ref('Visits').on('value',(snapshot)=>{
        setVisits({
          ...snapshot.val(),
        })
      })
    },[])

    const handleDateChange=(e)=>{
     
      setStartDate(
       e
        );
      
    }
    const onDelete =(id)=>{
      db.ref(`/Visits/${id}`).remove()
     
     }
    console.log(startDateone,'dfghjkdfghjk')
  return (
      <>
      <div className='heading'>
        <h3>Update Visits</h3>
      </div>
      <div className='pickers'>
        <div>
          <p>Enter Date </p>
          {/* value={startDate} */}
        <DatePicker selected={startDate}  dateFormat='yyyy/MM/dd' 
         onChange={handleDateChange} value={startDate} name='startDate'/>
        {/* <p>{startDateone}</p> */}
        </div>
        <div>
          <p>Enter Time</p>
          <TimePicker onChange={setTime} value={time} />
        </div>
      
    
      </div>
      <div className='button_cover'>
      <button className='button'
      onClick={()=>handleSubmit()}><h4 className='button_Lable'>Submit</h4></button>
      </div>
      <div>
      {
        Object.keys(Visits).map((id)=>
        <div className='visits_list'>
        <div className='conView'>
          <div className='innerView'>
          <h4>Date</h4>
          <p>{Visits[id].startDateone}</p>
          
          <h4>Time</h4>
          <p>{Visits[id].time}</p>
          </div>
          <button className='deletebtn' onClick={()=>onDelete(id)}>Delete</button>
        </div>
        
          
       
        </div>
        )
      }
      </div>
    
    </>
  )
}

export default Visits