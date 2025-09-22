
 // page for /public/:username  (PUBLIC) - for visitors to view a user's public profile

// import React, { useEffect, useState } from "react";
// import ProfileView from "../components/settings/ProfileView";
// import API from "../utils/api";
// import { useParams } from "react-router-dom";

// const PublicProfile = () => {
//   const [profileInfo, setProfileInfo] = useState({
//     username: "",
//     bio: "",
//     displayName: "",
//     profileCoverImage: "",
//     profileImage: "",
//     links: [],
//   });
//   const { username } = useParams();
//   //const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchPublicProfile = async () => {
//     try {
//      // setLoading(true);
//       const res = await API.get(`/public/${username}`);
//       setProfileInfo(res.data);
//       //setLoading(false);
//     } catch (err) {
//       setError(err.response?.data?.error || "Error fetching public profile");
//      // setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!username) return;
//     fetchPublicProfile();
//   }, [username]);

//  // if (loading) return <div className="p-8">Loading...</div>;
//   if (error) return <div className="p-8 text-red-500">{error}</div>;
//   if (!profileInfo) return <div className="p-8">Profile not found</div>;

//   return (
//     <div>
//       <ProfileView profileInfo={profileInfo} />
//     </div>
//   );
// };

// export default PublicProfile;



 // page for /public/:username  (PUBLIC) - for visitors to view a user's public profile

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";

const PublicProfile = () => {
  const [profileInfo, setProfileInfo] = useState({
    username: "",
    bio: "",
    displayName: "",
    profileCoverImage: "",
    profileImage: "",
    links: [],
  });
  const { username } = useParams();
  //const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPublicProfile = async () => {
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
    if (!username) return;
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

export default PublicProfile;
