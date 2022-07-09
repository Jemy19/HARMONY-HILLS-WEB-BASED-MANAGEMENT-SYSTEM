import React, {useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import { db } from '../../../firebase'
import { query, onSnapshot, setDoc, doc, collection, serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from 'uuid';
import {Link} from 'react-router-dom'

function Calendar({title}) {
    const [popup,setPop]=useState(false)
    const [data, setData] = useState([])

    const eventId = uuid()
    const [date, setDate] = useState([])
    const [eventsData, setEventsData] = useState([])

    useEffect(() => {

        // LISTEN (REALTIME)
        const unsub = onSnapshot(
          collection(db, "events"),
          (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() });
            });
            setEventsData(list);
          },
          (error) => {
            console.log(error);
          }
        );
    
        return () => {
          unsub();
        };
      }, []);

    const handleDateClick = (e:DateClickArg) =>{
        if (e.jsEvent.altKey){
            setPop(!popup)
            setDate(e.dateStr)
    }

    }
    const closePopup=()=>{
        setPop(false)
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        await setDoc(doc(db, "events", eventId), {
          ...data,
          timeStamp: serverTimestamp(),
        })
        setPop(false)
    }

    const handleInput = (e:DateClickArg) =>{
        const id = e.target.id
        const value = e.target.value
        
        setData({...data, [id] : value})
    }
  
  return (
    <>
    <div className="new">
      <div className="newContainer">
    <div style={{justifyContent:"space-between"}}className="top">
          <h1>{title}</h1>
          <Link style={{padding:"10px", color:"green", border:"1px solid green", textDecoration:"none"}} to="/eventlist">View Event List</Link>
    </div>
    <FullCalendar plugins = {[dayGridPlugin, interactionPlugin]} 
    dateClick = {handleDateClick}
    events= {eventsData}
    />
    </div>
    </div>
    <div>
                {
                    popup?
                    <div style={{padding:"20px", backgroundColor:"lightblue", height:"75%"}}>
                        <div style={{padding:"20px",marginTop:"100px",backgroundColor:"lightblue"}}>
                            <div className="col-lg-10 col-xl-7 mx-auto">
                                <form onSubmit={handleSubmit}>
                                <h1 style={{color:"black"}}>Event Registration</h1>
                                <label>Full Name</label>
                                <div className="form-group mb-3">
                                            <input id="name" type="text" required="" 
                                            autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" onChange={handleInput}/>
                                        </div>
                                <label>Email</label>
                                <div className="form-group mb-3">
                                            <input id="email" type="email" required="" 
                                            autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" onChange={handleInput}/>
                                        </div>
                                <label>Title</label>
                                <div className="form-group mb-3">
                                            <input id="title" type="text"  required="" 
                                            autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" onChange={handleInput}/>
                                </div>
                                <label>Date Scheduled</label>
                                <div className="form-group mb-3">
                                            <input id="sdate" type="text"  required="" 
                                            autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" value = {date} onInput={handleInput}/>
                                </div>
                                <label>Date End</label>
                                <div className="form-group mb-3">
                                            <input id="edate" type="date"  required="" 
                                            autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" onInput={handleInput}/>
                                </div>
                                <label>Start Time</label>
                                <div className="form-group mb-3">
                                            <input id="stime" type="time" required="" 
                                            autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" onChange={handleInput}/>
                                        </div>
                                <label>End Time</label>
                                <div className="form-group mb-3">
                                            <input id="etime" type="time" required="" 
                                            autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" onChange={handleInput}/>
                                </div>
                                <label>Location</label>
                                <div className="form-group mb-3">
                                            <input id="location" type="text" required="" 
                                            autoFocus="" className="form-control rounded-pill border-0 shadow-sm px-4" onChange={handleInput}/>
                                        </div>
                                    <button className="btn btn-secondary btn-block text-uppercase mb-2 rounded-pill shadow-sm" onClick={closePopup}>Cancel</button>
                                    <button type="submit" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Submit</button>
                                </form>
                                </div>
                        </div>
                    </div>:""
                }
            </div>
    </>
  )
}

export default Calendar