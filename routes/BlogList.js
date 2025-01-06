const BlogDao = require("../models/BlogDao");

class BlogList {

    constructor(blogDao) {
        this.blogDao = blogDao;
    }

    async showBlogs(req, res) {
        const querySpec = {
            query: "SELECT * FROM root",
        }

        const items = await this.blogDao.find(querySpec);

        res.status(200).json({
            title: "My Blogs ",
            blogs: items
        })

    }
    async addBlog(req, res) {
        const item = req.body;
        console.log(item)

        await this.blogDao.addItem(item);
        res.status(201).json({message: "created"})
    }
}

module.exports = BlogList;