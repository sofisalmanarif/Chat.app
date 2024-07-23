import React, { useState } from 'react'
import { TabList, Tabs,Tab,TabPanel,TabPanels, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


const submitHandler = ()=>{
    console.log(email,password)
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