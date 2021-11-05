const jwt = require("jsonwebtoken")

function authManager() {
    verify = function (req, res, next) {
        try {
            console.log(req.cookies.token);
            const token = req.cookies.token;
            console.log("here first");
            if (!token) {
                console.log("and here");
                return res.status(200).json({
                    loggedIn: false,
                    user: null
                })
            }
           
            const verified = jwt.verify(token, process.env.JWT_SECRET)
          
            req.userId = verified.userId;
        
            next();
        } catch (err) {
            console.error(err);
            return res.status(401).json({
                errorMessage: "Unauthorized"
            });
        }
    }

    signToken = function (user) {
        return jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
    }

    return this;
}

const auth = authManager();
module.exports = auth;