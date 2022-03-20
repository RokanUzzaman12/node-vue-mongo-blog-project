const express = require("express");
require('./db/conn');
const usersRouter = require('./routes/userRouter')
const postRouter = require('./routes/postRouter')

const app = express();

app.use(express.json());
app.use('/api',usersRouter)
app.use('/api',postRouter)

app.listen('3000',()=>{
    console.log("I am listening port 3000");
})


