import React from 'react'
import api from "../api/axios.js"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const HomePage = () => {

  const navigate = useNavigate();

  const logout = async () => {
    try{
      api.post("/auth/logout");
      navigate("/login");
      toast.success("Logged out successfully");
    }catch(err){
      console.error(err.message);
    }
  }
  return (
    <div>
      <div className='container'>
          <header className='navbar'>
            <h2>Dashboard</h2>
            <div className='logout-con'>
              <button onClick={logout} className='btn'>Logout</button>
            </div>
         </header>
      </div>
    </div>
  )
}

export default HomePage