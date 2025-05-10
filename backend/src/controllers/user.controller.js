import FriendRequest from "../models/FriendRequest.js";
import user from "../models/User.js";

export async function getRecommendedUser(req,res){
try {
    const currUSerId = req.user.id;
    const currUSer = req.user;

    const recommUser = await user.find({
        $and : [
           {_id : {$ne:currUSerId}},
           {$id : {$nin : currUSer.friends}},
           {isOnboarded : true}
        ]
    })
    res.status(200).json(recommUser);
} catch (error) {
    console.log("Error in getRecommended user:",error);
}
}

export async function getMyFriends(req,res){ 
    try {
        const user = await user.findById(req.user.id).select("friends").populate(
          "friends",  
            "fullname profilepic nativelanguage learnginlanguage"
        );
        res.status(200).json(user.friends);

    } catch (error) {
        console.log("error in getMyFriends : ",error);
    }
}

export async function sendFriendRequest(req,res){
    try {
        const myId = req.user.id;
        const {id:recipientID} = req.params;

        if(myId == recipientID) return res.status(400).json({message:"You cant send request to yourself"});

        const recipient = await user.findById(recipientID);
        if(!recipient){
            return res.status(404).json({message:"Wrong recipient id to send friend request to "});
        }
        if(recipient.friends.includes(myId)){
            return res.status(404).json({message:"You are already friends "});
        }
        const requestPending = await FriendRequest.findOne({
            $or:[
                {sender:myId , recipient:recipientID},
                {sender:recipientID, recipient:myId}
            ]
        });
        if(requestPending){
            return res.status(400).json({message:"A friend request is already pending with this user"})
        }
        const friendRequest = await friendRequest.create({
            sender : myId,
            recipient : recipientID
        })

        res.status(201).json({
            friendRequest
        })
    } catch (error) {
        console.log("Errro in friend request : ",error)
    }
}

export async function acceptFriendRequest(req,res){
    try {
        const {id:reqId} = req.params;
        const friendReq = await friendRequest.findById(reqId);

        if(!friendReq){
            return res.status(400).json({message:"Friend req not found"});
        }

        if(friendReq.recipient.toString() !== req.user.id){
            return res.status(400).json({message:"You are not authorized to accept this request"});
        
        }
        friendReq.status = "accepted";
        await friendReq.save();

        await user.findByIdAndUpdate(friendReq.sender,{
            $addToSet:{friends:friendReq.recipient}
        })
          await user.findByIdAndUpdate(friendReq.recipient,{
            $addToSet:{friends:friendReq.recipient}
        });

        res.status(200).json({message : "Friend request accepted"});
          
    } catch (error) {
        console.log("Error while accepting friend req ",error);
    }
}