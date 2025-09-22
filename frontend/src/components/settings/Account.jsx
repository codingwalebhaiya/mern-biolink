import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";

const Account = () => {
  const { user  } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    email: user?.email || "",
    displayName: profile?.displayName || "",
    username: user?.username || "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile({
        displayName: formData.displayName,
       // username: formData.username,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="settings-section">
      <h2>Account Settings</h2>

      <div className="settings-card">
        <div className="settings-header">
          <h3>Profile Information</h3>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
              <p className="help-text">Contact support to change your email</p>
            </div>
            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled
              />
              <p className="help-text">This will change your profile URL</p>
              <p className="help-text">Contact support to change your username</p>
            </div>
            <div className="form-actions">
              <button type="submit">Save Changes</button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    email: user?.email || "",
                    displayName: profile?.displayName || "",
                   username: profile?.username || "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="settings-display">
            <div className="settings-row">
              <span className="label">Email</span>
              <span className="value">{formData.email}</span>
            </div>
            <div className="settings-row">
              <span className="label">Display Name</span>
              <span className="value">{formData.displayName}</span>
            </div>
            <div className="settings-row">
              <span className="label">Username</span>
              <span className="value">@{formData.username}</span>
            </div>
          </div>
        )}
       
      </div>
    </div>
  );
};

export default Account;
