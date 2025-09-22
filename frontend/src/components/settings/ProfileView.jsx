// import { useEffect, useState } from "react";

// import { useParams } from "react-router-dom";
// import API from "../../utils/api"

// const ProfileView = () => {
//   const { username } = useParams();
//   const [profile, setProfile] = useState({
//     username: "",
//     bio: "",
//     displayName: "",
//     profileCoverImage: "",
//     profileImage: "",
//     links: [],
//   });

//   const publicProfile = async () => {
//     const res = await API.get(`/public/${username}`);
//     console.log(res.data);
//     setProfile(res.data);
//   };

//   useEffect(() => {
//     if (!username) return;
//     publicProfile();
//   }, [username]);

//   if (!profile) return <p>Loading...</p>;

//   return (
//     <div className="max-w-3xl mx-auto bg-white dark:bg-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center p-6 ">
//       {profile.profileCoverImage && (
//         <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 ">
//           <img
//             src={profile.profileCoverImage}
//             alt="Profile Cover Image"
//             className="w-full h-48 object-cover mb-4 "
//           />
//         </div>
//       )}
//       {profile.profileImage && (
//         <div className="flex -mt-12">
//           <img
//             src={profile.profileImage}
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover mb-4 dark:border-gray-900 bg-gray-300"
//           />
//         </div>
//       )}
//       <h1 className="text-2xl font-bold">@{profile.username}</h1>
//       <p className="text-gray-600">{profile.bio}</p>

//       <div className="mt-6 space-y-4 w-full max-w-md">
//         {profile.links.map((link) => (
//           <a
//             href={link.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             key={link._id}
//             className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-2 rounded"
//           >
//             {link.title}
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProfileView;

// import React from 'react'

// const ProfileView = ({profileInfo}) => {

//   return (
//      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center p-6 ">
//        {profileInfo.profileCoverImage && (
//         <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 ">
//           <img
//             src={profileInfo.profileCoverImage}
//             alt="Profile Cover Image"
//             className="w-full h-48 object-cover mb-4 "
//           />
//         </div>
//       )}
//       {profileInfo.profileImage && (
//         <div className="flex -mt-12">
//           <img
//             src={profileInfo.profileImage}
//             alt="Profile"
//             className="w-32 h-32 rounded-full object-cover mb-4 dark:border-gray-900 bg-gray-300"
//           />
//         </div>
//       )}
//       <h1 className="text-2xl font-bold">@{profileInfo.username}</h1>
//       <p className="text-gray-600">{profileInfo.bio}</p>

//       <div className="mt-6 space-y-4 w-full max-w-md">
//         {profileInfo.links.map((link) => (
//           <a
//             href={link.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             key={link._id}
//             className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-2 rounded"
//           >
//             {link.title}
//           </a>
//         ))}
//       </div>
//     </div>
//   );

// }

// export default ProfileView

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/api";

const ProfileView = ({ username: propUsername }) => {
  const [profileInfo, setProfileInfo] = useState({
    username: "",
    bio: "",
    displayName: "",
    profileCoverImage: "",
    profileImage: "",
    links: [],
  });
  const [error, setError] = useState(null);
  const params = useParams();
  const username =
    params.username || propUsername ;

  const fetchPublicProfile = async () => {
      if (!username) {
      setError("No username provided");
      return;
    }
    try {
      // setLoading(true);
      const res = await API.get(`/public/${username}`);
      setProfileInfo(res.data);
      //setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching public profile");
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicProfile();
  }, [username]);

  // if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;
  if (!profileInfo) return <div className="p-8">Profile not found</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center p-6 ">
      {profileInfo.profileCoverImage && (
        <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 ">
          <img
            src={profileInfo.profileCoverImage}
            alt="Profile Cover Image"
            className="w-full h-48 object-cover mb-4 "
          />
        </div>
      )}
      {profileInfo.profileImage && (
        <div className="flex -mt-12">
          <img
            src={profileInfo.profileImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 dark:border-gray-900 bg-gray-300"
          />
        </div>
      )}
      <h1 className="text-2xl font-bold">@{profileInfo.username}</h1>
      <p className="text-gray-600">{profileInfo.bio}</p>

      <div className="mt-6 space-y-4 w-full max-w-md">
        {profileInfo.links.map((link) => (
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            key={link._id}
            className="block w-full bg-blue-600 hover:bg-blue-500 text-white text-center py-2 rounded"
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProfileView;
