import React from 'react'
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [ isSubmitting, setIsSubmitting ] = React.useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.post("/auth/login", { username, password });
      console.log("User logged in", res.data);
      setUsername("");
      setPassword("");
      navigate("/");
    } catch (error) {
      console.log("Error", error.message);
      toast.error("Invalid credentials");
    }finally{
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <div className='modal-state'>
          <div className="signup">
            <h3>Login</h3>
            <div className="form">
              <label className='log-label' htmlFor="">Username: <br/>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </label>

              <label className='log-label' htmlFor="">Password:  <br/>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </label>
            </div>
            <button onClick={(e) => handleSubmit(e)} className='btn' disabled={isSubmitting}>{isSubmitting ? "Logging in..." : "Login"}</button>
            <p>Don't have an account? <a href="/signup">signup</a></p>
          </div>
      </div>
    </div>
  )
}

export default Login