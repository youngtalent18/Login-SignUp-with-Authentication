import { useState } from 'react'
import userStore from '../store/userStore.js';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ fullname, setFullname ] = useState("");
 

  const { signup,loading } = userStore();
  const validateform = () =>{
    if(!username || !password || !email || !fullname){
      toast.error("All fields are required");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!validateform()) return;

    signup({username, password, email, fullname});
  }

  return (
    <div>
      <div className='modal-state'>
          <div className="signup">
            <h3>Register</h3>
            <div className="form">
              <label htmlFor="">Fullname:  <br/>
                <input type="text" value={fullname} onChange={(e)=>setFullname(e.target.value)} />
              </label>

              <label htmlFor="">Email:  <br/>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </label>

              <label htmlFor="">Password:  <br/>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </label>

              <label htmlFor="">Username: <br/>
                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
              </label>
            </div>
            <button className='btn' disabled={loading} onClick={(e)=>handleSubmit(e)}>{loading ? "Loading..." : "Submit"}</button>
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
      </div>
    </div>
  )
}

export default SignUp