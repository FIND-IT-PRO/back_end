var express = require('express');
var router = express.Router();

const controllerTypeObj = require('../controllers/typeObjet')


router.route('/').post(controllerTypeObj.addData)
                 .get(controllerTypeObj.getAll)
router.route('/:_id').get(controllerTypeObj.getDataByid)
                     .patch(controllerTypeObj.updateData)
                     .delete(controllerTypeObj.deletData)




module.exports = router;