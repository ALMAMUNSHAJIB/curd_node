const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//     res.render('index')
// });


//Import path 
const contactRouter = require('./routes/contact');
const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRoutes');


app.use('/contact', contactRouter);
app.use('/', indexRouter);
app.use('/user', userRouter);




app.get('*', (req, res) => {
    res.send('<h1>Page not found </h1>')
});

// const ObjectId = mongoose.Types.ObjectId;
// const id1 = new ObjectId;
// console.log(id1)

const URL = "mongodb+srv://test:hitman@cluster0.pmomd.mongodb.net/testdb"



const port = process.env.PORT || 8080;
//db connect 
mongoose.connect(URL, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
      .then(() => {
        app.listen(port, () => {
            console.log(`Port is on: ${port}`)
        });
        
      }).catch(error => {
          console.log(error)
      })


