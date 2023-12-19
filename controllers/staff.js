const { response } = require('express');
const User = require('../moduls/staff')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
let refreshtokens = [];
const fs = require('fs');


exports.UserRegister = async (req, res) => {
  console.log(req.body)
 try{
  let file = 'N/A'
  if (req.file) {
    file = req.file.filename
  }
  console.log(req.body.email)
    const ExsistUser = await User.findOne({ email: req.body.email });
    console.log(!ExsistUser)
    if (ExsistUser) {

      res.status(404).json({
        message: "User Already registered..!",

      })
    } else if(!ExsistUser) {
      const prefix = 'UID'
      const USER_ID = (prefix + Date.now())
      console.log(USER_ID)
      const newUser = new User({
        user_id: USER_ID,
        name: req.body.name,
        birthday: req.body.birthday,
        staff_no: req.body.staff_no,
        email: req.body.email,
        Hash_password: req.body.Hash_password,
        gender:req.body.gender,
        tel_no:req.body.birthday,
        ProfilePicture: {
          data: fs.readFileSync('UploadImage/' + req.file.filename),
          contentType:"image/png"
        }

      });

      console.log(newUser);
      const newAcct = await newUser.save();
      if (newAcct) {
  
        res.status(201).json({
          message: "Registration Sucessfull..!",
          payload: newAcct
        })
      } else {

        res.status(400).json({
          message: "Somthing Went Wrong In Account Creating..!"
        })
      }


    }
  } catch (error) {
    res.status(500).json({
      message: "Somthing Went Wrong..!",
      error: error
    })



  }
}

exports.Signin = async (req, res) => {
  try {
    
    /*console.log(req.body.email)*/
    const RegisterdUser = await User.findOne({ email: req.body.email });
   // console.log(RegisterdUser)  
    if (RegisterdUser) {
      const enterdPwd = req.body.Hash_password;
      const dbPwd = RegisterdUser.Hash_password;
      const uid = RegisterdUser._id;
      //console.log(enterdPwd,dbPwd);
      console.log(uid);
      if (enterdPwd === dbPwd) {
        const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN_KEY, { expiresIn: '1h'});
        const refreshToken = jwt.sign({ email: req.body.email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '24h' });
        // console.log("token  "+token)
        // console.log("refresh token    "+refreshToken)
        refreshtokens.push(refreshToken);
        res.status(201).json({
          mesage: "Login Successfull..!",
          token,
          refreshToken,
          payload:{uid}
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

exports.Signout = (req, res) => {
  try {
    const refreshToken = req.body.refreshToken;
    refreshtokens = refreshtokens.filter(token => token !== refreshToken);
    res.status(200).json({
      message: "Signout successful!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error: error,
    });
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const allusers = await User.find();
    if (allusers) {
      res.status(200).json({
        message: "Fetched Successfull..!",
        payload: allusers
      })
    }
  }catch(error){
    console.log(error)
  }
}

exports.getOneUser = async (req, res) => {
  try {
    let userId = req.params.user_id;
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json({user
      })
    }
  }catch(error){
    console.log(error)
  }
}

