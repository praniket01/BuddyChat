import FriendRequest from "../models/FriendRequest.js";
import user from "../models/User.js";

export async function getRecommendedUser(req, res) {
    try {
        const currUSerId = req.user.id;
        const currUSer = req.user;

        const recommUser = await user.find({
            $and: [
                { _id: { $ne: currUSerId } },
                { _id: { $nin: currUSer.friends } },
                { isOnboarded: true }
            ]
        })
        res.status(200).json(recommUser);
    } catch (error) {
        console.log("Error in getRecommended user:", error);
    }
}

export async function getMyFriends(req, res) {
    try {
        const resuser = await user.findById(req.user.id).select("friends").populate(
            "friends",
            "fullname profilepic nativelanguage learninglanguage"
        );
        res.status(200).json(resuser.friends);

    } catch (error) {
        console.error("Error in getMyFriends controller", error.message ," " );
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user.id;
        const { id: recipientID } = req.params;

        if (myId == recipientID) return res.status(400).json({ message: "You cant send request to yourself" });

        const recipient = await user.findById(recipientID);
        if (!recipient) {
            return res.status(404).json({ message: "Wrong recipient id to send friend request to " });
        }
        if (recipient.friends.includes(myId)) {
            return res.status(404).json({ message: "You are already friends " });
        }
        const requestPending = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientID },
                { sender: recipientID, recipient: myId }
            ]
        });
        if (requestPending) {
            return res.status(400).json({ message: "A friend request is already pending with this user" })
        }
        const createFriendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientID
        })

        res.status(201).json({
            createFriendRequest
        })
    } catch (error) {
        console.log("Errro in friend request : ", error)
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const { id: reqId } = req.params;
        const friendReq = await FriendRequest.findById(reqId);

        if (!friendReq) {
            return res.status(400).json({ message: "Friend req not found" });
        }

        if (friendReq.recipient.toString() !== req.user.id) {
            return res.status(400).json({ message: "You are not authorized to accept this request" });

        }
        friendReq.status = "accepted";
        await friendReq.save();

        await user.findByIdAndUpdate(friendReq.sender, {
            $addToSet: { friends: friendReq.recipient }
        })
        await user.findByIdAndUpdate(friendReq.recipient, {
            $addToSet: { friends: friendReq.recipient }
        });

        res.status(200).json({ message: "Friend request accepted" });

    } catch (error) {
        console.log("Error while accepting friend req ", error);
    }
}

export async function getFriendRequests(req, res) {
    try {
        const increq = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending",

        }).populate("sender", "fullname profilepic nativelanguage learninglanguage");

        const acceptedReq = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted",

        }).populate("recipient", "fullname profilepic");

        res.status(200).json({ increq, acceptedReq });

    } catch (error) {
        console.log("Error in getFriendRequest", error);
    }

}

export async function getFriendRequestSent(req, res) {
    try {
        const outgoingReq = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate("recipient", "fullname profilepic nativelanguage learninglanguage")
        res.status(200).json(outgoingReq);

    } catch (error) {
        console.log("Error in GetFriendRequestsent", error);
    }
}