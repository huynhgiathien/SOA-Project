const express = require('express');
const voucher_router = express.Router();

const Voucher = require('../models/voucher')

//Begin==Get all vouchers//
voucher_router.get('/', async (req, res) => {
    const doc = await Voucher.find({})
    if (doc) return res.json({code: 1, message: "Get vouchers success", count: doc.length, vouchers: doc})
    else {
        return res.json({code: 0, message: "Get vouchers fail"})
    }
})
//End==Get all vouchers//

//Begin==Lấy thông tin 1 voucher//
voucher_router.get('/:code', async (req, res) => {
    const {code} = req.params
    const doc = await Voucher.find({code: code})
    if (doc) return res.json({code: 1, message: "Get voucher success", voucher: doc})
    else {
        return res.json({code: 0, message: "Get vouchers fail"})
    }
})
//End==Lấy thông tin 1 voucher//
module.exports = voucher_router