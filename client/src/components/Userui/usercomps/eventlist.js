import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {collection, onSnapshot} from "firebase/firestore";
import { db } from "../../../firebase";

const Eventlist = ({title}) => {
  const [data, setData] = useState([]);

  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "events"),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);


    return (
      <div className="new">
      <div className="newContainer">
         <div style={{justifyContent:"space-between", height:"60px"}}className="top">
          <h1>{title}</h1>
          <Link style={{padding:"10px", color:"green", border:"1px solid green", textDecoration:"none"}} to="/calendar">Back to Calendar</Link>
        </div>
        <div className = "record">
        {
            data.map((items)=>(
                <div style ={{display:""}}className = "recordcard">
                      <h1 style ={{textAlign:"center", marginLeft:"10px", marginBottom:"10px",marginTop:"10px"}}>{items.title}</h1>
                      <p style ={{marginLeft:"20px",marginBottom:"10px"}}><span style ={{fontWeight:'500'}}>Organizer:</span> {items.name}</p>
                      <p style ={{marginLeft:"20px",marginBottom:"10px"}}><span style ={{fontWeight:'500'}}>Date: </span> {items.sdate}-{items.edate}</p>
                      <p style ={{marginLeft:"20px",marginBottom:"10px"}}><span style ={{fontWeight:'500'}}>Start Time: </span>{items.stime}-{items.etime}</p>
                    <p style ={{marginLeft:"20px", marginBottom:"10px"}}><span style ={{fontWeight:'500'}}>Location: </span>{items.location}</p>              
                </div>
            ))
        }
        </div>
        </div>
      </div>
    );
}

export default Eventlist