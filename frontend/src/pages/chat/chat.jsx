import React,{useState} from 'react'
import { ChatState } from '../../Context/ChatProvider';
import AllChats from '../../components/chat/allChats';
import Chatbox from '../../components/chat/chatbox';

const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
 
  return (
    
    <div>

    {user&&

    <div className='flex '>
    <AllChats fetchAgain={fetchAgain}></AllChats>
    <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>

    </div>
    }

    {!user&&<div>no</div>}

    </div>
  )
}

export default Chat;