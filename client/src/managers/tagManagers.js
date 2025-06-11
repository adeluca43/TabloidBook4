// client/src/managers/tagManagers.js

const baseUrl = '/api/tag';

export const getAllTags = async () => {
    const res = await fetch(baseUrl)
    if (!res.ok) throw new Error('Failed to fetch tags');
    return res.json();
};

export const addTag = async (name) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error('Failed to add tag');
  return res.json();
};


export const updateTag = async (id, name) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name })
  });
  if (!res.ok) throw new Error('Failed to update tag');
};

export const deleteTag = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete tag');
};