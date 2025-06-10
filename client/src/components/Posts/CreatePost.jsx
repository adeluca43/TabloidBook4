import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPost } from "../../managers/PostManager"
import { getAllCategories } from "../../managers/categoryManagers"

export default function CreatePost({ loggedInUser }) {
  const navigate = useNavigate()

  const [categories, setCategories] = useState([])
  const [post, setPost] = useState({
    title: "",
    subTitle: "",
    categoryId: 0,
    publishingDate: new Date(),
    headerImage: "",
    body: "",
    userProfileId: loggedInUser.id
  })

   useEffect(() => {
  getAllCategories().then(setCategories);
}, []); 

  const handleChange = (event) => {
    const { name, value } = event.target
    setPost({ ...post, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
createPost(post).then(() => navigate("/"))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Post</h3>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={post.title}
        onChange={handleChange}
      />

      <input
        type="text"
        name="subTitle"
        placeholder="Subtitle"
        value={post.subTitle}
        onChange={handleChange}
      />

      <select name="categoryId" value={post.categoryId} onChange={handleChange}>
        <option value="0">Select Category</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>


      <input
        type="text"
        name="headerImage"
        placeholder="Header Image URL"
        value={post.headerImage}
        onChange={handleChange}
      />

      <textarea
        name="body"
        placeholder="Body"
        value={post.body}
        onChange={handleChange}
      />

      <button type="submit">Save</button>
    </form>
  )
}
