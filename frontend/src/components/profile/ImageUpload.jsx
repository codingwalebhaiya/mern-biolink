// import { useState, useContext } from "react";
// import { ProfileContext } from "../../context/ProfileContext";

// const ImageUpload = ({ type }) => {
//   const { uploadProfileImage, uploadCoverImage } = useContext(ProfileContext);
//   const [isHovering, setIsHovering] = useState(false);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     if (type === "profile") {
//       await uploadProfileImage(file);
//     } else {
//       await uploadCoverImage(file);
//     }
//   };

//   return (
//     <div
//       className={`image-upload ${type}`}
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       {isHovering && (
//         <div className="upload-overlay">
//           <label>
//             Change {type} image
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               style={{ display: "none" }}
//             />
//           </label>
//         </div>
//       )}
//     </div>
//   );
// };

import { useState } from "react";
import useProfile from "../../hooks/useProfile";

const ImageUpload = () => {
  const { uploadProfileImage } = useProfile();
  const [isHovering, setIsHovering] = useState(false);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
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
    await uploadProfileImage(file); // calls backend with "avatar"
  };

  return (
    <div
      className="image-upload avatar"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div className="upload-overlay">
          <label>
            Change profile picture
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              style={{ display: "none" }}
            />
          </label>
        </div>
      )}
    </div>
  );
};
export default ImageUpload;
