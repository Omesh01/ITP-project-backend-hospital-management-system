let Staff = require("../moduls/staffdemo");
const jwt = require('jsonwebtoken');
let refreshtokens = [];
const bcrypt = require("bcrypt");

exports.AddStaff = ((req,res) => {
    try{
        const newSaff = new Staff({
          email: req.body.email,
          Hash_password: req.body.Hash_password
        });
  
        newSaff.save().then(()=>{
          res.json("Added")
      }).catch((err) => {
          console.log(err);
      })
  
      
    } catch (error) {
      res.status(500).json({
        message: "Somthing Went Wrong..! +",
        error: error
      })
  
    }
})

exports.Signin = async (req, res) => {
    try {
      
      //console.log(req.body.email)
      const RegisterdStaff = await Staff.findOne({ email: req.body.email });
      console.log(RegisterdStaff)  
      if (RegisterdStaff) {
        const enterdPwd = req.body.Password;
        const dbPwd = RegisterdStaff.Hash_password;
        console.log(enterdPwd,dbPwd);
        //const checkPwd = await bcrypt.compare(enterdPwd, dbPwd);
        //console.log(checkPwd);
        if (/*checkPwd*/ enterdPwd == dbPwd) {
          const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: '1h'});
          const refreshToken = jwt.sign({ email: req.body.email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '24h' });
         
          refreshtokens.push(refreshToken);
          res.status(201).json({
            mesage: "Login Successfull..!",
            token,
            refreshToken,
            payload:{RegisterdStaff}
          })
        } else {
          res.status(401).json({
            message: "Incorrect Password..!"
          })
        }
      } else {
        res.status(404).json({
          message: "User Not Registered..!"
        })
      }
  
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Server error..!",
        error: error
      })
    }
  }
  
  exports.tokenRefresh = (req, res, next) => {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) {
      res.status(401).json({
        message: "Unauthorized..!"
      })
    } else if (!refreshtokens.includes(refreshToken)) {
      res.status(403).json({
        message: "Forbidden..!"
      })
    } else {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
        if (err) {
          res.status(403).json({
            message: "Forbidden..!"
          })
        } else {
          const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: "1h" });
          res.status(201).json({
            message: "Session Extended..!",
            token
          })
        }
      })
    }
  }
