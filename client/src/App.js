import React from "react";
import './App.css';
import Home from './pages/Home/Home'
import Userlist from './pages/userList/Userlist'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {userInputs, duesInputs,transaction, recordInputs} from './formSource'
import New from './pages/new/new';

import Sidebar from './components/sidebar/sidebar'
import Navbar from './components/navbar/Navbar'

import Manageuser from './pages/userList/manage'
import Newdues from './pages/MonthlyDues/Newdues'
import Listdue from './pages/userList/listdue'
import Invoice from './pages/Invoice/invoice'
import Calendar from './pages/events/calendar'
import Transactionlist from './pages/userList/transactionlist'
import Messages from './pages/messages/messages'
import Newtransaction from './pages/transaction/newtransaction'
import Record from './pages/Records/Record'
import Addrecord from './pages/Records/Addrecord'

import Dashboard from "./components/logsign/Dashboard";
import Login from "./components/logsign/Login";
import PrivateRoute from "./components/logsign/PrivateRoute";
import AdminRoute from "./components/logsign/AdminRoute";
import ForgotPassword from "./components/logsign/ForgotPassword";
import UpdateProfile from "./components/logsign/UpdateProfile";
import Signup from "./components/logsign/signup";
import { AuthProvider } from "./context/AuthContextlog";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
          />
          <Route path="/update-profile" element={
            <AdminRoute>
              <UpdateProfile />
            </AdminRoute>
          } 
          />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Routes>
         <Navbar />
          <div className='App'>
              <Sidebar />   
              <Routes>
                <Route exact path = '/dashboard' element = {<PrivateRoute><Home /></PrivateRoute>}/>
                <Route exact path = 'userList' element ={<PrivateRoute><Manageuser title=" Manage Users" /></PrivateRoute>} />
                <Route exact path = 'newuser' element = {<PrivateRoute><New inputs={userInputs} title="Add New User" /></PrivateRoute>}/>
                <Route exact path = 'manageusers' element =  {<PrivateRoute><Userlist /></PrivateRoute>}/>
                <Route exact path = '/newdues' element = {<PrivateRoute><Newdues inputs={duesInputs} title="Add New Monthly Due"/></PrivateRoute>}/>
                <Route exact path = '/newtransaction' element = {<PrivateRoute><Newtransaction inputs={transaction} title="Add New Transaction"/></PrivateRoute>}/>
                <Route exact path = '/duelist' element = {<PrivateRoute><Listdue/></PrivateRoute>}/>
                <Route exact path = '/invoice' element = {<PrivateRoute><Invoice title="Create New Invoice"/></PrivateRoute>}/>
                <Route exact path = '/calendar' element = {<PrivateRoute><Calendar title="Calendar of Events"/></PrivateRoute>}/>
                <Route exact path = '/transaction' element = {<PrivateRoute><Transactionlist title="Transaction Records"/></PrivateRoute>}/>
                <Route exact path = '/messages' element = {<PrivateRoute><Messages/></PrivateRoute>}/>
                <Route exact path = '/reports' element = {<PrivateRoute><Record title="Reports"/></PrivateRoute>}/>
                <Route exact path = '/reports/addreports' element = {<PrivateRoute><Addrecord inputs={recordInputs} title="Generate Reports"/></PrivateRoute>}/>
              </Routes>
          </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
