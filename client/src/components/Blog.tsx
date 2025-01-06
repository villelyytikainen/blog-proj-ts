import { useState, ChangeEvent } from "react";

interface BlogProps {
    id: number;
    title: string;
    text: string;
    onDelete: (id: number) => void;
}

const Blog = (blog: BlogProps) => {
    const { id, title, text, onDelete } = blog;
    const [editing, setEditing] = useState(false);
    const [titleContent, setTitleContent] = useState(title);
    const [textContent, setTextContent] = useState(text);

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleContent(e.target.value);
    };

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTextContent(e.target.value);
    };

    const editBlog = () => {
        setEditing(!editing);
    };

    const deleteBlog = () => {
        onDelete(id);
    };

    return (
        <div className='blog-post'>
            {!editing ? (
                <>
                    <h1 className='blog-title'>{titleContent}</h1>
                    <p className='blog-text'>{textContent}</p>
                </>
            ) : (
                <>
                    <input onChange={handleTitleChange} value={titleContent} />
                    <input onChange={handleTextChange} value={textContent} />
                </>
            )}
            <div className='blog-btns'>
                <button className='btn-edit' onClick={editBlog}>
                    Edit
                </button>
                <button className='btn-delete' onClick={deleteBlog}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Blog;
