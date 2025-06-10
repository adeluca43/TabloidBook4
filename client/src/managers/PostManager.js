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

export const deletePost = (id) => {
  return fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to delete order");
    }
    return res.status === 204 ? null : res.json();
  });

};

export const EditPost = async(formData) => {
  const res = await fetch(`${apiUrl}/${formData.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(formData)
})
 return res
};
