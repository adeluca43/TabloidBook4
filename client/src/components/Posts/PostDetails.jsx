import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPostById } from "../../managers/PostManager"
import { Container, Image } from "react-bootstrap"

export default function PostDetails() {
  const { postId } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    getPostById(postId).then(setPost)
  }, [postId])

  if (!post) return <p>Loading post...</p>

  const formattedDate = new Date(post.publishingDate).toLocaleDateString()

return (
  <Container className="mt-4 text-center">
    {post.headerImage && (
      <Image
  src={post.headerImage || "https://via.placeholder.com/800x300?text=No+Image"}
  alt="Post header"
  fluid
  className="mb-3"
  style={{ maxHeight: "400px", objectFit: "cover" }}
/>

    )}

    <h2 className="fw-bold text-uppercase">{post.title}</h2>
    <p className="text-danger fw-bold">{post.category.name}</p>

    <div className="d-flex justify-content-between align-items-center mb-3 px-4 text-muted">
      <span className="text-start">{post.userProfile.firstName} {post.userProfile.lastName}</span>

      <span className="text-end">{formattedDate}</span>
    </div>

    <p className="text-start mx-auto" style={{ maxWidth: "800px", lineHeight: "1.8" }}>
      {post.body}
    </p>
  </Container>
)

}
