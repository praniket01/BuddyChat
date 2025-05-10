import express from 'express'
import { login,signup,logout,onboard } from '../controllers/auth.controller.js';
import { checkRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/onboarding",checkRoute,onboard);

router.get("/me",checkRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user});
})
export default router;