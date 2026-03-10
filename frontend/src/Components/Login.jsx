import userStore from "../store/userStore";
import React from "react";
const Login = () => {

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login, loading } = userStore();


  const handleSubmit = async (e) => {
    e.preventDefault();
    login({username, password});
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
            <button onClick={(e) => handleSubmit(e)} className='btn' disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
            <p>Don't have an account? <a href="/signup">signup</a></p>
          </div>
      </div>
    </div>
  )
}

export default Login