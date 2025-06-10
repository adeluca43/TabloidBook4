import { useEffect, useMemo, useState } from "react";
import { deletePost, EditPost, getAllPosts } from "../../managers/PostManager";
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import "./Home.css";
import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react"

export default function Home({loggedInUser}) {
  const Navigate = useNavigate()
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  
  useEffect(() => {
    getAllPosts().then(res => {
      setAllPosts(res);
      setFilteredPosts(res);
    });
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData?.id) return;
    const formToSend = {
      id: formData.id,
      categoryId: formData.categoryId,
      subTitle: formData.subTitle,
      title: formData.title,
      headerImage: formData.headerImage,
      body: formData.body
    }
    EditPost(formToSend).then(() => {
      getAllPosts().then(res => {
        setAllPosts(res);
        setFilteredPosts(res);
        setIsModalOpen(false);
        setFormData({})
      })
    })
  };

  const handleSearch = useMemo(() =>
    debounce((query) => {
      const filtered = allPosts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredPosts(filtered);
    }, 1000), [allPosts]);

  const onChangeSearch = (e) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="home-container">
        <div className="header-items">
            <h1 className="home-title">All Posts</h1>
            <button className="create-post-button" onClick={() => {Navigate('/posts/create')}}>Create Post</button>
        </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search posts..."
          onChange={onChangeSearch}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </div>

       <div className="posts-grid">
      {filteredPosts.map((post) => (
        <div key={post.id} className="post-card">
          <Link to={`/posts/${post.id}`} className="post-card-link">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
            <p className="post-author">{post?.userProfile.fullName}</p>
          </Link>

          {post.userProfile.id === loggedInUser.id && (
            <>
              <button
                onClick={() => {
                  deletePost(post.id).then(() => {
                    getAllPosts().then((res) => {
                      setAllPosts(res);
                      setFilteredPosts(res);
                    });
                  });
                }}
              >
                <Trash />
              </button>

              <button
                onClick={() => {
                  setFormData(post);
                  setIsModalOpen(true);
                }}
              >
                <Edit />
              </button>
            </>
          )}
        </div>
      ))}
    </div>

        {isModalOpen && (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={formData.title} placeholder="Title" required
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
          <input type="text" value={formData.subTitle} placeholder="Subtitle"
            onChange={(e) => setFormData({ ...formData, subTitle: e.target.value })}/>
          <textarea value={formData.body} placeholder="Body" required
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}/>
          <input type="text" value={formData.categoryId} placeholder="Category ID"
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}/>
          <input type="text" value={formData.headerImage} placeholder="Header Image URL"
            onChange={(e) => setFormData({ ...formData, headerImage: e.target.value })}/>
          <div className="modal-actions">
            <button type="submit" disabled={handleSubmit}>Update</button>
            <button type="button" onClick={() => {setIsModalOpen(false)}}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )}
    </div>
  );
}
