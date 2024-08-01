import React from "react"
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Stack, Toast, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import axios from "axios"
import UserListItem from "./UserItemList"

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


const accessChat = async (userId) => {
  console.log(userId,"access",token);

  try {
    // setLoadingChat(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(`/api/v1/chats`, { userId }, config);

    if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
    setSelectedChat(data);
    setLoadingChat(false);
    onClose();
  } catch (error) {
    Toast({
      title: "Error fetching the chat",
      description: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }
};

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
                      <UserListItem user={user} key={user._id} handleFunction={()=>accessChat(user._id)}/>))
                }
                </Stack>
                </Stack>
             
            </DrawerBody>
  
            
          </DrawerContent>
        </Drawer>
      </>
    )
  }