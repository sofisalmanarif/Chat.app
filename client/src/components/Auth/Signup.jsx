import React, { useState } from 'react'
import { TabList, Tabs,Tab,TabPanel,TabPanels, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'

const Signup = () => {
    const [name, setName] = useState("")
    const submitHandler = ()=>{
        // console.log(email,password)
    }
  return (
    <Stack>

    <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input type='test' placeholder='Enter Name' />
      </FormControl>

      <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type='email' placeholder='Email' />
      </FormControl>
      <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input type='password' placeholder='Password' />
      </FormControl>
      <Button onClick={submitHandler} className='mt-10' colorScheme='blue'>Sign Up</Button>

     </Stack>
  )
}

export default Signup