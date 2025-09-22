import { useState } from "react";
import useLink from "../../hooks/useLink";

const AddLinkForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
  });
  const { addLinks } = useLink();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addLinks(formData);
    setFormData({ title: "", url: "" });
    onCancel?.();
  };

  return (
    <div className="add-link-form">
      <h3>Add New Link</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="My Portfolio"
            required
          />
        </div>
        <div className="form-group">
          <label>URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://example.com"
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit">Add Link</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLinkForm;
