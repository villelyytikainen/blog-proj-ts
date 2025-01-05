import { useState } from "react";
import Blog from "./Blog";

const Blogs = () => {
    const [availableBlogs, setAvailableBlogs] = useState([
        { id: 1, title: "123", text: "asdfasfd" },
        { id:2, title: "345", text: "asfdcxz" },
        { id:3,title: "uliuli", text: "bxccbvx" },
        { id:4,title: "53242", text: "asdfasfd" },
        { id:5,title: "123", text: "tretert" },
        { id:6,title: "5435", text: "gdfgfd" },
        { id:7,title: "251", text: "gfdg" },
        { id:8,title: "544", text: "bvcxbv" },
        { id:9,title: "542", text: "3232" },
    ]);

    const onDelete = (id : number) => {
        setAvailableBlogs(availableBlogs.filter(blog => blog.id !== id));
        console.log(`Blog post: ${id} removed!`)
    };

    return (
        <div id='blogs-container'>
            {availableBlogs
                .map((blog) => (
                    <Blog key={blog.id} id={blog.id} title={blog.title} text={blog.text} onDelete={onDelete} />
                ))}
        </div>
    );
};

export default Blogs;
