import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const shouldBeLoggedIn = async (req, res) => {

    const token = req.cookies.token

    if (!token) return res.status(401).json({ message: "Not Autjenticated!" })

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) return res.status(403).json({ message: "Token is not valid!" })
    })

    res.status(200).json({ message: "you are autheticated" })

};

// REGISTER
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Basic input validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    // Omit password from response
    const { password: _, ...userData } = newUser;

    res.status(201).json({ 
      message: "User registered successfully",
      user: userData
    });
  } catch (err) {
    console.error("Registration error:", err);
    
    // Handle duplicate username/email
    if (err.code === 'P2002') {
      return res.status(409).json({ 
        error: "Username or email already exists" 
      });
    }
    
    res.status(500).json({ 
      error: "Failed to register user. Please try again." 
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Basic input validation
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    // Check if JWT secret exists
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT secret key not configured");
    }

    // Check if user exists
    const user = await prisma.user.findUnique({ 
      where: { username } 
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const age = 1000 * 60 * 60 * 24 * 7; // 1 week
    const token = jwt.sign(
      { 
        id: user.id,
        iss: 'your-app-name',
        aud: 'your-app-name'
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    // Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: age,
    });

    // Omit password from response
    const { password: _, ...userData } = user;

    res.status(200).json({
      message: "Login successful",
      user: userData
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      error: "Failed to login. Please try again later." 
    });
  }
};

// LOGOUT
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Logout successful" });
};