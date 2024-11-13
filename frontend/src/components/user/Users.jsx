import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import UserForm from "./UserForm";
import UserList from "./UserList";
import Modal from "../Modal";

const Users = ({ darkMode }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25; // Set the number of items per page

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("authtoken");
      const response = await fetch("http://localhost:4600/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle changes to form input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle search input change and reset pagination to page 1
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to the first page on search
  };

  // Handle user form submission (create or update user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("authtoken");
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `http://localhost:4600/api/users/${selectedUser}`
      : "http://localhost:4600/api/users";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (response.ok) {
        fetchUsers();
        resetForm();
        toast.success(
          isEditing
            ? "User updated successfully!"
            : "User created successfully!"
        );
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  // Handle editing a user
  const handleEdit = (user) => {
    setSelectedUser(user._id);
    setFormData({
      studentId: user.studentId,
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo(0, 0);
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    const token = Cookies.get("authtoken");
    try {
      const response = await fetch(`http://localhost:4600/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        fetchUsers();
        toast.success("User deleted successfully!");
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Reset form and state after submit
  const resetForm = () => {
    setFormData({ studentId: "", name: "", email: "", password: "", role: "" });
    setSelectedUser(null);
    setIsEditing(false);
    setShowForm(false);
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Loading state
  if (loading) {
    return (
      <p className={`min-h-screen flex justify-center items-center ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        Loading users...
      </p>
    );
  }

  // Common button styles
  const commonButtonClass =
    "bg-blue-500 hover:bg-blue-700 text-[12px] text-white font-normal py-2 px-4 rounded-md transition-colors duration-300";

  return (
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} px-16 py-8`}>
      <div className="flex flex-row sm:flex-row justify-between items-center max-w-full pb-4">
        <h2 className="text-lg sm:text-2xl font-semibold">Users Management</h2>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className={commonButtonClass}
        >
          Add User
        </button>
      </div>

      {showForm && (
        <Modal
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          title={"Add User"}
        >
          <UserForm
            formData={formData}
            isEditing={isEditing}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            resetForm={resetForm}
            onClose={() => setShowForm(false)}
          />
        </Modal>
      )}

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by Name or Student ID"
          className="w-full p-2 rounded-lg shadow border bg-white border-gray-300 outline-none"
        />
      </div>

      <UserList
        users={currentUsers} // Use currentUsers for pagination
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        darkMode={darkMode} // Pass darkMode to UserList
      />

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 p-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Users;
