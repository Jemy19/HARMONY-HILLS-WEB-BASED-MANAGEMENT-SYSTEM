import React,{useState, useEffect} from 'react'
import './new.css'
import { useNavigate,useParams } from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { setDoc, doc, getDoc, collection, addDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import {auth, db, storage} from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { async } from '@firebase/util';

const initialState ={
    displayName:"",
    name:"",
    address:"",
    email:"",
    password:"",
    phoneNumber:"",
    Country:""
    
}
function Update({inputs, title}) {

  const [file, setFile] = useState("")
  const [data,setData] = useState({initialState})
  const {displayName, name,address,email, password,phoneNumber,country} = data
  const [per, setPerc] = useState(null)
  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(()=>{
        id && getSingleUser()

  },[id])

  const getSingleUser = async () =>{
        const docRef = doc(db, "users", id)
        const snapshot = await getDoc(docRef)
        if (snapshot.exists()){
            setData({...snapshot.data()})
        }
  }




  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  console.log(data);


  const handleAdd = async (e) => {
    
    e.preventDefault();
   
      await setDoc(doc(db, "users", id), {
        ...data,
        timeStamp: serverTimestamp(),
      });
      navigate('/userList')
    } 

  const handleInput = (e) =>{
      const id = e.target.id
      const value = e.target.value
     
      setData({...data, [id] : value})
  }

  console.log(data)


  return (
    <>
    <div className="new">
      <div className="newContainer">

        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img className = "img"
              src={
                file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />  
          </div>
          <div className="right">
            <form className = "newform" onSubmit = {handleAdd}>
              <div className="formInput">
                <label className = "Imglabel"htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange ={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
                <input id = 'name' value = {name} placeholder= 'Username' type='text' onChange ={handleInput}/>
                <input id = 'displayName' value = {displayName} placeholder= 'Full Name' type='text' onChange ={handleInput}/>
                <input id = 'address' value = {address} placeholder= 'Address' type='text' onChange ={handleInput}/>
                <input id = 'email' value = {email} placeholder= 'Email' type='email' onChange ={handleInput}/>
                <input id = 'phoneNumber' value = {phoneNumber} placeholder= 'Contact Number' type='tel' onChange ={handleInput}/>
                <input id = 'password' value = {password} placeholder= 'Password' type='password' onChange ={handleInput}/>
                <input id = 'country' value = {country} placeholder= 'Country' type='text' onChange ={handleInput}/>
            <button className = "newbutton" disabled={per !== null && per < 100} type="submit">
                Send
            </button>
            </form>

          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Update