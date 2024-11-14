import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast"; // Import toast
import MealCard from "./MealCard";
import CreateMeal from "./CreateMeal";
import UpdateMealForm from "./UpdateMealForm";
import Modal from "../Modal";

const MealList = ({ darkMode, toggleDarkMode }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateMeal, setShowCreateMeal] = useState(false);
  const [showEditMeal, setShowEditMeal] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const token = Cookies.get("authtoken");

        if (!token) {
          console.error("No token found. Redirecting to login page...");
          toast.error("No token found. Redirecting to login page...");
          window.location.href = "/login";
          return;
        }

        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.role === "admin");

        // Fetch meals from the backend
        const mealsResponse = await fetch("http://localhost:4600/api/meals", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!mealsResponse.ok) throw new Error("Failed to fetch meals");

        const mealsData = await mealsResponse.json();

        const sortedMeals = mealsData.sort(
          (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
        );

        setMeals(sortedMeals);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const token = Cookies.get("authtoken");
        const response = await fetch(`http://localhost:4600/api/meals/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete item");
        }

        setMeals((prev) => prev.filter((meal) => meal._id !== id));
        toast.success("Item deleted successfully!");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  const handleUpdateMeal = (updatedMeal) => {
    setMeals((prevMeals) =>
      prevMeals.map((meal) =>
        meal._id === updatedMeal._id ? updatedMeal : meal
      )
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* Add loader animation */}
      </div>
    );
  }

  return (
    <div
      className={`px-16 py-8 ${
        darkMode ? "dark:bg-gray-900 dark:text-white" : "bg-white text-black"
      }`}
    >
      <div className="min-h-screen transition duration-500">
        {/* Meal List Section */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Meal List</h2>
          {isAdmin && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-[12px] text-white font-normal py-2 px-4 rounded-md transition-colors duration-300"
              onClick={() => setShowCreateMeal(true)}
            >
              Add Meal
            </button>
          )}
        </div>

        <Modal
          isOpen={showCreateMeal}
          title={"Add Meal"}
          onClose={() => setShowCreateMeal(false)}
        >
          <CreateMeal
            setMeals={setMeals}
            onClose={() => setShowCreateMeal(false)}
            darkMode={darkMode}
          />
        </Modal>

        <Modal
          isOpen={showEditMeal}
          title={"Edit Meal"}
          onClose={() => setShowEditMeal(false)}
        >
          <UpdateMealForm
            meal={editingMeal}
            onCancel={() => setEditingMeal(null)}
            setMeals={setMeals}
            darkMode={true}
          />
        </Modal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.length === 0 ? (
            <p>No meals found.</p>
          ) : (
            meals.map((meal) => (
              <MealCard
                key={meal._id}
                meal={meal}
                darkMode={darkMode}
                isAdmin={isAdmin}
                onDelete={() => handleDelete(meal._id)}
                onEdit={() => setEditingMeal(meal)}
                onUpdateMeal={handleUpdateMeal}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MealList;
