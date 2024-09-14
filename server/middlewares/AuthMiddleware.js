import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
   
    console.log(req.cookies);
    const token = req.cookies.jwt;
    console.log("Token in authmiddleware"  , token )

    if (!token) {
        return res.status(401).send("You are not authenticated");
    }

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            return res.status(403).send("Token is not valid");
        }

        req.userId = payload.userId; 
        console.log("User ID set in middleware:", req.userId);
        next();
    });
};

