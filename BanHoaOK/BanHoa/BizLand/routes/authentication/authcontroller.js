const express = require('express');
const authcontroller_router = express.Router();
const bodyParser = require('body-parser');
authcontroller_router.use(bodyParser.urlencoded({ extended: false }));
authcontroller_router.use(bodyParser.json());
const Account = require('../../models/account'); //Require model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../config');
const VerifyToken = require('./verifytoken');
const { json } = require('body-parser');


//Begin == Đăng ký //

authcontroller_router.post('/register', async (req, res) =>{
  
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const number = await getlastmember()
    const id =  "KH00" + (parseInt(number.id.replace("KH00","")) + 1).toString();
    let check = await checkUsername(req.body.username)
    if (check==false)
    {
      return res.status(200).json({ code:0,msg:"username đã tồn tại" });
    }
    Account.create({
      id: id,
      username : req.body.username,
      password : hashedPassword,
      type : 2,
      name : req.body.name,
      email : req.body.email,
      phone : req.body.phone,
      membership : false
    },
    function (err, user) {
      if (err) return res.status(500).json(err)
      // create a token
      let token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.cookie('jwt', token, { maxAge: 86400 });
      return res.status(200).json({ code:1, auth: true, token: token });
    }); 
});

let getlastmember = async () => {
  const list = await Account.findOne({id:{ $regex: "KH" }
  }).sort({_id: -1}).limit(1);;

  if (!list) {
      throw new NotFoundError(`Not Found`);
  } else {
      return (list);
  }
};

let checkUsername = async (username) => {
  const account = await Account.findOne({username:username
  });

  if (account) {
      return false
  } else {
      return true
  }
};

//End == Đăng ký //


//Begin == Lấy thông tin //
authcontroller_router.get('/me', VerifyToken, function(req, res, next) {

    Account.findById(req.userId, { password: 0 }, function (err, account) {
      if (err) return res.status(500).send("There was a problem finding the user.");
      if (!account) return res.status(404).json("No user found.");
      
      res.status(200).json({code:1,account});
    });
    
  });
//End == Lấy thông tin đăng ký//

//Begin== Đăng nhập //
authcontroller_router.post('/login', function(req, res) {

    Account.findOne({ username: req.body.username }, function (err, account) {
      if (err) return res.status(500).send('Error on the server.');
      if (!account) return res.status(404).json('No user found.');
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, account.password);
      if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });
      
      var token = jwt.sign({ id: account._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.cookie('jwt', token, { maxAge: 86400 });
      
      res.status(200).json({ auth: true, token: token });
    });
    
  });
//End== Đăng nhập //

//Begin== Đăng xuất //
  authcontroller_router.get('/logout', function(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ auth: false, token: null });
  });
//End == Đăng xuất //
module.exports = authcontroller_router;

