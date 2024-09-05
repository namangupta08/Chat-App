// // import jwt from 'jsonwebtoken'


// // export const verifyToken = (req,res,next) => {
// //     const token = req.cookies.jwt
// //     // console.log(req.cookies)
// //     // console.log(token)
// //     if(!token){
// //        return res.status(401).send("You are not authentticated")
// //     }

// //     jwt.verify(token , process.env.JWT_KEY , async(err,payload) => {
// //         if(err){
// //             return res.status(403).send("Token is not valid")
// //         }
// //         req.userId = payload.userId;
// //         next();
// //     })
// // }
// // middleware/AuthMiddleware.js
// import jwt from 'jsonwebtoken';

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.JWT;
//     console.log('Token received:', token); // For debugging
//     if (!token) {
//         return res.status(401).send("You are not authenticated");
//     }

//     jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
//         if (err) {
//             return res.status(403).send("Token is not valid");
//         }
//         req.userId = payload.userId;
//         console.log("User ID set in middleware:", req.userId); // Add log to verify token
//         next();
//     });
// };


import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Correctly access the token from cookies
    const token = req.cookies.JWT;
    console.log('Token received:', token); // Debugging log to verify token received

    if (!token) {
        return res.status(401).send("You are not authenticated");
    }

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            return res.status(403).send("Token is not valid");
        }

        // Correctly set req.userId from the payload
        req.userId = payload.id;  // Corrected from payload.userId to payload.id
        console.log("User ID set in middleware:", req.userId); // Debugging log to verify the user ID
        next();
    });
};
