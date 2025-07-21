import React, { useEffect ,useState,createContext} from 'react'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Reg from './Pages/Reg'
import AskQ from '../src/Qustion/AskQ'
import { Route, Routes,useNavigate , Navigate,useLocation} from 'react-router-dom'
import axios from './axiosconfig'
import AskQuestionForm from './Qustion/AskQuestionForm'
import QuestionDetail from './Qustion/QuestionDetail';
import About from './Pages/About'
import Navbar from './nav/Navbar'
import HowItWorks from './Pages/HowItWorks'
export const  appprovide=createContext()


export default function App() {
  const location = useLocation();
  const nav=useNavigate ()
 const [user,setuser]=useState({})
  
 
 async function chakeuser() {
    try {
      const { data } = await axios.get('/user/chake', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
     setuser(data)
    } catch (error) {
      console.log("Auth check failed:", error.response?.data || error.message);
      nav('/login');
    }
  
    
  }
 
  useEffect(()=>{
    chakeuser()
  },[])
  const showNavbar = !['/login', '/reg'].includes(location.pathname);
  return (
   <>
  
   <appprovide.Provider value={{user,setuser}}>
   {showNavbar && <Navbar />}
      <Routes>
  
     <Route path='/' element={<Home/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/reg' element={<Reg/>} />
     <Route path='/qustion' element={<AskQ/>} />
     <Route path='/seeq' element={<AskQuestionForm/>} />
     <Route path="/About" element={<About />} />
     <Route path="/question/:id" element={<QuestionDetail />} />
     <Route path="/ask" element={<HowItWorks />} />

     
      </Routes>
  
    </appprovide.Provider>
   </>
    
  )
}
