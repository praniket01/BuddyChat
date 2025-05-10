import {StreamChat} from "stream-chat";
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY;
const apiPwd = process.env.STREAM_API_PWD;

if(!apiKey || !apiPwd){
    console.log("Secret/apikey is missing")
}

const streamClient = StreamChat.getInstance(apiKey,apiPwd);

export const createUser = async (userData)=>{
    try {
        await streamClient.upsertUsers([userData]);
        console.log("Stream user created");
        return userData;
    } catch (error) {
        console.log("Error at stream",error);

    }
}

export const getStreamToken = (userId)=>{

}

