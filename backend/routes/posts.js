const express = require("express")
const router = express.Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { getPosts, createPost, getPost, deletePost, updateLikes } = require("../controllers/posts")


const { protect } = require('../middleware/authMiddleware')



//routes
router.route('/').get(protect, getPosts)
router.route('/').post(upload.single('image'), protect, createPost)

router.route("/:id").get(protect, getPost)
router.route("/:id").delete(deletePost)
router.route("/:id").put(protect, updateLikes)


module.exports = router