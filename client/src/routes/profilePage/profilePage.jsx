import { useAsyncError, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";

function ProfilePage(){

    const navigate =useNavigate()

    const handleLogout = async () =>{
        try{
            const res = apiRequest.post("/auth/logout")

            localStorage.removeItem("user")

            navigate("/")

        }catch(err){
            console.log(useAsyncError)
        }
    }
    return(

        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <button>Update Profile</button>
                    </div>
                    <div className="info">
                        <span>Avater: <img src="./profile.png" alt="" />
                        </span>

                        <span>Username: <b>Sabnam Parvin</b></span>
                        <span>E-mail: <b>sabnam@gmail.com</b></span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="title">
                        <h1>My List</h1>
                        <button>Create New Post</button>
                    </div>
                    <List/>
                    <div className="title">
                        <h1>Saved List</h1>
                        {/* <button>Update Profile</button> */}
                    </div>
                    <List/>
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Chat/>
                </div>
            </div>
        </div>
    )
}


export default ProfilePage