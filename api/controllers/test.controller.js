import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not Authenticated!" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) return res.status(403).json({ message: "Token is not valid!" });

    req.userId = payload.id;
    req.isAdmin = payload.isAdmin;

    next();
  });
};

export const shouldBeLoggedIn = (req, res) => {
  console.log("User ID:", req.userId);
  res.status(200).json({ message: "You are authenticated" });
};

export const shouldBeAdmin = (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({ message: "Not authorized!" });
  }
  next();
};
