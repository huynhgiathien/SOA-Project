const express = require('express');
const product_router = express.Router();
const bodyParser = require('body-parser');
product_router.use(bodyParser.urlencoded({ extended: false }));
product_router.use(bodyParser.json());
const Product = require('../models/products'); //Require model
const Import = require('../models/import');

const PAGE_SIZE = 2
//Begin Hoài

//Lấy danh sách sản phẩm
product_router.get('/allproduct', async (req, res) => {
    const page = parseInt(req.query.page)
    if (page) {
        var skip = (page - 1) * PAGE_SIZE
        const total = await Product.find({})
        const doc = await Product.find({}).skip(skip).limit(PAGE_SIZE);
        let number_page = 0
        if (total.length/PAGE_SIZE - total.length%PAGE_SIZE >= 0.5)
        {
            number_page = parseInt((total.length / PAGE_SIZE - 0.5).toFixed(0)) + 1
        }
        else
        {
            number_page = total.length/PAGE_SIZE
        }

        if (doc) return res.json({code: 1, message: "Get Products success", total_page: number_page, products: doc})
        else {
            return res.json({code: 0, message: "Get products fail"})
        }
    } else {
        const doc = await Product.find({})
        if (doc) return res.json({code: 1, message: "Get Products success", total_product: doc.length, products: doc})
        else {
            return res.json({code: 0, message: "Get products fail"})
        }
    }
})

//End Hoài



// Begin == Lấy thông tin sản phẩm theo ID //
product_router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const product = await getProduct(id);
    if(product) {
        return res.status(200).json({code:1,product:product,msg:"Thông tin sản phẩm"});
    }
    return res.status(200).json({code:0,msg:"Không tìm thấy sản phẩm"});
  });

let getProduct = async (id) => {
    const product = await Product.findOne({
        id:id
    });

    if (!product) {
        throw new NotFoundError('Not Found');
    } else {
        return product;
    }
};
// End == Lấy thông tin sản phẩm theo ID //





// Begin == Lấy danh sách sản phẩm theo nhà phân phối SUPPLIER //
product_router.get('/supplier/:sup_id', async (req, res) => {
    const {sup_id} = req.params;
    const page = parseInt(req.query.page)
    if (page) {
        var skip = (page - 1) * PAGE_SIZE
        const productList = await getListProductBySup(sup_id, skip);
        const total = await getListProductBySup(sup_id, -1);
        if(productList.length > 0) {
            return res.status(200).json({code:1, productList, total: total.length, msg:"Danh sách sản phẩm theo nhà phân phối"});
        }
        return res.status(200).json({code:0, msg:"Không tìm thấy sản phẩm"});
    }
    else {
        const productList = await getListProductBySup(sup_id, -1);
        if(productList.length > 0) {
            return res.status(200).json({code:1, productList, msg:"Danh sách sản phẩm theo nhà phân phối"});
        }
        return res.status(200).json({code:0,msg:"Không tìm thấy sản phẩm"});
    }
});

const getListProductBySup = async (sup_id, skip) => {
    let product;
    if (skip == -1) {
        product = await Product.find({ sup_id:sup_id });
    } else {
        product = await Product.find({ sup_id:sup_id }).skip(skip).limit(PAGE_SIZE);
    }

    if (!product) {
        throw new NotFoundError(`Not Found`);
    } else {
        return product;
    }
};
// End == Lấy danh sách sản phẩm theo nhà phân phối SUPPLIER //

//Begin == Search product by Name, Category, Supplier and sort price
product_router.post('/search', async (req, res) => {
    const page = parseInt(req.query.page)
    const {name, cate_id, sup_id, sort} = req.body;
    if (page) {
        var skip = (page - 1) * PAGE_SIZE
        const total = await searchProduct(name, cate_id, sup_id, sort, -1);
        const productList = await searchProduct(name, cate_id, sup_id, sort, skip);
        if (productList.length > 0) {
            return res.status(200).json({code:1, message:"Danh sách sản phẩm", total: total.length, data: productList});
        }
        return res.status(200).json({code:0, message:"Không tìm thấy sản phẩm"});
    }
    else {
        const productList = await searchProduct(name, cate_id, sup_id, sort, -1);
        if (productList.length > 0) {
            return res.status(200).json({code:1, message:"Danh sách sản phẩm", count: productList.length, data: productList});
        }
        return res.status(200).json({code:0, message:"Không tìm thấy sản phẩm"});
    }
});

const searchProduct = async (name, cate_id, sup_id, sort, skip) => {
    let productList;
    const query = {}
    if (name.length > 0) query.name = { $regex: name };
    if (sup_id.length > 0) query.sup_id = sup_id;
    if (cate_id.length > 0) query.cate_id = cate_id;

    if (skip == -1) {
        productList = await Product.find(query).sort({price: sort});
    } else {
        productList = await Product.find(query).sort({price: sort}).skip(skip).limit(parseInt(PAGE_SIZE));
    }
    if (!productList) {
        throw new NotFoundError(`Not Found`);
    } else {
        return productList;
    }
};
//End == Search product by Name, Category and sort price

//Begin == Lấy 3 sản phẩm mới nhất //
product_router.get('/home/newest', async (req, res) => {
        const productList = await getListNewestProduct();
        if(productList.length > 0) {
            return res.json({code:1, productList, msg:"Danh sách 3 sản phẩm mới nhất"});
        }
        return res.json({code:0,msg:"Không tìm thấy sản phẩm"});
    
});

const getListNewestProduct = async () => {
    const list = await Product.find().sort({_id:-1}).limit(3);
    

    if (!list) {
        throw new NotFoundError(`Not Found`);
    } else {
        return list;
    }
};
//End == Lấy 3 sản phẩm mới nhất //

//Begin == Lấy 3 sản phẩm bán chạy nhất//
product_router.get('/home/hot', async (req, res) => {
    const productlist = await Product.find().sort({sold:-1}).limit(2)
    if(productlist.length > 0)
    {
        return res.json({code:1, productlist,msg:"Danh sách 3 sản phẩm bán chạy nhất"})
    }
    return res.json({code:0,msg:"Không tìm thấy sản phẩm"})

})
//End == Lấy 3 sản phẩm bán chạy nhất //











module.exports = product_router;