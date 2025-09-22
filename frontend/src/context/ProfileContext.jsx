import { createContext, useState, useEffect } from "react";
//import axios from "axios";
import API from "../utils/api";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get("/profile");
      setProfile(res.data.profile);
    } catch (err) {
     setError(err.response?.data?.error || "Failed to fetch profile");
      toast.error(err.response?.data?.error || "Failed to fetch profile");
      return { success: false, error: err.response?.data?.error };
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (updatedData) => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.put("/profile", updatedData);
      setProfile(res.data.profile);
      toast.success("Profile updated successfully");
      return { success: true };
    } catch (err) {
        setError(err.response?.data?.error || "Failed to update profile");
      toast.error(err.response?.data?.message || "Failed to update profile");
      return { success: false, error: err.response?.data?.error };
    } finally {
      setLoading(false);
    }
  };

  // Upload profile image
  const uploadProfileImage = async (imageFile) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append("avatar", imageFile);
      const res = await API.put("/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      setProfile((prev) => ({
        ...prev,
        avatar: res.data.avatar,
      }));
      toast.success("Profile image uploaded successfully");
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || "Failed to upload image");
      toast.error(err.response?.data.error || "Failed to upload image");
      return { success: false, error: err.response?.data?.error };
    } finally {
      setLoading(false);
    }
  };

  // Upload cover image
  const uploadCoverImage = async (coverFile) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("coverImage", coverFile);

      const res = await API.put("/profile/cover-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile((prev) => ({
        ...prev,
        profileCoverImage: res.data.profileCoverImage,
      }));
      toast.success("Cover image uploaded successfully");
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || "Failed to upload cover image");
      toast.error(err.response?.data.error || "Failed to upload image");
     return { success: false, error: err.response?.data?.error };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  return (
    <ProfileContext.Provider
      value={{
        loading,
        error,
        profile,
        updateProfile,
        uploadProfileImage,
        uploadCoverImage,
        fetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
