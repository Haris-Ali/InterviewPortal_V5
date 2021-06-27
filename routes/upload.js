const router = require('express').Router()
const uploadImage = require('../middleware/uploadImage')
const uploadCtrl = require('../controllers/uploadCtrl')
const auth = require('../middleware/auth')

router.post('/upload_avatar', uploadImage, uploadCtrl.uploadAvatar)
router.post('/upload_post_picture',uploadImage, uploadCtrl.uploadPost)
module.exports = router