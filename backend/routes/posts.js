const express = require("express")
const router = express.Router()

const { getPosts } = require("../controllers/posts")





//routes
router.route('/').get(getPosts)
//router.route('/').post(createPost)
//router.route("/:id").get(getPost)

module.exports = router