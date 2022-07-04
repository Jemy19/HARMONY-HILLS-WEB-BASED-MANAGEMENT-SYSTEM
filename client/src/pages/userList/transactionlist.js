import "./userlist.css"
import Navbar from "../../components/navbar/Navbar"
import Transaction from "../transaction/transaction"
import Chart from '../../components/charts/Chart'
import {transactionData} from '../../dummydata'
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Transactionlist = ({title}) => {
  return (
    <>
    
    <div className="list">
      <div className="listContainer">
      <div className="top">
          <h1>{title}</h1>
        </div>
        <Transaction/>      
      </div>
    </div>
    </>
  )
}

export default Transactionlist