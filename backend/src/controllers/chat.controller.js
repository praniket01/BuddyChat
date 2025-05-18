import {generateStreamToken} from "../lib/stream.js"

export async function getToken(req,res) {
    try {
       const token = generateStreamToken(req.user.id);
       res.status(200).send({"data" : token});
    } catch (error) {
        console.log("Error in getToken", error);
    }
    
}

