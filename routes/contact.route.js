const express = require('express');
const contactController = require('../controllers/contact')
const router = express.Router();


router.route('/').post(contactController.addData)
                 .get(contactController.getAllData)
router.route('/:_id').get(contactController.getdataByid)
                     .patch(contactController.updateData)
                     .delete(contactController.deleteData)



module.exports = router;