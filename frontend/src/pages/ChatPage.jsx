import { useEffect, useState } from "react";
import { useParams } from "react-router"
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import ChatLoader from "../components/ChatLoader";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window

} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { Wind } from "lucide-react";


const ChatPage = () => {
  const {id : destinationUserId} = useParams();
  const [chatClient,setChatClient] = useState(null)

  const [channel,setChannel] = useState(null)
  const [loading,setLoading] = useState(true);
  const {authUser} = useAuthUser();

  const {data : tokenData} = useQuery({
    queryKey : ["streamToken"],
    queryFn : getStreamToken,
    enabled : !!authUser
  })

  useEffect(() => {
    const initChat = async () => {
      if(!tokenData?.data || !authUser){
        return;
      }

      try {
        console.log("initializing Stream Chat");

         const client = StreamChat.getInstance(process.env.VITE_STREAM_API_KEY);
        await client.connectUser({
          id : authUser.id,
          name : authUser.fullname,
          image : authUser.profilepic,


        },tokenData.token)

        const channelId = [authUser._id, destinationUserId].sort().join("-");

        const currChannel = client.channel("messaging",channelId,{
          members:[authUser._id,destinationUserId],
      })

      await currChannel.watch();

      setChatClient(client);
      setChannel(currChannel)
        } catch (error) {
        console.log("Error in Chat Page",error);
      }
      finally{
        setLoading(false);
      }
    }

    initChat();
   },[tokenData, authUser, destinationUserId])

   if(loading || !chatClient || !channel) return <ChatLoader />

  return (
    <div className="h-[vh]">
      <Chat client={chatClient}>
      <Channel channel={channel}>
      <div className="w-full relative">
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput focus />
      </Window>
      </div>
      </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage