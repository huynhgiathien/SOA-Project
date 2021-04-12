const express = require('express');
const admin_router = express.Router();
const bodyParser = require('body-parser');
admin_router.use(bodyParser.urlencoded({ extended: false }));
admin_router.use(bodyParser.json());

const Account = require('../models/account')
const PAGE_SIZE = 3

// Get all User
admin_router.get('/user', async (req, res) => {
    const page = parseInt(req.query.page) //Tương tự req.params
    if (page) {
        var skip = (page - 1) * PAGE_SIZE
        const users = await getUsers(skip)
        const total = await Account.find({})

        let number_page = 0
        if (total.length%PAGE_SIZE == 1)
        {
            number_page = parseInt((total.length / PAGE_SIZE - 0.5).toFixed(0)) + 1
        }
        else
        {
            number_page = total.length/PAGE_SIZE
        }

        console.log(number_page)
        if (users.length > 0) return res.status(200).json({code: 1, message: "Get user success", total: total.length, users: users})
        else {
            return res.json({code: 0, message: "Cannot get User"})
        }
    }
})

const getUsers = async (skip) => {
    const users = Account.find({}).skip(skip).limit(PAGE_SIZE)

    if (!users) {
        throw new NotFoundError(`Not Found`);
    } else {
        return users;
    }
}

// Get user by ID
admin_router.get('/user/:id', async (req, res) => {
    const {id} = req.params
    const user = await getUserByID(id)
    if (user) return res.json({code: 1, message: "Get user success", user: user})
    else {
        return res.json({code: 0, message: "Cannot get User"})
    }
})

const getUserByID = async (id) => {
    const doc = await Account.find({id: id})
    if (doc) return doc
    else {
        throw new NotFoundError(`Not Found`);
    }
}

// Delete User
admin_router.delete('/user/delete/:id', async (req, res) => {
    const {id} = req.params
    const doc = await deleteUserByID(id)
    if (doc) return res.json({code: 1, message: "Delete user success", user: doc})
    else {
        return res.json({code: 0, message: "Cannot get User"})
    }
})

const deleteUserByID = async (id) => {
    const doc = await Account.findOneAndDelete({id: id})
    if (doc) return doc
    else {
        throw new NotFoundError(`Not Found`);
    }
} 

module.exports = admin_router;