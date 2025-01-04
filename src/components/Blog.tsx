import { useRef } from "react";

interface BlogProps {
    title: string;
    text: string;
}

const Blog = (blog: BlogProps) => {
    const blogRef = useRef(null);
    const { title, text } = blog;

    const deleteBlog = () => {
        console.log(blogRef)
        blogRef.current.remove();
    };

    return (
        <div className='blog-post' ref={blogRef}>
            <h1 className='blog-title'>{title}</h1>
            <p className='blog-text'>{text}</p>
            <div className='blog-btns'>
                <button className='btn-edit'>Edit</button>
                <button className='btn-delete' onClick={deleteBlog}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Blog;
