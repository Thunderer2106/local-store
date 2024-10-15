import { useState, useEffect } from "react";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from "../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import { toast } from "react-toastify";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
const AllChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats , notification, setNotification } = ChatState();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast.error("Error in loading chats");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
    fetchChats();
    console.log(notification);
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <div className="border rounded-md w-[30%] overflow-y-auto h-[500px] my-1 max-h-[500px] my-4 mx-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="outfit-600 mx-2 my-1 text-[22px]">Messages</div>

      {chats ? (
        <div>
          {chats.length === 0 ? (
            <div className="flex justify-center items-center h-screen">
              <div className="text-center">No chats to display</div>
            </div>
          ) : (
            <div className="my-5">
              {chats.map((chat) => (
                <div
                  className={` ${
                    selectedChat === chat ? "bg-orange-300" : ""
                  } border-b border-t py-3 rounded-sm`}
                >
                  {/* bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"} */}

                  {/* <div className="outfit-400 mx-1 text-[15px]">user</div> */}
                  <button onClick={()=>setSelectedChat(chat)} className="w-full">
                    <div className="outfit-600 mx-1 text-[18px] text-start">
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </div>
                    <div className="outfit-300 mx-1 text-[15px] text-gray-400 text-start">
                    {chat.latestMessage && (
                  <div>
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </div>
                )}
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <ChatLoading />
      )}
    </div>
  );
};

export default AllChats;
