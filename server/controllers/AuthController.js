

export const SignUp = async (req,res , next) => {
    try {
        const {email , password} = req.body;
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}