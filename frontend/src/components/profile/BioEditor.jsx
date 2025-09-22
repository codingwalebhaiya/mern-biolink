import { useState } from "react";
import useProfile from "../../hooks/useProfile";

const BioEditor = () => {
  const { profile, updateProfile } =useProfile;
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(profile?.bio || "");

  const handleSave = async () => {
    await updateProfile({ bio });
    setIsEditing(false);
  };

  return (
    <div className="bio-editor">
      <h3>Bio</h3>
      {isEditing ? (
        <div className="edit-mode">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength="160"
          />
          <div className="char-count">{bio.length}/160</div>
          <div className="bio-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <p>{profile?.bio || "No bio yet"}</p>
          <button onClick={() => setIsEditing(true)}>Edit Bio</button>
        </div>
      )}
    </div>
  );
};

export default BioEditor;
