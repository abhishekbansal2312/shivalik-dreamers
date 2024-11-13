import React from "react"; // Removed the unnecessary useState import
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast"; // Added this line

const UserItem = ({ user, handleEdit, handleDelete, darkMode }) => {
  return (
    <li
      key={user._id}
      className={`flex flex-col p-2 shadow-md transition duration-300 pb-1 w-full mx-auto 
      ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`} // Dark mode background and text color
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex-1">
          <p className={`text-md font-normal flex flex-col`}>
            {user.studentId} | {user.name}
            <span className={`text-[12px] ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</span>
          </p>
        </div>
        <div className="flex mt-2 sm:mt-0 space-x-2">
          {/* Edit button with icon */}
          <button
            onClick={() => handleEdit(user)}
            className={`flex items-center px-3 py-1 text-teal-400 border border-teal-400 rounded hover:bg-teal-400 hover:text-white transition duration-200 text-[12px]
            ${darkMode ? 'border-teal-600 text-teal-200 hover:bg-teal-700' : ''}`} // Dark mode edit button styles
          >
            <FaEdit className="mr-1" />
            Edit
          </button>

          {/* Delete button with icon */}
          <button
            onClick={() => handleDelete(user._id)}
            className={`flex items-center px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition duration-200 text-[12px]
            ${darkMode ? 'border-red-600 text-red-200 hover:bg-red-700' : ''}`} // Dark mode delete button styles
          >
            <FaTrash className="mr-1" />
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default UserItem;
