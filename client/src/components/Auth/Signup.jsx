import React, { useState } from 'react'
import { TabList, Tabs,Tab,TabPanel,TabPanels, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
import axios from "axios"

const Signup = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = async()=>{
        console.log(userName,email,password)

        const config = {
            headers:{
                "Content-type":"application/json"
            }
        }
        const {data} = await axios.post("/api/v1/users/register",{userName,email,password},config)
        console.log(data)
    }
  return (
    <Stack>

    <FormControl isRequired>
          <FormLabel>User Name</FormLabel>
          <Input type='test' placeholder='Enter User Name' onChange={(e)=>{setUserName(e.target.value)}}/>
      </FormControl>

      <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type='email' placeholder='Email' onChange={(e)=>{setEmail(e.target.value)}} />
      </FormControl>
      <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type='password' placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} />
      </FormControl>
      <Button onClick={submitHandler} className='mt-10' colorScheme='blue'>Sign Up</Button>

     </Stack>
  )
}

export default Signup