const express = require('express');
const router = express.Router();
const detailController = require('../controllers/detail');

router.route('/').post(detailController.addData)
                 .get(detailController.getAllData)
router.route('/:_id').get(detailController.getDataById)
                     .patch(detailController.updateData)
                     .delete(detailController.deleteData)              


module.exports = router;                     