import { DataGrid } from "@mui/x-data-grid";
import { revColumn, userRows } from "../../datatablesources";
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
  
    const actionColumn = [
      {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
          return (
            <div className="cellAction">
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row.id)}
              >
                Delete
              </div>
            </div>
          );
        },
      },
    ];


  return (
    <>
    
    <div className="list">
      <div className="listContainer">
      <div className="top">
          <h1>{title}</h1>
        </div>
        <>
    <div className="datatable">
      <div className="datatableTitle">
        Reservation List
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={revColumn.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection 
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