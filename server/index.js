const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const TodoModel = require('./Models/Todo')

const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/mydb')
.then(()=>console.log('connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:',err));

app.get('/get', (req, res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  try{
    const todo = await TodoModel.findByIdAndUpdate(id,{done : true},{new: true });
    if(!todo){
        return res.status(404).send( 'Todo not found' );
    }
    res.json(todo);
  }catch(error){
    res.status(500).send('error updating todo');
  }
});

app.delete('/delete/:id', (req , res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})  


app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))

})

app.listen(3001,()=>{
    console.log('server is running on port 3001')
})