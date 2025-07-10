import React, { useEffect } from 'react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Reg from './Pages/Reg'
import AskQ from '../src/Qustion/AskQ'
import { Route, Routes,useNavigate , Navigate} from 'react-router-dom'
import axios from './axiosconfig'
import AskQuestionForm from './Qustion/AskQuestionForm'

export default function App() {
  const nav=useNavigate ()
 
  async function chakeuser() {
    try {
      const { data } = await axios.get('/user/chake', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      console.log(data);
    } catch (error) {
      console.log("Auth check failed:", error.response?.data || error.message);
      nav('/login');
    }
  
    
  }
 
  useEffect(()=>{
    chakeuser()
  },[])
  return (
    <div>
      <Routes>
     <Route path='/home' element={<Home/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/reg' element={<Reg/>} />
     <Route path='/qustion' element={<AskQ/>} />
     <Route path='/seeq' element={<AskQuestionForm/>} />
     
      </Routes>
  
    </div>
  )
}
