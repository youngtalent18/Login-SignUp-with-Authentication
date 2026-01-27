import React, { use } from 'react'
import api from "../api/axios.js"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const HomePage = () => {

  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = React.useState(false);
  const [ user, setUser ] = React.useState(null);

  const logout = async () => {
    try{
      api.post("/auth/logout");
      navigate("/login");
    }catch(err){
      console.error(err.message);
    }
  }

  React.useEffect(() => {
    profile();
  }, []);

  const profile = async () => {
    setIsLoading(true);
    try{
      const res = await api.get("/auth/me");
      const data = res.data;
      setUser(data);
    }catch(err){
      console.error(err.message);
    }finally{
      setIsLoading(false);
    }
  }
  return (
    <div>
      <div className='container'>
          <header className='navbar'>
            <h2>Dashboard</h2>
            <div className='logout-con'>
              <button onClick={logout} className='btn'>logout</button>
            </div>
         </header>
         {isLoading ? 
            <div className='loader'>
                <div className="spinner"/>
                <p>loading data...</p>
            </div> : (
          <div className='user-con'>
              <div className='user-info'>
              <h3>{user?.username} below is your Information</h3>
              <div className='info'>
                <p>Username: {user?.username}</p>
                <p>Email: {user?.email}</p>
                <p>Fullname: {user?.fullname}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage