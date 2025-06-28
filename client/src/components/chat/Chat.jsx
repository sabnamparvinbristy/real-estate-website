import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext"; // Make sure this exists
import "./chat.scss";

function Chat() {
  const { currentUser } = useContext(AuthContext);
  const [chat, setChat] = useState(null);

  const dummyChats = [
    {
      id: 1,
      receiver: {
        username: "Tania Akter",
        avatar: "/user2.png"
      },
      lastMessage: "Hello are you available?"
    },
    {
      id: 2,
      receiver: {
        username: "sabnam",
        avatar: "/user1.jpg"
      },
      lastMessage: "Please reply ASAP"
    }
  ];

  const dummyMessagesMap = {
    1: [
      {
        id: 1,
        text: "Hello how are you?",
        userId: 2,
        createdAt: "1 hour ago"
      },
      {
        id: 2,
        text: "I'm good, how about you?",
        userId: currentUser?.id,
        createdAt: "55 minutes ago"
      }
    ],
    2: [
      {
        id: 1,
        text: "Please reply ASAP",
        userId: 2,
        createdAt: "30 minutes ago"
      },
      {
        id: 2,
        text: "Sure, what's the issue?",
        userId: currentUser?.id,
        createdAt: "28 minutes ago"
      }
    ]
  };

  const handleOpenChat = (chatId, receiver) => {
    const messages = dummyMessagesMap[chatId] || [];
    setChat({
      id: chatId,
      receiver,
      messages
    });
  };

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {dummyChats.map((c) => (
          <div
            className="message"
            key={c.id}
            onClick={() => handleOpenChat(c.id, c.receiver)}
            style={{
              backgroundColor: chat?.id === c.id ? "white" : "#fecd514e"
            }}
          >
            <img src={c.receiver.avatar} alt="" />
            <span>{c.receiver.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.receiver.avatar} alt="" />
              <span>{chat.receiver.username}</span>
            </div>
            <span className="close" onClick={() => setChat(null)}>X</span>
          </div>

          <div className="center">
            {chat.messages.length > 0 ? (
              chat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`chatMessage ${msg.userId === currentUser?.id ? "own" : ""}`}
                >
                  <p>{msg.text}</p>
                  <span>{msg.createdAt}</span>
                </div>
              ))
            ) : (
              <div className="noMessages">No messages yet</div>
            )}
          </div>

          <div className="bottom">
            <textarea placeholder="Type your message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;








// import { useContext, useRef } from "react";
// import { AuthContext } from "../../context/AuthContext"; // adjust path as needed
// import apiRequest from "../../lib/apiRequest";
// import { format } from "timeago.js";
// import { useState } from "react"
// import "./chat.scss"


// function Chat({ chats }) {

//     const [chat,setChat] = useState(null);
//     const { currentUser } = useContext(AuthContext);

//     // console.log(chats);

//     const handleOpenChat = async (id, receiver) => {
//     try {
//       const res = await apiRequest("/chats/" + id);
//       if (!res.data.seenBy.includes(currentUser.id)) {
//         decrease();
//       }
//       setChat({ ...res.data, receiver });
//     } catch (err) {
//       console.log(err);
//     }
//   };




//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const text = formData.get("text");

//     if (!text) return;
//     try {
//       const res = await apiRequest.post("/messages/" + chat.id, { text });
//       setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
//       e.target.reset();
      
//     } catch (err) {
//       console.log(err);
//     }
//   };
//  return (
//     <div className="chat">
//       <div className="messages">
//         <h1>Messages</h1>
//         {chats?.map((c) => (
//           <div
//             className="message"
//             key={c.id}
//             style={{
//               backgroundColor:
//                 c.seenBy.includes(currentUser.id) || chat?.id === c.id
//                   ? "white"
//                   : "#fecd514e",
//             }}
//             onClick={() => handleOpenChat(c.id, c.receiver)}
//           >
//             <img src={c.receiver.avatar || "/noavatar.png"} alt="" />
//             <span>{c.receiver.username}</span>
//             <p>{c.lastMessage}</p>
//           </div>
//         ))}
//       </div>
//       {chat && (
//         <div className="chatBox">
//           <div className="top">
//             <div className="user">
//               <img src={chat.receiver.avatar || "noavatar.png"} alt="" />
//               {chat.receiver.username}
//             </div>
//             <span className="close" onClick={() => setChat(null)}>
//               X
//             </span>
//           </div>
//           <div className="center">
//             {chat.messages.map((message) => (
//               <div
//                 className="chatMessage"
//                 style={{
//                   alignSelf:
//                     message.userId === currentUser.id
//                       ? "flex-end"
//                       : "flex-start",
//                   textAlign:
//                     message.userId === currentUser.id ? "right" : "left",
//                 }}
//                 key={message.id}
//               >
//                 <p>{message.text}</p>
//                 <span>{format(message.createdAt)}</span>
//               </div>
//             ))}
//             <div ref={messageEndRef}></div>
//           </div>
//           <form onSubmit={handleSubmit} className="bottom">
//             <textarea name="text"></textarea>
//             <button>Send</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Chat;












//     return (
//         <div className="chat">
//             <div className="messages">
//                 <h1>Messages</h1>
//                 {chats?.map((c)=>(
//                     <div className="message">
//                     {/* <img src="/user2.png" alt="" /> */}
//                     <img src={c.reciever.avatar || "noavatar.png"} alt="" />
//                     <span>{c.reciever.username}</span>
//                     <p>
//                         {c.lastMessage}
//                     </p>
//                 </div>
//                 ))}
                
//                 <div className="message">
//                     <img src="/user2.png" alt="" />
//                     <span>Tania Akter</span>
//                     <p>
//                         Hello are you available?
//                     </p>
//                 </div>
//                 <div className="message">
//                     <img src="/user2.png" alt="" />
//                     <span>Tania Akter</span>
//                     <p>
//                         Hello are you available?
//                     </p>
//                 </div>
//                 <div className="message">
//                     <img src="/user2.png" alt="" />
//                     <span>Tania Akter</span>
//                     <p>
//                         Hello are you available?
//                     </p>
//                 </div>
//                 <div className="message">
//                     <img src="/user2.png" alt="" />
//                     <span>Tania Akter</span>
//                     <p>
//                         Hello are you available?
//                     </p>
//                 </div>
//             </div>
//             {chat && (
//             <div className="chatBox">
//                 <div className="top">
//                     <div className="user">
//                         <img src="/user2.png" alt="" />
//                         Tania Akter
//                     </div>
//                     <span className="close" onClick={()=>setChat(null)}>X</span>
//                 </div>
//                 <div className="center">
//                     <div className="chatMessage">
//                         <p>Hello how are you?</p>
//                         <span>1 hour ago</span>
//                     </div>
//                     <div className="chatMessage own" >
//                         <p>Hello how are you?</p>
//                         <span>1 hour ago</span>
//                     </div>
//                     <div className="chatMessage">
//                         <p>Hello how are you?</p>
//                         <span>1 hour ago</span>
//                     </div>
//                     <div className="chatMessage own">
//                         <p>Hello how are you?</p>
//                         <span>1 hour ago</span>
//                     </div>
//                     <div className="chatMessage">
//                         <p>Hello how are you?</p>
//                         <span>1 hour ago</span>
//                     </div>
//                     <div className="chatMessage own">
//                         <p>Hello how are you?</p>
//                         <span>1 hour ago</span>
//                     </div>
//                     <div className="chatMessage">
//                         <p>Hello how are you?</p>
//                         <span>1 hour ago</span>
//                     </div>
//                     <div className="chatMessage own">
//                         <p>Hello how are you?</p>
//                         <span>1 hour ago</span>
//                     </div>
//                 </div>
//                 <div className="bottom">
//                     <textarea > </textarea>
//                     <button>Send</button>
//                 </div>
//             </div>
//             )}
//         </div>
//     );
// }

// export default Chat