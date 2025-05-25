import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
// import axios from "axios";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";


function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {updateUser} =useContext(AuthContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      updateUser(res.data)
      // localStorage.setItem("user",JSON.stringify(res.data));

      navigate("/");

      
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input 
            name="username" 
            type="text" 
            placeholder="Username" 
            required 
            minLength={3} 
            maxLength={20} 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" 
            required
            minLength={6}
          />
          
          {error && <div className="error">{error}</div>}
          
          <button disabled={isLoading} type="submit">
            {isLoading ? (
              <span className="spinner">Loading...</span> // Add your spinner here
            ) : (
              "Login"
            )}
          </button>
          
          <Link to="/register">{"Don't"} have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;