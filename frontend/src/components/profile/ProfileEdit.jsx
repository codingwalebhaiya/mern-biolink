import { useState } from "react";
import useProfile from "../../hooks/useProfile";

const ProfileEdit = () => {
  const { profile, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    displayName: profile?.displayName || "",
    // username: profile?.username || "",
    bio: profile?.bio || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  return (
    <div className="profile-edit">
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Display Name</label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
        </div>
        {/* <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div> */}
        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            maxLength="160"
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
