import Blog from "../model/blog-model.js";



export const getblogs = async (request, response) => {
    try {
        const allblogs = await Blog.find({});
        return response.status(200).json({
            msg: 'All Blogs',
            status: 1,
            data: allblogs
        });
    } catch (error) {

        return response.status(500).json(
            {
                msg: 'Blogs Request Failed',
                status: 0,
            }
        );
    }
};


export const CreateBlog = async (request, response) => {
    try {
        if (!request.body) {
            return response.status(400).json({ error: "Request body is missing or empty" });
        }
        const { title, short_des, long_desc, author_name } = request.body;
        if (!title || !short_des || !long_desc || !author_name) {
            return response.status(400).json({ error: "Missing required fields in the request body" });
        }
        const BlogExists = await Blog.findOne({ title });
        if (BlogExists) {
            return response.status(400).json({ msg: "Blog already exists! Please change the Title" });
        }
        const newBlog = new Blog({
            title,
            short_des,
            long_desc,
            author_name
        });
        await newBlog.save();
        return response.status(200).json({ msg: 'Blog Created successfully' });
    } catch (error) {
        return response.status(500).json({ error: "An error occurred while creating Blog" });
    }
};


