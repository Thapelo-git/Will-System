import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'
import '../Style/Viewuser.css'
function Viewuser() {
  const [illness, setIllness] = useState('');
  const [Transfed, setTransfed] = useState('');
  const [PrisonDeath, setPrisonDeath] = useState('');
  const [data,setData]=useState({})
  let currentId = useParams()
  const {id}=currentId;

  useEffect(()=>{
    db.ref("Puser").on("value",(snap)=>{
      setData({
        ...snap.val(),
      })
    })
  },[id]);
  const update= () => {

    db.ref('Puser').child(id).update({PrisonDeath:PrisonDeath,
      Transfed:Transfed,illness:illness })
    .then(()=>db.ref('Puser').once('value'))
    .then(snapshot=>snapshot.val())
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message
    }));
    
    
  };
  
  return (
    <>
    {
      Object.keys(data).map((userId)=>{
        if(userId === id){
          return(<>
          <div className='viewRow'>
             <div className='input_column'>
          <div className='imageCover'>
          <img src={data[id].url} className="image"/>
      </div>
      <div className='inforRow'>
         <p>Name</p> <h3> {data[id].name}</h3> 
         </div>
         <h1> <p>Surname</p>  {data[id].surname}</h1>
          <div className='inforRow'>
         <p>ID number</p> <h3> {data[id].IDnumber}</h3> 
         </div>
         <div className='inforRow'><p>Age</p> <h3> {data[id].age}</h3></div>
         </div>
          <div>
         <div className='viewRow'>
         <div className='input_column'>
          <h4>Illness</h4>
            <select class="custom-select" id="gender3" 
          value={illness} onChange={e=>setIllness(e.target.value)}
          >
            <option selected>Choose...</option>
            <option  name="illnessNo" >No</option>
            <option name="illnessYes" >Yes</option>
           
          </select>
        
          </div>
          <div className='input_column'>
          <h4>Transfed</h4>
            <select class="custom-select" id="gender3" 
          value={Transfed} onChange={e=>setTransfed(e.target.value)} 
          >
            <option selected>Choose...</option>
            <option  name="TransfedNo" >No</option>
            <option name="TransfedYes" >Yes</option>
           
          </select>
        
          </div>
          <div className='input_column'>
          <h4> Prisoner Death</h4>
            <select class="custom-select" id="gender3" 
          value={PrisonDeath} onChange={e=>setPrisonDeath(e.target.value)} 
          >
            <option selected>Choose...</option>
            <option  name="DeathNo" >No</option>
            <option name="DeathYes" >Yes</option>
           
          </select>
        
          </div>
          
         </div>
         <div className='headings'>
          <button onClick={()=>update()} className='button'><label className='button_Lable'>Submit</label></button>
        </div>
        </div>
        </div>
</>
          )
        }
      })
    }
    </>
  )
}

export default Viewuser