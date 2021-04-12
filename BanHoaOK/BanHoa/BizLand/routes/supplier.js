const express = require('express');
const supplier_router = express.Router();
const bodyParser = require('body-parser');
supplier_router.use(bodyParser.urlencoded({ extended: false }));
supplier_router.use(bodyParser.json());
const Product = require('../models/products'); //Require model
const Supplier = require('../models/suppliers'); //Require model
const PAGE_SIZE = 9

//Begin == Get all Suplier//
supplier_router.get('/', async (req, res) => {
    const suplierlist = await getSuplierList();
    if (suplierlist)
    {
        return res.json({code:1,suplierlist,msg:"Danh sách nhà cung ứng sản phẩm"})
    }
    return res.json({code:0,msg:"Không tồn tại nhà cung ứng sản phẩm"})
  });

let getSuplierList = async () => {
    const suplierList = await Supplier.find({
    });

    if (!suplierList) {
        throw new NotFoundError(`Not Found`);
    } else {
        return suplierList;
    }
};
//End == Get all Suplier //

//Begin == Get thông tin suplier by ID//
supplier_router.get('/:id', async (req, res) => {
    const supplier = await getSupplier(req.params.id);
    if (supplier)
    {
        return res.json({code:1,supplier,msg:"Thông tin nhà cung ứng sản phẩm"})
    }
    return res.json({code:0,msg:"Không tồn tại nhà cung ứng sản phẩm"})
  });

let getSupplier = async (id) => {
    const supplier = await Supplier.findOne({id:id
    });

    if (!supplier) {
        throw new NotFoundError(`Not Found`);
    } else {
        return supplier;
    }
};
//End == Get thông tin suplier by ID//

// Begin == Lấy danh sách sản phẩm theo nhà phân phối SUPPLIER //
supplier_router.get('/product/:sup_id', async (req, res) => {
    const {sup_id} = req.params;
    const productlist = await getListProductBySup(sup_id);
    if(productlist.length>0) {
        return res.json({code:1,productlist,msg:"Danh sách sản phẩm theo nhà phân phối"});
    }
    return res.json({code:0,msg:"Không tìm thấy sản phẩm"});
  });

let getListProductBySup = async (sup_id) => {
    const product = await Product.find({
        sup_id:sup_id
    });

    if (!product) {
        throw new NotFoundError(`Not Found`);
    } else {
        return product;
    }
};
// End == Lấy danh sách sản phẩm theo nhà phân phối SUPPLIER //


module.exports = supplier_router;