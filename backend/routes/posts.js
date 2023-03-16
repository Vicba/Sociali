const express = require("express")
const router = express.Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const { getPosts, createPost, getPost, deletePost, updateLikes } = require("../controllers/posts")





//routes
router.route('/').get(getPosts)
router.route('/').post(upload.single('image'), createPost)

router.route("/:id").get(getPost)
router.route("/:id").delete(deletePost)
router.route("/:id").put(updateLikes)


module.exports = router