import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({ success: false, message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // MUST contain id or _id

    next();
  } catch (error) {
    return res.json({ success: false, message: "Invalid token" });
  }
};

export default authMiddleware;