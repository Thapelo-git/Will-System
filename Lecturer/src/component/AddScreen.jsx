import React,{useState,useEffect} from 'react'
import '../Style/AddScreen.css'
import { auth,db } from '../firebase'
import { storage } from '../firebase'
import {  useNavigate } from 'react-router-dom'
function AddScreen() {
  let navigate =useNavigate()
  const values={
    name:'',surname:'',IDnumber:'',
    UniversityName:'',completed:'',
    monthNum:'',faculty:''
  
  }

  const [url, setUrl] = useState();
  const [image,setImage]=useState(null)
  const handleImgChange=e=>{
    if(e.target.files[0]){
      setImage(e.target.files[0])
    }
  }
  const [progress, setProgress] = useState(0);
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image)
      ;
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  };
  const [initialState,setState]=useState(values)
  const {name,surname,IDnumber,
    UniversityName,completed,
    monthNum,faculty

}=initialState

  const handleInputChange=(e)=>{
    let {name,value}=e.target;
    setState({
      ...initialState,
      [name]:value,
    }) 
  }
  const [Status,setStatus]=useState('Pending')
  const [S,setS]=useState()
  const handleSubmit = (e)=>{
    e.preventDefault();
     
        db.ref('Student').push({name,surname,IDnumber,
          UniversityName,completed,
          monthNum,faculty,Status})
      //  navigate('dashboard/*')
      setS('Succesfully Added')
}
  return (
    <>
    <div className='Add_cover'>
      <div className='headings'>
        <h3>Upload Letter of Work intergrated learnig</h3>
      </div>
      {/* <div className='img_row'>
        
      <img src={url || "https://media.istockphoto.com/vectors/welcome-hotel-services-on-vector-illustration-vector-id1172931964?k=20&m=1172931964&s=612x612&w=0&h=n8tpGi16ZTNU1quhN-GjONLcgVe6xgzJ2-QaD4_MVU4="} 
      alt="firebase-image" className='image1'/>
      </div> */}
      {/* <div className='img_row'>
      <input name="url" onChange={handleImgChange} style={{width:'50%'}} type="file" class="form-control"
      placeholder={url} />
     
              <button className="button" onClick={handleUpload}>Upload</button>
              <progress value={progress} max="1000" />
              </div> */}
    
      <div className='form_cover'>
      <form onSubmit={handleSubmit}>
        <div className='input_row'>
          <div className='input_column'>
          <label>Name</label>
            <input name='name' type='text' className='input_infor' required="required"
            onChange={handleInputChange} value={name} />
           
          </div>
          <div className='input_column'>
          <label>Surname</label>
            <input name='surname' type='text' className='input_infor' required="required" 
            onChange={handleInputChange} value={surname} />
         
          </div>
         
          <div className='input_column'>
            <label>Student  Number</label>
            <input name='IDnumber' type='text' className='input_infor' required="required" 
            onChange={handleInputChange} value={IDnumber}/>
          </div>
        </div>
        <div className='input_row'>
    
          <div className='input_column'>
          <label>Student completed all modules ?</label> 
            <select class="custom-select" id="gender3" name='completed'
          value={completed} onChange={handleInputChange} >
            <option selected>Choose...</option>
            <option  name="No" >No</option>
            <option name="Yes" >Yes</option>
           
          </select>
          
          </div>

        </div>
        <div className='headings'>
        <h3>Other Information</h3>
      </div>
      <div className='input_row'>
          <div className='input_column'>
          <label>University Name</label>
            <select class="custom-select" id="gender3" name='UniversityName'
          value={UniversityName} onChange={handleInputChange} >
            <option selected>Choose...</option>
            <option  name="TUT" >TUT</option>
            <option name="UL" >UL</option>
            <option name="UP" >UP</option>
            <option name="UJ" >UJ</option>
            <option name="VUT" >VUT</option>
            <option name="Wits" >Wits</option>
            <option name="UNISA" >UNISA</option>
            <option name="UCT" >UCT</option>
          </select>
        
          </div>
          {/* <div className='input_column'>
          <label>mentality</label> 
            <select class="custom-select" id="gender3" name='mentality'
          value={mentality} onChange={handleInputChange} >
            <option selected>Choose...</option>
            <option  name="Normal" >Normal</option>
            <option name="Abnormal" >Abnormal</option>
           
          </select>
          
          </div> */}
          <div className='input_column'>
          <label>Total number of Months required</label>
            <input name='monthNum' type='number' className='input_infor' required="required"
            onChange={handleInputChange} value={monthNum}/>
          </div>
          <div className='input_column'>
          <label> Name of Faculty</label>
            <input name='faculty' type='text' className='input_infor' required="required" 
            onChange={handleInputChange} value={faculty}/>
          </div>
        </div>
       


        <div className='headings'>
          <button type='submit' className='button'><label className='button_Lable'>Submit</label></button>
          <p>{S}</p>
        </div>
      </form>
      </div>
    </div>
    </>
  )
}

export default AddScreen