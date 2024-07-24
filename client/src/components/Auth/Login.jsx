import React, { useState } from 'react'
import { TabList, Tabs,Tab,TabPanel,TabPanels, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()


const submitHandler =async ()=>{
    console.log(email,password)
    const config = {
      headers:{
          "Content-type":"application/json"
      }
  }
  const {data} = await axios.post("/api/v1/users/login",{email,password},config)
  
  console.log(data)
  if(data){
    localStorage.setItem("auth-token",data.token)
    navigate("/chat")

  }
}
  return (
    <Stack>
      <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type='email' placeholder='Email'  onChange={(e)=>{setEmail(e.target.value)}}/>
      </FormControl>
      <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} />
      </FormControl>
      <Button onClick={submitHandler} className='mt-10 ' fontSize='xl' colorScheme='blue'>Log In</Button>

     </Stack>
  )
}

export default Login