import React from "react"
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Stack, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import axios from "axios"

export const  DrawerExample=({ isOpen, onOpen, onClose ,btnRef})=> {
   const [search,setSearch] = useState("")
   const [users, setUsers] = useState([])
  
   const token = localStorage.getItem("auth-token")
   const handleSearch =async()=>{
    try {
        console.log(users)

    const config={
        headers:{
            authorization:`Bearer ${token}`
        },

    }
    const {data} = await axios.get(`api/v1/users/search?search=${search}`,config)
    console.log("results",data?.users)
    setUsers(data.users)
    } catch (error) {
        console.log(error.message)
    }
}
    return (
      <>
        
        
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search User</DrawerHeader>
  
            <DrawerBody className="flex gap-2">
                <Stack>
                    <Box className="flex gap-2">
                    <Input placeholder='Type here...' onChange={(e)=>setSearch(e.target.value)}/>
              <Button colorScheme='blue' variant='outline' mr={3} onClick={handleSearch}>
                Go
              </Button>
                    </Box>
                <Stack>
                {
                    users.map((user)=>( 
                      <Box key={user._id}>
                        {user.userName}
                      </Box>))
                }
                </Stack>
                </Stack>
             
            </DrawerBody>
  
            
          </DrawerContent>
        </Drawer>
      </>
    )
  }