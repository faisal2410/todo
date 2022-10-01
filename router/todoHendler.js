const express = require('express')
const router = express.Router()
const Todo = require('../schema/todoSchema')


router.get("/", async (req, res) => {
  await Todo.find({ status: "active" })
    .select({
      _id: 1,
      __v: 0,
      date: 0,
    })
    .limit(2)
    .exec((err, data) => {
      if (err) {
        res.status(500).json({
          error: "There was a server side error!",
        });
      } else {
        res.status(200).json({
          result: data,
          message: "Success",
        });
      }
    });
});


router.get('/:id', async (req, res) =>{

})

router.post('/', async (req, res) =>{
    const newTodo = new Todo(req.body);
    await newTodo.save((err) =>{
        if(err){
            res.status(500).json({
                error: "There was a server side error"
            })
        }else{
            res.status(200).json({
                message: "Todo was inserted successfully"
            })
        }
    });

})

router.post('/all', async (req, res) =>{
    await Todo.insertMany(req.body, (err) =>{
        if(err){
            res.status(500).json({
                error: "There was a server side errpr"
            })
        }else{
            res.status(200).json({
                message: "Todo was inserted successfully"
            })
        }
    });

})
router.put('/:id', async (req, res) =>{

})
router.delete('/:id', async (req, res) =>{
  await Todo.deleteOne({_id: req.params.id}, (err) =>{
    if(err){
      res.status(500).json({
          error: "There was a server side error"
      })
  }else{
      res.status(200).json({
          message: "Todo was Delete successfully"
      })
  }
  })

})


module.exports = router;