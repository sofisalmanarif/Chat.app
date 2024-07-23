import { TabList, Tabs,Tab,TabPanel,TabPanels, Stack, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'
// import { Input } from 'postcss'
import React from 'react'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'

export const LoginPage = () => {
  return (
    <box className='h-screen w-full bg-blue-200 text-white gap-4 flex flex-col justify-center items-center'>
     <box className="container p-10 max-w-[700px] min-h-[50%] rounded-md bg-white">
     <box className='text-3xl flex items-center justify-center font-bold p-10 '>
        <h1 className= 'text-[5rem] text-black'>Gup Shupp</h1>
      </box>

      <box className=' text-black p-10 w-full  '>
      <Tabs variant='soft-rounded' colorScheme='blue' className='w-full'>
  <TabList className='mb-10 flex items-center justify-center'>

    <Tab className='w-[50%]'>Sign In</Tab>

    <Tab className='w-[50%]'>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel className=''>
     <Login/>
    </TabPanel>

    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
      </box>
     </box>


    </box>
  )
}

