import HomePage from "./Pages/HomePage"
import Login from "./Components/Login.jsx"
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./Components/SignUp.jsx";
import { useEffect } from "react";
import userStore from "./store/userStore.js";
import Navbar from "./Components/Navbar.jsx";

function App() {

  const {user, checkAuth, checkingAuth} = userStore();

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  if (checkingAuth) return <div className="loader">loading....</div>

  return (
    <>
      <Router>
        <Toaster position="top-center"/>
        {user && <Navbar />}
        <Routes>
          <Route path="/" element={!user ? <Login /> : <HomePage />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
          <Route path="/signup" element={!user ? <SignUp />: <Navigate to="/" />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
