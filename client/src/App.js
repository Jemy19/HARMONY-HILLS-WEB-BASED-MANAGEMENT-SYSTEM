import React from "react";
import './App.css';
import Home from './pages/Home/Home'
import Userlist from './pages/userList/Userlist'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {userInputs, duesInputs,transaction, recordInputs} from './formSource'
import New from './pages/new/new';
import Update from './pages/new/update';

import Sidebar from './components/sidebar/sidebar'
import NewSidebar from './components/sidebar/newsidebar'
import Navbar from './components/Userui/TopBar/navbar'
import NewNavbar from './components/Userui/TopBar/newnavbar'

import Manageuser from './pages/userList/manage'
import Newdues from './pages/MonthlyDues/Newdues'
import Newduess from './pages/MonthlyDues/Newduess'
import Listdue from './pages/userList/listdue'
import Invoice from './pages/Invoice/invoice'

import Transactionlist from './pages/userList/transactionlist'
import Messages from './pages/messages/messages'
import Newtransaction from './pages/transaction/newtransaction'
import Newtransactions from './pages/transaction/newtransactions'
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
import Userdash from "./components/Userui/Homes/Home";
import Announcement from './components/Userui/usercomps/announcement';
import Eventlist from './components/Userui/usercomps/eventlist';
import Udash from './components/Userui/usercomps/userui';
import Calendar from './components/Userui/usercomps/calendar';
import Mohad from './components/MOHAD/Home';



function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NewNavbar />
          <div className='App'>
            <NewSidebar />   
          <Routes>
            <Route exact path="/dash" element={
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
            <Route path="/forgot-password" element= {<ForgotPassword/>} />
            <Route exact path = '/update/:id' element = {<AdminRoute><Update /></AdminRoute>}/>
            <Route exact path = '/' element = {<PrivateRoute><Userdash/></PrivateRoute>}/>
            <Route exact path = '/Mohad' element = {<PrivateRoute><Mohad/></PrivateRoute>}/>
            <Route exact path = '/eventlist' element = {<PrivateRoute><Eventlist/></PrivateRoute>}/>
            <Route exact path = '/udash' element = {<PrivateRoute><Udash/></PrivateRoute>}/>
            <Route exact path = '/dashboard' element = {<AdminRoute><Home /></AdminRoute>}/>
            <Route exact path = 'userList' element ={<AdminRoute><Manageuser title=" Manage Users" /></AdminRoute>} />
            <Route exact path = 'newuser' element = {<AdminRoute><New inputs={userInputs} title="Add New User" /></AdminRoute>}/>
            <Route exact path = 'manageusers' element =  {<AdminRoute><Userlist /></AdminRoute>}/>
            <Route exact path = '/newdues' element = {<AdminRoute><Newdues inputs={duesInputs} title="Add New Monthly Due"/></AdminRoute>}/>
            <Route exact path = '/newduess' element = {<AdminRoute><Newduess inputs={duesInputs} title="Add New Monthly Due"/></AdminRoute>}/>
            <Route exact path = '/newtransaction' element = {<AdminRoute><Newtransaction inputs={transaction} title="Add New Transaction"/></AdminRoute>}/>
            <Route exact path = '/duelist' element = {<AdminRoute><Listdue/></AdminRoute>}/>
            <Route exact path = '/invoice' element = {<AdminRoute><Invoice title="Create New Invoice"/></AdminRoute>}/>
            <Route exact path = '/calendar' element = {<AdminRoute><Calendar title="Calendar of Events"/></AdminRoute>}/>
            <Route exact path = '/transaction' element = {<AdminRoute><Transactionlist title="Transaction Records"/></AdminRoute>}/>
            <Route exact path = '/messages' element = {<AdminRoute><Messages/></AdminRoute>}/>
            <Route exact path = '/reports' element = {<AdminRoute><Record title="Reports"/></AdminRoute>}/>
            <Route exact path = '/reports/addreports' element = {<AdminRoute><Addrecord inputs={recordInputs} title="Generate Reports"/></AdminRoute>}/>
            <Route exact path = '/Announcement' element = {<AdminRoute><Announcement /></AdminRoute>}/>
            <Route exact path = '/messages' element = {<AdminRoute><Messages/></AdminRoute>}/>
            <Route exact path = '/Calendar' element = {<AdminRoute><Calendar/></AdminRoute>}/>
            <Route exact path = '/newtransactions' element = {<AdminRoute><Newtransactions/></AdminRoute>}/>
            
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
