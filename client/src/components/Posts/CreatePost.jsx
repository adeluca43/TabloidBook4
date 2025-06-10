import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPost } from "../../managers/PostManager"
import { getAllCategories } from "../../managers/categoryManagers"
import { Container, Form, Button } from "react-bootstrap";


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
    <Container style={{ maxWidth: "700px", marginTop: "2rem" }}>
      <h2 className="mb-4 text-center">Create A New Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sub-Title</Form.Label>
          <Form.Control
            type="text"
            name="subTitle"
            value={post.subTitle}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="categoryId"
            value={post.categoryId}
            onChange={handleChange}
          >
            <option value="0">Select Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Publishing Date</Form.Label>
          <Form.Control
            type="date"
            name="publishingDate"
            value={post.publishingDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Header Image URL</Form.Label>
          <Form.Control
            type="text"
            name="headerImage"
            value={post.headerImage}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="body"
            value={post.body}
            onChange={handleChange}
          />
        </Form.Group>

        <div className="text-end">
          <Button type="submit" variant="dark">Save Post</Button>
        </div>
      </Form>
    </Container>
  )
}

