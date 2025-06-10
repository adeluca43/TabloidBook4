import { useEffect, useState } from "react";
import { getAllPosts } from "../../managers/PostManager";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function MyPosts({ loggedInUser }) {
  const [myPosts, setMyPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts().then(posts => {
      const filtered = posts.filter(p => p.userProfileId === loggedInUser.id);
      setMyPosts(filtered);
    });
  }, [loggedInUser]);

  return (
    <div className="container mt-5">
      <h2>My Posts</h2>
      {myPosts.map(post => (
        <Card className="mb-3" key={post.id}>
          <Card.Img variant="top" src={post.headerImage} />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{post.subTitle}</Card.Subtitle>
            <Card.Text>{post.body.substring(0, 100)}...</Card.Text>
            <Button variant="primary" onClick={() => navigate(`/posts/${post.id}`)}>
              View
            </Button>{" "}
            <Button variant="secondary" onClick={() => navigate(`/posts/edit/${post.id}`)}>
              Edit
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
