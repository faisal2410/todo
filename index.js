const express = require('express')
const mongoose = require('mongoose')
const todoHendler = require('./router/todoHendler')
const app = express()
const port = 3000


app.use(express.json())

// mongodb connection

    mongoose.connect('mongodb://127.0.0.1:27017/todos')
    .then(() => console.log('connection success'))
    .catch(() => console.log('connection fail'))


// Todo router hendler

app.use('/todo', todoHendler)




function errorHendler(err, req, res, next){
    if(res.headersSent){
        return next(err);
    }
    res.status(500).json({ error : err})
}



// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})