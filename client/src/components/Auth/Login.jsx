import React, { useState } from 'react'
import { TabList, Tabs,Tab,TabPanel,TabPanels, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../Redux/Reducers/userReducer'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()



const submitHandler =async ()=>{
    console.log(email,password)
    setLoading(true)
    const config = {
      headers:{
          "Content-type":"application/json"
      }
  }
  const {data} = await axios.post("/api/v1/users/login",{email,password},config)
  setLoading(false)
  console.log(data)
  dispatch(login(data.user))

  if(data){
    localStorage.setItem("auth-token",data.token)
    // console.log(data)
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
      <Button isLoading={loading} onClick={submitHandler} className='mt-10 ' fontSize='xl' colorScheme='blue'>Log In</Button>

     </Stack>
  )
}

export default Login