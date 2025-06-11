// client/src/components/tags/Tags.jsx

import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import {
  getAllTags,
  addTag,
  updateTag,
  deleteTag,
} from "../../managers/tagManagers";

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [editTagId, setEditTagId] = useState(null);
  const [editTagName, setEditTagName] = useState("");

  useEffect(() => {
    getAllTags().then(setTags);
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTagName.trim()) return;
    const newTag = await addTag(newTagName.trim());
    setTags([...tags, newTag]);
    setNewTagName("");
  };

  const handleEdit = (id, name) => {
    setEditTagId(id);
    setEditTagName(name);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateTag(editTagId, editTagName.trim());
    const updated = tags.map((tag) =>
      tag.id === editTagId ? { ...tag, name: editTagName } : tag
    );
    setTags(updated);
    setEditTagId(null);
    setEditTagName("");
  };

  const handleDelete = async (id) => {
    await deleteTag(id);
    setTags(tags.filter((t) => t.id !== id));
  };

  return (
    <div className="container mt-4">
      <h2>Manage Tags</h2>

      <Form
        onSubmit={handleAdd}
        className="d-flex align-items-center gap-2 mb-3"
      >
        <FormGroup className="me-2">
          <Input
            type="text"
            placeholder="New tag name"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
          />
        </FormGroup>
        <Button color="primary" type="submit">
          Add Tag
        </Button>
      </Form>

      <ListGroup>
        {tags.map((tag) => (
          <ListGroupItem
            key={tag.id}
            className="d-flex align-items-center justify-content-between"
          >
            {editTagId === tag.id ? (
              <Form onSubmit={handleUpdate} className="d-flex w-100 gap-2">
                <Input
                  type="text"
                  value={editTagName}
                  onChange={(e) => setEditTagName(e.target.value)}
                />
                <Button color="success" type="submit">
                  Save
                </Button>
                <Button color="secondary" onClick={() => setEditTagId(null)}>
                  Cancel
                </Button>
              </Form>
            ) : (
              <>
                <span>{tag.name}</span>
                <div className="d-flex gap-2">
                  <Button
                    color="warning"
                    size="sm"
                    onClick={() => handleEdit(tag.id, tag.name)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(tag.id)}
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
