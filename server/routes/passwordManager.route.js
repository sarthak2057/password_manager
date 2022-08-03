const express = require('express');
const router = express.Router();
const {
    getAllManagedPassword,
    addNewManagedPassword,
    updateManagedPassword,
    deleteManagedPassword,
    getSetPassword
} = require('../controller/passwordManager.controller');

router.route('/')
    .get(getAllManagedPassword)
    .post(addNewManagedPassword)
    .put(updateManagedPassword)
    .delete(deleteManagedPassword);

router.route('/:id')
    .get(getSetPassword);

module.exports = router;