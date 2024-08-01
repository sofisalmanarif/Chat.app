import { Box, Button, Heading, Menu, MenuButton, MenuItem, MenuList, Stack, useDisclosure, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import {  DrawerExample } from '../components/Drawer'
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../Redux/Reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { UserModel } from '../components/UserModel'
import MyChats from '../components/MyChat'


const Chat = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen:isopen, onOpen:onopen, onClose:onclose } = useDisclosure()
    const btnRef = React.useRef()
    const user = useSelector((state)=>state.authSlice.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectedChat, setSelectedChat] = useState();
   const [notification, setNotification] = useState([]);
   const [chats, setChats] = useState([]);

   

    // console.log(user)
    console.log("chat",user)

    const logoutHandler =()=>{
      console.log("Logout")
      dispatch(logout())
      navigate("/")

    }
  return (
    <Stack>
      <div className='flex items-center justify-between px-10 py-4'>
        <Box ref={btnRef} colorScheme='teal' onClick={onOpen} className="flex gap-2 items-center text-xl"> <SearchIcon w={4} h={5}/>search</Box>
        <Heading> gup shup</Heading>
        <Box className="flex gap-4">
          <Menu>
  <MenuButton rightIcon={<ChevronDownIcon />}>
    {user.userName}
  </MenuButton>
  <MenuList>
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <MenuItem>Delete</MenuItem>
    <MenuItem>Attend a Workshop</MenuItem>
  </MenuList>
</Menu>

<Menu >
  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
  <Wrap>
  <WrapItem>
    <Avatar size='sm' name={user.userName}  src={user.pic} />
  </WrapItem>
</Wrap>
  </MenuButton>
  <MenuList>
    <UserModel user={user}> 

    <MenuItem>Profile</MenuItem>
    </UserModel>
    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
    
  </MenuList>
</Menu>
</Box>
      </div>
      <div>
        <DrawerExample isOpen={isOpen} onOpen={onOpen} onClose={onClose} btnRef={btnRef}  setSelectedChat={setSelectedChat} setChats={setChats}/>
        </div>
        <section className='flex w-full h-[90vh]'>
          
            <MyChats setSelectedChat={setSelectedChat} setChats={setChats} chats={chats} selectedChat={selectedChat}/>
        
        </section>
    </Stack>
  )
}

export default Chat