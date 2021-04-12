const express = require('express');
const user_router = express.Router();
const bodyParser = require('body-parser');
user_router.use(bodyParser.urlencoded({ extended: false }));
user_router.use(bodyParser.json());
const Order = require('../models/orders'); //Require model





// Begin == Lấy danh sách order của user //
user_router.get('/order/:customer_id', async (req, res) => {
    const {customer_id} = req.params;
    const orderlist = await getListOrderById(customer_id);
    if (orderlist.length > 0)
    {
        return res.status(200).json({code:1,listorder:listorder});
    }
        return res.status(200).json({code:0,msg:"Danh sách mua hàng không tồn tại"})
  });

let getListOrderById = async (customer_id) => {
    const order = await Order.find({
        customer_id:customer_id
    });

    if (!order) {
        throw new NotFoundError(`Not Found`);
    } else {
        return order;
    }
};
// End == Lấy danh sách order của user //


// Begin == Lấy danh sách lịch sử giao dịch thành công của user //
user_router.get('/history/:customer_id', async (req, res) => {
    const {customer_id} = req.params;
    const listorder = await getListHistoryById(customer_id);
    if (listorder.length > 0)
    {
        return res.status(200).json({code:1,listorder:listorder});
    }
        return res.status(200).json({code:0,msg:"Danh sách lịch sử mua hàng không tồn tại"})
  });

let getListHistoryById = async (customer_id) => {
    const order = await Order.find({
        customer_id:customer_id,
        status:2
    });

    if (!order) {
        throw new NotFoundError(`Not Found`);
    } else {
        return order;
    }
};
// End == Lấy danh sách lịch sử giao dịch thành công của user //


//Begin Hoài 

// Update User Information
user_router.put('/update_user/', async (req, res) => {
    const {id, name, email, phone} = req.body
    const query = { name: name, phone: phone, email: email }
    const doc = await updateUser(id, query)
    if (doc) return res.json({code: 1, message: "Update user success", user: doc})
    else {
        return res.json({code: 0, message: "Cannot get and update user"})
    }
})

const updateUser = async (id, query) => {
    const doc = await Account.findOneAndUpdate({id: id}, query, {new: true})
    if (doc) return doc
    else {
        throw new NotFoundError(`Not Found`);
    }
}

//Change password
user_router.put('/change_password', async (req, res) => {
    const {username, password, newPass} = req.body
    const doc = await changePassword(username, password, newPass)
    if (doc) {
        return res.json({code: 1, message: "Change password success"})
    }
    else {
        return res.json({code: 0, message: "Change password fail"}) 
    }
})

const changePassword = async (username, password, newPass) => {
    const doc = await Account.findOne({id: id})
    if (doc) {
        let passwordIsValid = bcrypt.compareSync(password, doc.password);
        if (passwordIsValid) {
            let hashedPassword = bcrypt.hashSync(newPass, 8);
            const updated = await Account.updateOne({username: username}, {password: hashedPassword})
            if (updated) return res.json({code:1,updated,msg:"Cập nhật thành công"})
            else {
                throw new NotFoundError(`Not Found`);
            }
        }
    }
}



//End Hoài
module.exports = user_router;