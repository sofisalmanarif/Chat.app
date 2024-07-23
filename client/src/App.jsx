import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from './pages/LoginPage'
import SignupPage from './pages/SignupPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LoginPage />}/> 
    <Route path="/signup" element={  <SignupPage/>}/>
   
    
    </Routes>
     
    
    </BrowserRouter>

  )
}

export default App
