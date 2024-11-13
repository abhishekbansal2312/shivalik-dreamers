import React, { useState } from "react";
import { storage } from "../../firebase"; // Firebase configuration
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase storage functions
import { toast } from "react-hot-toast"; // Importing toast

const MealForm = ({ setMeals, darkMode, onSave, onCancel }) => {
  const [newMeal, setNewMeal] = useState({
    name: "",
    category: "",
    image: null,
    description: "",
    ingredients: "",
    allergens: "",
    price: "",
    caloric: "",
    protein: "",
    carbs: "",
    fats: "",
    available: true, // Available status
  });

  const [uploading, setUploading] = useState(false); // Uploading state
  const [dragging, setDragging] = useState(false); // Drag state
  const [uploadError, setUploadError] = useState(""); // Error state

  const handleAddMeal = async (event) => {
    event.preventDefault();

    if (!newMeal.image) {
      toast.error("Please upload a picture.");
      return;
    }

    try {
      // Start the image upload to Firebase
      const storageRef = ref(storage, `meals/${newMeal.image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, newMeal.image);
      setUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.error("Upload error: ", error);
          setUploadError(error.message);
          setUploading(false);
          toast.error(error.message);
        },
        async () => {
          try {
            // Get the download URL after successful upload
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Send the meal data along with the image URL to the backend API
            const response = await fetch("http://localhost:4600/api/meals", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...newMeal,
                pictureURL: downloadURL, // Add the Firebase image URL
              }),
              credentials: "include",
            });

            if (!response.ok) {
              const errorData = await response.json();
              setUploadError(errorData.message || "Failed to add meal");
              setUploading(false);
              toast.error(errorData.message || "Failed to add meal");
              return;
            }

            const data = await response.json();
            setMeals((prevMeals) => [...prevMeals, data.meal]);

            // Call onSave if available to pass the added meal
            if (onSave) onSave(data.meal);

            // Reset the form fields after successful submission
            setNewMeal({
              name: "",
              category: "",
              image: null,
              description: "",
              ingredients: "",
              allergens: "",
              price: "",
              caloric: "",
              protein: "",
              carbs: "",
              fats: "",
              available: true,
            });

            setUploading(false);
            toast.success("Meal added successfully!");
          } catch (err) {
            setUploadError(err.message);
            setUploading(false);
            toast.error(err.message);
          }
        }
      );
    } catch (err) {
      setUploadError(err.message);
      setUploading(false);
      toast.error(err.message);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setNewMeal((prev) => ({ ...prev, image: file }));
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleToggleAvailable = () => {
    setNewMeal((prev) => ({ ...prev, available: !prev.available }));
  };

  return (
    <div className="text-sm">
      <form
        onSubmit={handleAddMeal}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[14px]"
      >
        <div
          className={`mb-2 border-2 border-dashed rounded-lg p-4 transition col-span-2 ${
            dragging ? "border-blue-500" : ""
          } dark:border-gray-300 border-gray-600`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={(e) =>
              setNewMeal({ ...newMeal, image: e.target.files[0] })
            }
          />
          <div
            className="flex items-center justify-center h-14"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {newMeal.image ? (
              <img
                src={URL.createObjectURL(newMeal.image)}
                alt="Meal"
                className="h-full"
              />
            ) : (
              <p className="text-gray-400 dark:text-gray-300">
                Drag and drop a file here, or click to select a file
              </p>
            )}
          </div>
        </div>

        <div className="mb-2">
          <label
            htmlFor="name"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-1"
          >
            Meal Name
          </label>
          <input
            type="text"
            placeholder="Enter meal name"
            value={newMeal.name}
            onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
            required
            className="w-full mt-1 p-2 h-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="description"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-1"
          >
            Description
          </label>
          <input
            type="text"
            placeholder="Enter description"
            value={newMeal.description}
            onChange={(e) =>
              setNewMeal({ ...newMeal, description: e.target.value })
            }
            required
            className="w-full mt-1 p-2 h-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="category"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-1"
          >
            Category
          </label>
          <input
            type="text"
            placeholder="Enter meal category"
            value={newMeal.category}
            onChange={(e) =>
              setNewMeal({ ...newMeal, category: e.target.value })
            }
            required
            className="w-full mt-1 p-2 h-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="price"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-1"
          >
            Price
          </label>
          <input
            type="number"
            placeholder="Enter meal price"
            value={newMeal.price}
            onChange={(e) => setNewMeal({ ...newMeal, price: e.target.value })}
            required
            className="w-full mt-1 p-2 h-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="caloric"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-1"
          >
            Caloric Content
          </label>
          <input
            type="number"
            placeholder="Enter total calories"
            value={newMeal.caloric}
            onChange={(e) =>
              setNewMeal({ ...newMeal, caloric: e.target.value })
            }
            required
            className="w-full mt-1 p-2 h-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="protein"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-1"
          >
            Protein (g)
          </label>
          <input
            type="number"
            placeholder="Enter protein content"
            value={newMeal.protein}
            onChange={(e) =>
              setNewMeal({ ...newMeal, protein: e.target.value })
            }
            required
            className="w-full mt-1 p-2 h-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="carbs"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-1"
          >
            Carbohydrates (g)
          </label>
          <input
            type="number"
            placeholder="Enter carbs content"
            value={newMeal.carbs}
            onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
            required
            className="w-full mt-1 p-2 h-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="fats"
            className="block text-gray-700 dark:text-gray-300 font-semibold mb-1"
          >
            Fats (g)
          </label>
          <input
            type="number"
            placeholder="Enter fats content"
            value={newMeal.fats}
            onChange={(e) => setNewMeal({ ...newMeal, fats: e.target.value })}
            required
            className="w-full mt-1 p-2 h-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="available"
              checked={newMeal.available}
              onChange={handleToggleAvailable}
              className="mr-2"
            />
            <label
              htmlFor="available"
              className="text-gray-700 dark:text-gray-300"
            >
              Available
            </label>
          </div>

          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="py-2 px-4 rounded-md text-white bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className={`py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 ${
                uploading ? "opacity-50" : ""
              }`}
            >
              {uploading ? "Uploading..." : "Save Meal"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MealForm;
