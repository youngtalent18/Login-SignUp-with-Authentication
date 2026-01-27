import HomePage from "./Pages/HomePage"
import Login from "./Components/Login.jsx"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./Components/SignUp.jsx";
function App() {

  return (
    <div>
      <Router>
        <Toaster position="top-center"/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
