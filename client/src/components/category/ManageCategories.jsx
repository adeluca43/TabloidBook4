import { useEffect, useState } from 'react';
import { Card, Button, Form, ListGroup, Row, Col, Alert } from 'react-bootstrap';
import QuillLogo from '../../assets/quill-logo.png';
import {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory
} from '../../managers/categoryManagers';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(() => setError('Failed to load categories.'));
  }, []);

  const handleAdd = async () => {
    const name = newCategory.trim();
    if (!name) return;
    const exists = categories.some((c) => c.name.toLowerCase() === name.toLowerCase());
    if (exists) {
      setError('Category already exists.');
      return;
    }

    try {
      const created = await addCategory(name);
      setCategories([...categories, created]);
      setNewCategory('');
      setError('');
    } catch (err) {
      setError('Failed to add category.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter((c) => c.id !== id));
    } catch {
      setError('Failed to delete category.');
    }
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setEditValue(name);
    setError('');
  };

  const handleSaveEdit = async (id) => {
    const name = editValue.trim();
    if (!name) return;
    const exists = categories.some(
      (c) => c.name.toLowerCase() === name.toLowerCase() && c.id !== id
    );
    if (exists) {
      setError('Another category already uses this name.');
      return;
    }

    try {
      await updateCategory(id, name);
      setCategories(categories.map((c) => (c.id === id ? { ...c, name } : c)));
      setEditId(null);
      setEditValue('');
      setError('');
    } catch {
      setError('Failed to update category.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img src={QuillLogo} alt="Quill Logo" style={{ width: '80px' }} />
        <h3 className="mt-3">Category Management</h3>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Card>
        <ListGroup variant="flush">
          {categories.map((cat) => (
            <ListGroup.Item key={cat.id}>
              <Row className="align-items-center">
                <Col>
                  {editId === cat.id ? (
                    <Form.Control
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(cat.id)}
                    />
                  ) : (
                    cat.name
                  )}
                </Col>
                <Col xs="auto">
                  {editId === cat.id ? (
                    <Button variant="success" size="sm" onClick={() => handleSaveEdit(cat.id)}>
                      Save
                    </Button>
                  ) : (
                    <Button variant="secondary" size="sm" onClick={() => handleEdit(cat.id, cat.name)}>
                      Edit
                    </Button>
                  )}{' '}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(cat.id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Card.Footer>
          <Row>
            <Col>
              <Form.Control
                placeholder="Add a new category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              />
            </Col>
            <Col xs="auto">
              <Button onClick={handleAdd}>Save</Button>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default ManageCategories;
