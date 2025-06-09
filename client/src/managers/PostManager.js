const apiUrl = "/api/post"

// Get all posts
export const getAllPosts = () => {
  return fetch(apiUrl).then(res => res.json())
}

// Get a post by ID
export const getPostById = (id) => {
  return fetch(`${apiUrl}/${id}`).then(res => res.json())
}

// Create a new post
export const createPost = (postData) => {
  return fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData)
  }).then(res => res.json())
}

