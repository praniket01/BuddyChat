import express from 'express'
import {checkRoute} from '../middleware/auth.middleware.js';
import { getRecommendedUser,getMyFriends,sendFriendRequest,acceptFriendRequest,getFriendRequests,getFriendRequestSent } from '../controllers/user.controller.js';

const router = express.Router();
router.use(checkRoute);

router.get("/",getRecommendedUser);
router.get("/friends",getMyFriends);

router.post("/friend-request/:id",sendFriendRequest); 
router.put("/friend-request/:id/accept",acceptFriendRequest); 

router.get("/friend-requests",getFriendRequests);
router.get("/friend-request-sent",getFriendRequestSent);


export default router;
