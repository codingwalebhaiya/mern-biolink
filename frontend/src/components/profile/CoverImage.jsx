import { useState } from "react";
import useProfile from "../../hooks/useProfile";

const CoverImage = () => {
  const { uploadCoverImage } = useProfile();
  const [isHovering, setIsHovering] = useState(false);

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
      "image/gif",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Please select a valid image file (JPEG, PNG, JPG, WEBP, GIF)");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }
    await uploadCoverImage(file); // calls backend with "cover-image"
  };

  return (
    <div
      className="image-upload cover"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div className="upload-overlay">
          <label>
            Change cover image
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default CoverImage;
