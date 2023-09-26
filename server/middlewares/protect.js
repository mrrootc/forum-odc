import Jwt from "jsonwebtoken";


export const protect = async (req, res, next) => {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).json({
      message: "No Authorization Header",
    });
  }
  try {
    const token = authorization.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Invalid Token Format",
      });
    }
    const decode = Jwt.verify(token, SECRET_KEY);
    const { id, email } = decode;
    req.user = { id, email };
    // req.user = decode;
    next();
  } catch (error) {
    if (error instanceof Jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Session Expired",
        error: error.message,
      });
    }
    if (error instanceof Jwt.JsonWebTokenError || error instanceof TokenError) {
      return res.status(401).json({
        message: "Invalid Token",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Internal server Error",
      error: error.message,
      stack: error.stack,
    });
  }
};

export default protect;
