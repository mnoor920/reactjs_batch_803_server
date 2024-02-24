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


export const getblog = async (request, response) => {
    try {
        const blog = await Blog.findById(request.params.id)
        response.status(200).json({
            msg: 'Single Blog',
            data: blog
        })
    } catch (error) {
        response.status(500).json({
            msg: 'Blog Not found',
            error: error
        })
    }
};



export const CreateBlog = async (request, response) => {
    try {
        if (!request.body) {
            return response.status(400).json({ error: "Request body is missing or empty" });
        }
        const { _id, title, short_des, long_desc, author_name } = request.body;
        if (!title || !short_des || !long_desc || !author_name) {
            return response.status(400).json({ error: "Missing required fields in the request body" });
        }
        const BlogExists = await Blog.findOne({ _id });
        if (BlogExists) {
            BlogExists.title = title;
            BlogExists.short_des = short_des;
            BlogExists.long_desc = long_desc;
            BlogExists.author_name = author_name;
            await BlogExists.save();
            return response.status(200).json({ msg: 'Blog updated successfully' });
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


export const DeleteBlog = async (request, response) => {
    try {
        const { _id } = request.body;

        if (!_id) {
            return response.status(400).json({ error: "Missing _id field in the request body" });
        }

        const existingBlog = await Blog.findById(_id);
        if (!existingBlog) {
            return response.status(404).json({ error: "Blog not found" });
        }

        await existingBlog.remove();
        return response.status(200).json({ msg: 'Blog deleted successfully' });
    } catch (error) {
        return response.status(500).json({ error: "An error occurred while deleting the blog" });
    }
};



