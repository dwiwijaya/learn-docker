const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => res.json(await Task.find().sort({ createdAt: -1 })));

router.get('/:id', async (req, res) => {
    res.json(await Task.find().sort({ createdAt: -1 }))
});

router.post('/', async (req, res) => {
    const task = new Task(req.body);
    const saved = await task.save();
    res.json(saved);
});

router.put('/:id', async (req, res) => {
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ deleted: true });
});

module.exports = router;
