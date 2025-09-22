

import CoverImage from "../../src/components/profile/CoverImage";
import ImageUpload from "../../src/components/profile/ImageUpload";
import ProfileEdit from "../../src/components/profile/ProfileEdit";
import useProfile from "../../src/hooks/useProfile";

const Profile = () => {
  const { profile, loading, error } = useProfile();

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-view">
      <div className="cover-image-container">
        {profile?.profileCoverImage ? (
          <img
            src={profile.profileCoverImage}
            alt="Cover"
            className="cover-image"
          />
        ) : (
          <div className="cover-image-placeholder">Cover Image</div>
        )}
        <CoverImage type="cover" />
      </div>

      <div className="profile-header">
        <div className="profile-image-container">
          {profile?.avatar ? (
            <img src={profile.avatar} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-image-placeholder">Profile Image</div>
          )}
          <ImageUpload type="profile" />
        </div>

        <h2>{profile?.displayName || "No display name"}</h2>
        {/* <p className="username">@{profile?.username || "username"}</p> */}
      </div>

      <div className="profile-content">
       
        <ProfileEdit />
      </div>
    </div>
  );
};

export default Profile;
