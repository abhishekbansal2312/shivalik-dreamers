// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const ProfilePage = ({ darkMode }) => {
//   const { id } = useParams(); // Fetch user ID from route
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = Cookies.get('authtoken');
//         const response = await fetch(`http://localhost:4600/api/users/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setUser(data);
//         } else {
//           console.error(data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (!user) return <div>User not found</div>;

//   return (
//     <div className={`p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
//       <h1 className="text-2xl font-bold">Profile Details</h1>
//       <p>Name: {user.name}</p>
//       <p>Email: {user.email}</p>
//       <p>Student ID: {user.studentId}</p>
//       <p>Role: {user.role}</p>
//       {/* Add more fields as needed */}
//     </div>
//   );
// };

// export default ProfilePage;

//snippet 2

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const ProfilePage = ({ darkMode }) => {
//   const { id } = useParams(); // Fetch user ID from route
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = Cookies.get('authtoken');
//         const response = await fetch(`http://localhost:4600/api/users/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setUser(data);
//         } else {
//           console.error(data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [id]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!user) return <div className="text-center text-red-500">User not found</div>;

//   return (
//     <div className={`bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex justify-center items-center p-4`}>
//       <div className={`w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-lg mx-auto mt-10 p-8 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg rounded-lg`}>
//         <h1 className="text-4xl font-bold text-center text-indigo-900 mb-6">Profile Details</h1>

//         {/* Profile Picture or Initials */}
//         <div className="flex justify-center mb-6">
//           <div className="w-32 h-32 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-semibold">
//             {user.name ? user.name.charAt(0) : 'N/A'}
//           </div>
//         </div>

//         <div className="space-y-6 text-xl">
//           <div className="text-gray-700">
//             <strong className="font-semibold">Student ID:</strong> {user.studentId}
//           </div>
//           <div className="text-gray-700">
//             <strong className="font-semibold">Name:</strong> {user.name}
//           </div>
//           <div className="text-gray-700">
//             <strong className="font-semibold">Email:</strong> {user.email}
//           </div>
//           <div className="text-gray-700">
//             <strong className="font-semibold">Role:</strong> {user.role}
//           </div>
//           {/* Add more fields as needed */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

//snipet 3

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const UserDetail = ({ darkMode }) => {
//   const { id } = useParams(); // Fetch user ID from route
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = Cookies.get('authtoken');
//         const response = await fetch(`http://localhost:4600/api/users/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setUser(data);
//         } else {
//           console.error(data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [id]);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!user) return <div className="text-center text-red-500">User not found</div>;

//   return (
//     <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex justify-center items-center p-4">
//       <div className={`w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-lg mx-auto mt-10 p-8 shadow-lg rounded-lg ${
//         darkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'
//       }`}>
//         <h1 className={`text-4xl font-bold text-center mb-6 ${darkMode ? 'text-indigo-200' : 'text-indigo-900'}`}>Profile Details</h1>

//         {/* Profile Picture or Initials */}
//         <div className="flex justify-center mb-6">
//           <div className={`w-32 h-32 ${darkMode ? 'bg-indigo-700' : 'bg-blue-600'} text-white rounded-full flex items-center justify-center text-3xl font-semibold`}>
//             {user.name ? user.name.charAt(0) : 'N/A'}
//           </div>
//         </div>

//         <div className="space-y-6 text-xl">
//           <div className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//             <strong className="font-semibold">Student ID:</strong> {user.studentId}
//           </div>
//           <div className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//             <strong className="font-semibold">Name:</strong> {user.name}
//           </div>
//           <div className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//             <strong className="font-semibold">Email:</strong> {user.email}
//           </div>
//           <div className={`${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//             <strong className="font-semibold">Role:</strong> {user.role}
//           </div>
//           {/* Add more fields as needed */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDetail;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UserDetail = ({ darkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("authtoken");
        const response = await fetch(`http://localhost:4600/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        } else {
          setError(data.message || "Failed to fetch user details");
        }
      } catch (error) {
        setError("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleEdit = () => {
    setEditMode(true);
    setUpdatedUser(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const token = Cookies.get("authtoken");
      const response = await fetch(`http://localhost:4600/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        setUser(updatedUser);
        setEditMode(false);
      } else {
        setError("Failed to update user");
      }
    } catch (error) {
      setError("Error updating user");
    }
  };

  const handleDelete = async () => {
    try {
      const token = Cookies.get("authtoken");
      const response = await fetch(`http://localhost:4600/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigate("/users"); // Redirect to users list or homepage
      } else {
        setError("Failed to delete user");
      }
    } catch (error) {
      setError("Error deleting user");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex justify-center items-center p-4">
      <div
        className={`w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-lg mx-auto mt-10 p-8 shadow-lg rounded-lg ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-900"
        }`}
      >
        <h1
          className={`text-4xl font-bold text-center mb-6 ${
            darkMode ? "text-indigo-200" : "text-indigo-900"
          }`}
        >
          Profile Details
        </h1>

        <div className="flex justify-center mb-6">
          <div
            className={`w-32 h-32 ${
              darkMode ? "bg-indigo-700" : "bg-blue-600"
            } text-white rounded-full flex items-center justify-center text-3xl font-semibold`}
          >
            {user.name ? user.name.charAt(0) : "N/A"}
          </div>
        </div>

        {user && !editMode && (
          <div className="space-y-6">
            <div className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>
              <strong className="font-semibold">Student ID:</strong>{" "}
              {user.studentId}
            </div>
            <div className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>
              <strong className="font-semibold">Name:</strong> {user.name}
            </div>
            <div className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>
              <strong className="font-semibold">Email:</strong> {user.email}
            </div>
            <div className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>
              <strong className="font-semibold">Role:</strong> {user.role}
            </div>

            <button
              onClick={handleEdit}
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded-full shadow-md transition duration-300"
            >
              Edit Profile
            </button>
            <button
              onClick={handleDelete}
              className="w-full py-2 mt-4 bg-red-600 text-white rounded-full shadow-md transition duration-300"
            >
              Delete Profile
            </button>
          </div>
        )}

        {editMode && (
          <div className="space-y-6">
            <div>
              <label className="text-lg text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={updatedUser.name || ""}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-lg text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={updatedUser.email || ""}
                onChange={handleChange}
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="w-full py-2 bg-green-600 text-white rounded-full shadow-md transition duration-300"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="w-full py-2 mt-4 bg-gray-600 text-white rounded-full shadow-md transition duration-300"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
