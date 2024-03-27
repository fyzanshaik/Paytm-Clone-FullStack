import { BrowserRouter, Routes, Route } from "react-router-dom"
// import './App.css'
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import Dashboard  from "./pages/Dashboard"
function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        {/* <Route path='/send' element={<SendMoney />}></Route> */}
      </Routes>
    </BrowserRouter>
    {/* <div className='text-1xl'>
      Hey
    </div> */}

  </>
}

export default App


