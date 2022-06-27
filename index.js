const express = require("express");
require('./db/conn');
const usersRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')
const categoryRouter = require('./routes/categoryRouter')

const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());
app.use('/api',usersRouter)
app.use('/api',postRouter)
app.use('/api',categoryRouter)
app.use('/images',express.static('images'))
app.get("/",(req,res)=>{
    res.send("hello")
})

//default error handler
const errorHandler = (err,req,res,next)=>{
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({
        type:'authError',
        error:err
    })
}
app.use(errorHandler)

app.listen('3000',()=>{
    console.log("I am listening port 3000");
})


