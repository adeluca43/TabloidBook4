// client/src/managers/categoryManagers.js

const baseUrl = '/api/category';

export const getAllCategories = async () => {
  const res = await fetch(baseUrl);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const addCategory = async (name) => {
  const res = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  if (!res.ok) throw new Error('Failed to add category');
  return res.json();
};

export const updateCategory = async (id, name) => {
  const res = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name })
  });
  if (!res.ok) throw new Error('Failed to update category');
};

export const deleteCategory = async (id) => {
  const res = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete category');
};
