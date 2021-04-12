const mongoose = require('mongoose');

//- Connect to Database
mongoose.connect('mongodb://localhost/shophoa',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on('connected', () => {
    console.log('Database connected');
});