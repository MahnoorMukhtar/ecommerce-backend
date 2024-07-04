const { 
    registerUser, 
    loginUser, 
    logout, 
    getUser, 
    getLoginStatus, 
    updateUser,
    updateUserPhoto} = require('../controllers/userController')
const { protect } = require('../middlewares/authMiddleware')

const router = require('express').Router()


router.post('/registerUser', registerUser)
router.post('/loginUser', loginUser)
router.get('/logout', logout)
router.get('/getUser', protect, getUser)
router.get('/getLoginStatus', getLoginStatus)
router.patch('/updateUser', protect, updateUser)
router.patch('/updateUserPhoto', protect, updateUserPhoto)




module.exports = router