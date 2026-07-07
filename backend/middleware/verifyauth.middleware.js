const jwt = require("jsonwebtoken");
const { LucideFolderMinus } = require("lucide-react");
const SECRET_KEY = "7bf6cbe18ca0513332d1c3ebd2be7ea723ad1770";
const verifyAuth = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.send({
      success: false,
      message: "Your account is not authorizedd!",
    });
  }   
  const decode = jwt.verify(token, SECRET_KEY);
  if (!decode?.id) {
    return res.status(200).send({
       success: false,
      message: "Your account is not authorized!",
    });
  }  
   req.user = decode.id;
  
    next()
};
module.exports=verifyAuth