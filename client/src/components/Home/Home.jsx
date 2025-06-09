import { useEffect, useMemo, useState } from "react";
import { getAllPosts } from "../../managers/PostManager";
import debounce from 'lodash.debounce';
import { useNavigate } from 'react-router-dom';
import "./Home.css";

export default function Home() {
    const Navigate = useNavigate()
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(res => {
      setAllPosts(res);
      setFilteredPosts(res);
    });
  }, []);

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
        {filteredPosts.map(post => (
          <div key={post.id} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
            <p className="post-author">{post?.userProfile.fullName}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
