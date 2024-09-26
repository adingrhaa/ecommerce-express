import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    jwt.verify(token, 'secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Failed to authenticate token' });
        }
        req.user = decoded;
        next();
    });
};

export default verifyToken;
