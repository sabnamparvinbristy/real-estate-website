import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { useState } from "react";
import "./chat.scss";

function Chat({ chats }) {
    const [chat, setChat] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const messageEndRef = useRef(null);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat?.messages]);

    const handleOpenChat = async (id, receiver) => {
        try {
            const res = await apiRequest("/chats/" + id);
            setChat({ 
                ...res.data, 
                receiver,
                messages: res.data.messages || []
            });
        } catch (err) {
            console.error("Error opening chat:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get("text");

        if (!text || !chat?.id) return;

        try {
            const res = await apiRequest.post("/messages/" + chat.id, { text });
            setChat(prev => ({
                ...prev,
                messages: [...(prev.messages || []), res.data]
            }));
            e.target.reset();
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    return (
        <div className="chat">
            <div className="messages">
                <h1>Messages</h1>
                {chats?.map((c) => (
                    <div
                        className="message"
                        key={c.id}
                        style={{
                            backgroundColor: (c.seenBy?.includes(currentUser.id) || chat?.id === c.id)
                                ? "white"
                                : "#fecd514e"
                        }}
                        onClick={() => handleOpenChat(c.id, c.receiver)}
                    >
                        <img src={c.receiver?.avatar || "/noavatar.png"} alt="" />
                        <span>{c.receiver?.username}</span>
                        <p>{c.lastMessage}</p>
                    </div>
                ))}
            </div>
            {chat && (
                <div className="chatBox">
                    <div className="top">
                        <div className="user">
                            <img src={chat.receiver?.avatar || "/noavatar.png"} alt="" />
                            <span>{chat.receiver?.username}</span>
                        </div>
                        <span className="close" onClick={() => setChat(null)}>
                            X
                        </span>
                    </div>
                    <div className="center">
                        {chat.messages?.length > 0 ? (
                            chat.messages.map((message) => (
                                <div
                                    className="chatMessage"
                                    style={{
                                        alignSelf: message.userId === currentUser.id
                                            ? "flex-end"
                                            : "flex-start",
                                        textAlign: message.userId === currentUser.id 
                                            ? "right" 
                                            : "left"
                                    }}
                                    key={message.id}
                                >
                                    <div className="messageContent">
                                        <p>{message.text}</p>
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="noMessages">No messages yet</div>
                        )}
                        <div ref={messageEndRef} />
                    </div>
                    <form onSubmit={handleSubmit} className="bottom">
                        <textarea name="text" placeholder="Type your message..." />
                        <button type="submit">Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Chat;






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