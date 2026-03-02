import jwt from "jsonwebtoken";

const JWT_SECRET = "1234";


export const verifyAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // id, role, email
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
