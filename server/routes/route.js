const express = require('express')
const router = express.Router();
const Todo = require('../models/schema')

router.post('/', async(req, res) =>{
    try {
        const { title } = req.body;
        const todo = new Todo({ title });
        const newTodo = await todo.save();
        res.status(200).json(newTodo);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const taskId = await Todo.findById(req.params.id);
        if (taskId === null) {
            return res.status(404).json({ message: "item does not exist"})
        }
        return res.status(200).json(taskId)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.patch('/:id', async (request, response) => {
    try {
        const { title } = request.body;
        const todo = await Todo.findByIdAndUpdate(request.params.id);
        todo.title = title;

        const updatedTodo = await todo.save();
        response.status(200).json({ message: updatedTodo });
    } catch (error) {
        console.log(error);
    }
})

router.delete('/:id', async (request, response) => {
    try {
        const todo = await Todo.findByIdAndDelete(request.params.id);

        response.status(200).json({ message: "deleted successfully" });
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;