import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from './pages/LoginPage'

import Chat from './pages/Chat';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<LoginPage />}/> 
    <Route path="/chat" element={  <Chat/>}/>
   
    
    </Routes>
     
    
    </BrowserRouter>

  )
}

export default App
