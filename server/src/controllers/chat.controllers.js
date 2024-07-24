import { Chat } from "../models/chats.model.js";
import { User } from "../models/user.model.js";


export const accessChat = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
  
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
  
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  };


export const fetchChats = async (req, res) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };


  export const createAGroup =async(req,res)=>{
    try {
        const {users,groupName} = req.body
        if(!users || !groupName){
           return res.status(400).json({success:false,msg :"Enter All Fields"})
        }
        let groupUsers = JSON.parse(users)
        groupUsers.push(req.user._id)

        const group  =  await Chat.create({
            users:groupUsers,
            chatName:groupName,
            groupAdmin:req.user,
            isGroupChat:true

        })
        const fullGroupChat = await Chat.findOne({ _id: group._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
        res.status(201).json({success:true,msg:"Group Created ",fullGroupChat})

    } catch (error) {
        console.log(error.message)
        // throw new Error(error.message)
    }
  }

  export const renameGroup =async(req,res)=>{
    try {
        const {groupId,name} = req.body
        if(!groupId || !name){
            return res.status(400).json({success:false,msg :"Enter All Fields"})
        }
        const group = await Chat.findByIdAndUpdate(groupId,{chatName:name},{new:true})
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        if (!group) {
            res.status(404);
            throw new Error("Chat Not Found");
          } else {
        return res.status(200).json({success:true,msg:"Name changed ",group})
          }
    } catch (error) {
        
    }
  }
  export const addMember =async(req,res)=>{
    try {
        const {groupId,userId} = req.body
        console.log(userId)
        if(!groupId || !userId){
            return res.status(400).json({success:false,msg :"Enter All Fields"})
        }
        const added = await Chat.findByIdAndUpdate(groupId,{
            $push: { users: userId },
          },
          {
            new: true,
          }
        )
          .populate("users", "-password")
          .populate("groupAdmin", "-password");
      
        if (!added) {
          res.status(404);
          throw new Error("Chat Not Found");
        } else {
            console.log(added)
            return res.status(200).json({success:true,msg:"user added ",added})
        }

        
    } catch (error) {
        
    }
  }

  export const removeMember =async(req,res)=>{
    try {
        const {groupId,userId} = req.body
        console.log(userId)
        if(!groupId || !userId){
            return res.status(400).json({success:false,msg :"Enter All Fields"})
        }
        
        const removed = await Chat.findByIdAndUpdate(groupId,{
            $pull: { users: userId },
          },
          {
            new: true,
          }
        )
          .populate("users", "-password")
          .populate("groupAdmin", "-password");
            
        if (!removed) {
          res.status(404);
          throw new Error("Chat Not Found");
        } else {
            // console.log(removed)
            return res.status(200).json({success:true,msg:"user removed ",removed})
        }

        
    } catch (error) {
        
    }
  }