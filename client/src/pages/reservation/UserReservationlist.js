import { DataGrid } from "@mui/x-data-grid";
import { userrevColumn, userRows } from "../../datatablesources";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";


const Reservationlist = ({title}) => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();
  
  
    useEffect(() => {
  
      // LISTEN (REALTIME)
      const unsub = onSnapshot(
        collection(db, "reservation"),
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
  
    const handleDelete = async (id) => {
      try {
        await deleteDoc(doc(db, "reservation", id));
        setData(data.filter((item) => item.id !== id));
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <> 
      <div className="listuser">
        <div className="listContainer">
            <h4>{title}</h4>
            <>
              <div className="datatable">
                <h4>
                  Reservation List
                </h4>
                <DataGrid
                  className="datagrid"
                  rows={data}
                  columns={userrevColumn}
                  pageSize={9}
                  rowsPerPageOptions={[9]}
                  experimentalFeatures={{ newEditingApi: true }}
                />
              </div>
            </>
        </div>
      </div>
    </>
  )
}

export default Reservationlist