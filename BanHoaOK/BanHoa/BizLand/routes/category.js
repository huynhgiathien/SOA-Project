const express = require('express');
const category_router = express.Router();
const bodyParser = require('body-parser');
category_router.use(bodyParser.urlencoded({ extended: false }));
category_router.use(bodyParser.json());
const Category = require('../models/categories'); //Require model
const Product = require('../models/products'); //Require model

const PAGE_SIZE = 2

//Begin ==Get All Category //
category_router.get('/', async (req, res) => {
    const categorylist = await getCategorylist();
    if(categorylist.length>0) {
        return res.json({code:1,categorylist,msg:"Danh sách loại"});
    }
    return res.json({code:0,msg:"Không tìm thấy loại"});
  });

let getCategorylist = async () => {
    const categoryList = await Category.find({
    });

    if (!categoryList) {
        throw new NotFoundError(`Not Found`);
    } else {
        return categoryList;
    }
};
//End ==Get All Category //

// Begin == Lấy danh sách sản phẩm theo chủng loại //
category_router.get('/:category_id', async (req, res) => {
    const {category_id} = req.params;
    const page = parseInt(req.query.page)
    if(page)
    {
        var skip = (page - 1) * PAGE_SIZE
        const total = await Product.find({cate_id:category_id})
        const productlist = await getListProductByCategory(category_id,skip);
        let number_page = 0
        if (total.length/PAGE_SIZE - total.length%PAGE_SIZE >= 0.5)
        {
            number_page = parseInt((total.length / PAGE_SIZE - 0.5).toFixed(0)) + 1
        }
        else
        {
            number_page = total.length/PAGE_SIZE
        }

        if(productlist.length>0) {
            return res.json({code:1,productlist,total:total.length,total_page:number_page,msg:"Danh sách sản phẩm theo loại"});
        }else {
            return res.json({code: 0, message: "Cannot get product"})
        }
    }
    else
    {
        const productlist = await getListProductByCategory(category_id,0);
        if(productlist.length>0) {
            return res.json({code:1,productlist,total_page:1,msg:"Danh sách sản phẩm theo loại"});
        }else {
            return res.json({code: 0, message: "Cannot get product"})
        }
    }


    return res.json({code:0,msg:"Không tìm thấy sản phẩm"});
  });

  const getUsers = async (skip) => {
    const users = Account.find({}).skip(skip).limit(PAGE_SIZE)

    if (!users) {
        throw new NotFoundError(`Not Found`);
    } else {
        return users;
    }
}

let getListProductByCategory = async (cate_id,skip) => {
    const product = await Product.find({cate_id:cate_id}).skip(skip).limit(PAGE_SIZE);

    if (!product) {
        throw new NotFoundError(`Not Found`);
    } else {
        return product;
    }
};
// End == Lấy danh sách sản phẩm theo chủng loại //
module.exports = category_router;

