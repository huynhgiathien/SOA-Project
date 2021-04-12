const express = require('express');
const ship_router = express.Router();
const bodyParser = require('body-parser');
ship_router.use(bodyParser.urlencoded({ extended: false }));
ship_router.use(bodyParser.json());
const fetch = require('node-fetch')
const Shipper = require('../models/ships.js'); //Require model

ship_router.get('/', async (req,res)=>{
    return res.json('Danh sách shipper')
})
//Begin==Get Provinces//
ship_router.get('/province', async (req,res)=>{
    const Token = "e82d75a1-9876-11eb-8be2-c21e19fc6803";
    const province = await fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",{
        method:'get',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Token':Token
        }
    })
    .then(res => res.json())
    .then(json=>{
        return res.json({code:1,msg:"Lấy danh sách thông tin địa chỉ",data:json.data})
    })
})
//End==Get Provinces//

//Begin==Get Districts//
ship_router.get('/district/:province_id', async (req,res)=>{
    const Token = "e82d75a1-9876-11eb-8be2-c21e19fc6803";
    const {province_id} = req.params
    await fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",{
        method:'post',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Token':Token
        },
        body: JSON.stringify({province_id: parseInt(province_id)})
    })
    .then(res => res.json())
    .then(json=>{
        return res.json({code:1,msg:"Lấy danh sách thông tin địa chỉ",data:json.data})
    })
})
//End==Get Districts//

//Begin==Get Ward//
ship_router.get('/ward/:district_id', async (req,res)=>{
    const Token = "e82d75a1-9876-11eb-8be2-c21e19fc6803";
    const {district_id} = req.params
    await fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id",{
        method:'post',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Token':Token
        },
        body: JSON.stringify({district_id: parseInt(district_id)})
    })
    .then(res => res.json())
    .then(json=>{
        return res.json({code:1,msg:"Lấy danh sách thông tin địa chỉ",data:json.data})
    })

})
//End==Get Ward//

//Begin==Get ship fee////
ship_router.post('/getshipfee', async (req,res)=>{
    const Token = "e82d75a1-9876-11eb-8be2-c21e19fc6803";
    const ShopId = 78780
    const from_district_id = 1449 //Quận 7
    const service_type_id = 2

    const {to_district_id,to_ward_code} = req.body


    await fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",{
        method:'post',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Token':Token,
            'ShopId':ShopId,
        },
        body: JSON.stringify({
            from_district_id:from_district_id,
            service_id:0,
            service_type_id:2,
            to_district_id:parseInt(to_district_id),
            to_ward_code:to_ward_code,
            heigt:50,
            length:20,
            weight:200,
            width:20,
            insurance_fee:0,
            coupon:null
        })
    })
    .then(res => res.json())
    .then(json=>{
        console.log(json)
        return res.json({code:1,msg:"Lấy danh sách thông tin địa chỉ",data:json.data})
    })
})
//End==Get ship fee

module.exports = ship_router