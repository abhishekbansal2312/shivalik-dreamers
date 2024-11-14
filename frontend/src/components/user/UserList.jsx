import React from "react";
import UserItem from "./UserItem";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast"; // Added this line

const UserList = ({ users, handleEdit, handleDelete, darkMode }) => {
  return (
    <ul
      className={`w-full gap-2 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } `}
    >
      {users.map((user) => (
        <Link to={`/users/${user._id}`} key={user._id}>
          <UserItem
            user={user}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            darkMode={darkMode}
          />
        </Link>
      ))}
    </ul>
  );
};

export default UserList;
