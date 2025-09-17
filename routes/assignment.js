const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');

// Create a new assignment
router.post('/', async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all assignments
router.get('/', async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});

// Get assignment by ID
router.get('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Not found' });
    res.json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update assignment by ID
router.put('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!assignment) return res.status(404).json({ error: 'Not found' });
    res.json(assignment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete assignment by ID
router.delete('/:id', async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndDelete(req.params.id);
    if (!assignment) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
