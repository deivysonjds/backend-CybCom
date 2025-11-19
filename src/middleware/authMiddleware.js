import jwt from 'jsonwebtoken';
import "dotenv/config";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'não autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_ACESS);
    req.user = decoded;
    next();
  } catch (err) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_REFRESH);
    req.user = decoded;
    next();
    } catch (error) {
      return res.status(403).json({ error: 'não autorizado' });
    }
  }
}