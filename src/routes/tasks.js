const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();
router.get('/views/tasks/main', (req, res) => {
    res.render('main'); 
});
router.get('/tasks', TaskController.option);
router.get('/create', TaskController.create);
router.post('/create', TaskController.store);
router.post('/tasks/delete', TaskController.destroy);
router.get('/tasks/edit/:id', TaskController.edit);
router.post('/tasks/edit/:id', TaskController.update);
//get para enviar y POST para solicitar datos 


module.exports = router;