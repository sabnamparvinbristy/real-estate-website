import { useState } from "react"
import "./chat.scss"

function Chat(){
    const [chat,setChat] = useState(true)
    return (
        <div className="chat">
            <div className="messages">
                <h1>Messages</h1>
                <div className="message">
                    <img src="/user2.png" alt="" />
                    <span>Tania Akter</span>
                    <p>
                        Hello are you available?
                    </p>
                </div>
                <div className="message">
                    <img src="/user2.png" alt="" />
                    <span>Tania Akter</span>
                    <p>
                        Hello are you available?
                    </p>
                </div>
                <div className="message">
                    <img src="/user2.png" alt="" />
                    <span>Tania Akter</span>
                    <p>
                        Hello are you available?
                    </p>
                </div>
                <div className="message">
                    <img src="/user2.png" alt="" />
                    <span>Tania Akter</span>
                    <p>
                        Hello are you available?
                    </p>
                </div>
                <div className="message">
                    <img src="/user2.png" alt="" />
                    <span>Tania Akter</span>
                    <p>
                        Hello are you available?
                    </p>
                </div>
            </div>
            {chat && (
            <div className="chatBox">
                <div className="top">
                    <div className="user">
                        <img src="/user2.png" alt="" />
                        Tania Akter
                    </div>
                    <span className="close" onClick={()=>setChat(null)}>X</span>
                </div>
                <div className="center">
                    <div className="chatMessage">
                        <p>Hello how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own" >
                        <p>Hello how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>Hello how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>Hello how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>Hello how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>Hello how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>Hello how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>Hello how are you?</p>
                        <span>1 hour ago</span>
                    </div>
                </div>
                <div className="bottom">
                    <textarea > </textarea>
                    <button>Send</button>
                </div>
            </div>
            )}
        </div>
    );
}

export default Chat