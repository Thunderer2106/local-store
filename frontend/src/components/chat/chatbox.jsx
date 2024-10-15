import { useEffect, useState, useRef } from "react";
import axios from "axios";

import animationData from "../../animations/typing.json";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import io from "socket.io-client";
import {
  getSender,
  getSenderFull,
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import { ChatState } from "../../Context/ChatProvider";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;
const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast.error("Error Occured!");
    }
  };
  const sendMessage = async (event) => {
    if (newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");

        const { data } = await axios.post(
          `http://localhost:5000/api/message`,
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        socket.emit("new message", data);
        setMessages([...messages, data]);
        console.log(messages);
      } catch (error) {
        toast.error("Error Occured!");
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          console.log('yes')

          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
        console.log('kjwjwj')
      }
      console.log('huyug')
    });
    
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const chatContainerRef = useRef(null);

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {selectedChat ? (
        <div className="w-[70%] mx-3 my-3">
          {messages && !selectedChat.isGroupChat && (
            <>
              <div className=" flex items-center border-b py-3">
                
                  <IoIosArrowBack onClick={()=>setSelectedChat("")}/>
              
                <div className="outfit-500 text-[20px] mx-2">
                  {getSender(user, selectedChat.users)}
                </div>
              </div>
              {/* <div>{user.name}</div> */}
              <div>
                {loading ? (
                  <Spinner />
                ) : (
                  <div>
                    <div
                      className="messages flex flex-col overflow-y-auto h-[400px] my-1 max-h-[400px]"
                      ref={chatContainerRef}
                    >
                      {messages.map((m, i) => (
                        <div
                          key={m._id}
                          className={`${
                            m.sender._id === user._id
                              ? "bg-orange-400 ml-auto"
                              : "border mr-auto "
                          } ${
                            isSameUser(messages, m, i, user._id)
                              ? "mt-3"
                              : "mt-10"
                          }  rounded-xl p-3 w-fit mx-2 `}
                        >
                          {m.content}
                        </div>
                      ))}
                    </div>
                    {/* <form
                        className="flex flex-col space-y-4"
                        onSubmit={()=>console.log('senddd')}
                      > */}
                    {/* <label
                          htmlFor="message"
                          className="text-base font-medium"
                        >
                          Enter a message:
                        </label> */}
                    <textarea
                      id="message"
                      className="rounded-lg px-4 py-2 border my-auto focus:border-orange-500 w-full focus:outline-none resize-none"
                      value={newMessage}
                      onChange={typingHandler}
                      onKeyPress={(e) =>
                        e.key === "Enter" ? sendMessage() : ""
                      }
                      placeholder="Enter a message..."
                    />

                    {/* <button
                      onClick={sendMessage}
                      className="rounded-lg bg-orange-500 text-white py-2 px-4 font-medium hover:bg-blue-600 focus:ring focus:ring-blue-700"
                    >
                      <RiSendPlaneFill />
                    </button> */}
                    {/* </form> */}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="mx-auto my-auto outfit-500">
          Click on a chat to open
        </div>
      )}
    </>
  );
};

export default Chatbox;
