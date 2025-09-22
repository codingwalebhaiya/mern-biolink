import { useState } from "react";
import { FiExternalLink, FiTrash2, FiEdit } from "react-icons/fi";
import useLink from "../../hooks/useLink";

const LinkItem = ({ link }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: link.title,
    url: link.url
  });
  const { deleteLinks, updateLinks } = useLink();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateLinks(link._id || link.id, formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update link:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {
        await deleteLinks(link._id || link.id);
      } catch (error) {
        console.error("Failed to delete link:", error);
      }
    }
  };

  return (
    <div className="link-item">
      {isEditing ? (
        <form className="link-edit-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Link title"
              required
            />
          </div>
          <div className="form-group">
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
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="link-content">
            <div className="link-info">
              <h3>{formData.title}</h3>
              <a
                href={formData.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {formData.url}
              </a>
            </div>
          </div>
          <div className="link-actions">
            <button onClick={() => setIsEditing(true)}>
              <FiEdit />
            </button>
            <button onClick={handleDelete}>
              <FiTrash2 />
            </button>
            <a
              href={formData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="external-link"
            >
              <FiExternalLink />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default LinkItem;
