import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        short_des: {
            type: String,
            required: true,
        },
        long_desc: {
            type: String,
            required: true,
        },
        author_name: {
            type: String,
            required: true
        },
    }
)


const Blog = mongoose.model('blogs', blogSchema)

export default Blog