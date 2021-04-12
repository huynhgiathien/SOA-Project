const express = require('express');
const order_router = express.Router();
const bodyParser = require('body-parser');
order_router.use(bodyParser.urlencoded({ extended: false }));
order_router.use(bodyParser.json());
const Order = require('../models/orders'); //Require model
const fetch = require('node-fetch')



// Begin == Lấy thông tin order //
order_router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const order = await getOrder(id);
    if (order)
    {
        return res.status(200).json({code:1,order,msg:"Thông tin order"})
    }
    return res.status(200).json({code:0,msg:"Không tồn tại order"})
  });

let getOrder = async (id) => {
    const order = await Order.findOne({
        id:id
    });

    if (!order) {
        throw new NotFoundError(`Not Found`);
    } else {
        return order;
    }
};
// End == Lấy thông tin order //

//Begin == Create order//
order_router.post('/create/order', async (req,res)=>{
    const {note,name,phone,address,to_district_id,to_ward_code,item} = req.body
    const Token = "e82d75a1-9876-11eb-8be2-c21e19fc6803";
    const ShopId = 78780
    const from_district_id = 1449 //Quận 7
    const service_type_id = 2
//     let item =[
//         {
//             "name":"Áo Polo",
//             "code":"Polo123",
//             "quantity": 1,
//             "price": 200000,
//        },
//        {
//         "name":"Áo Polo",
//         "code":"Polo1232323",
//         "quantity": 2,
//         "price": 200000,
//    },
//        ]
    // let arrayToString = JSON.stringify(item);  // convert array to string
    // let stringToJsonObject = JSON.parse(arrayToString);  // convert string to json object
    // console.log("===========",stringToJsonObject)
    await fetch("https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",{
        method:'post',
        headers: { 
            'Content-Type': 'application/json',
            'Token':Token,
            'ShopId':ShopId
        },
        body: JSON.stringify({
            "payment_type_id": 2,
            "note": note,
            "required_note": "KHONGCHOXEMHANG",
            "return_phone": "0332190458",
            "return_address": "39 NTT",
            "return_district_id": from_district_id,
            "return_ward_code": "",
            "client_order_code": "",
            "to_name": name,
            "to_phone": phone,
            "to_address": address,
            "to_ward_code":to_ward_code ,
            "to_district_id": parseInt(to_district_id),
            "cod_amount": 0,
            "content": "Theo New York Times",
            "weight": 200,
            "length": 1,
            "width": 19,
            "height": 10,
            "pick_station_id": 1444,
            "deliver_station_id": null,
            "insurance_value": 0,
            "service_id": 0,
            "service_type_id":2,
            "order_value":0,
            "coupon":null,
            "pick_shift":[2],
            
        }),
            "items": JSON.parse(JSON.stringify(item))
    })
    .then(res => res.json())
    .then(json=>{
        console.log(json)
        return res.json({data:json})
    })
})
//End == Create order //

//app.get//
order_router.post('/testmycase/test', async (req,res)=>{
//     const {note,name,phone,address,to_district_id,to_ward_code} = req.body
//     let item =[
//         {
//             "name":"Áo Polo",
//             "code":"Polo123",
//             "quantity": 1,
//             "price": 200000,
//        },
//        {
//         "name":"Áo Polo",
//         "code":"Polo1232323",
//         "quantity": 2,
//         "price": 200000,
//    }]
//     await fetch("http://localhost:3000/order/create/order", {
        
//         method:"post",
//         headers: { 
//             'Token':"e82d75a1-9876-11eb-8be2-c21e19fc6803",
//             'ShopId':78780,
//             'Content-Type': 'application/json'},
    //     body:{
    //         "note":note,
    //         "name":name,
    //         "phone":phone,
    //         "address":address,
    //         "to_district_id":to_district_id,
    //         "to_ward_code":to_ward_code,
    //         "item":item
    //     }


    // })

})





module.exports = order_router;