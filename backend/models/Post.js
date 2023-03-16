const mongoose = require('mongoose')


const PostSchema = new mongoose.Schema(
    {
        imageName: {
            type: String,
            required: [true, 'Please add an image'],
        },
        caption: {
            type: String,
            required: [true, 'Please add a caption'],
            maxlength: [500, 'Caption can not be more than 500 characters']
        },
        totalLikes: {
            type: Number,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        toJSON: { virtuals: true }, //https://mongoosejs.com/docs/guide.html?virtuals#virtuals
        toObject: { virtuals: true }
    }
)



module.exports = mongoose.model('Post', PostSchema)