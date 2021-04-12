const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const bodyParser = require('body-parser')


//Begin Thiện
require('./db.js') //db


//End Thiện

// Setting for Pugjs
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Livereload
var livereload = require('livereload');
var watchServer = livereload.createServer();

// Connect-livereload
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
watchServer.watch(path.join(__dirname, 'public'));

// This is reset pug
watchServer.server.once("connection", () =>{
    setTimeout(() => {
        watchServer.refresh('/');
    }, 500);
});

app.get('/', (req, res) => {
  res.render('index',{
      name: 'PhucLe'
  })
})



////////////////////////////////////
app.get('/products', (req, res) => {
    res.render('products')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/product', (req, res) => {
  res.render('product-details')
})

app.get('/cart', (req, res) => {
  res.render('cart')
})

app.get('/checkout', (req, res) => {
  res.render('checkout')
})

app.get('/done', (req, res) => {
  res.render('done')
})

app.get('/category', (req, res)=>{
  res.render('')
})


//////Import Router
const authRouter = require('./routes/authentication/authcontroller');
app.use('/auth', authRouter);

const orderRouter = require('./routes/order');
app.use('/order', orderRouter);

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const productRouter = require('./routes/product');
app.use('/product', productRouter);

const adminRouter = require('./routes/admin');
app.use('/admin', adminRouter);

const voucherRouter = require('./routes/voucher');
app.use('/voucher', voucherRouter);

const categoryRouter = require('./routes/category')
app.use('/category', categoryRouter);

const supplierRouter = require('./routes/supplier')
app.use('/supplier', supplierRouter);

const shipRouter = require('./routes/ship')
app.use('/ship', shipRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})