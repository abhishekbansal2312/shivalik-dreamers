import React, { useState, useEffect } from "react";
import { storage } from "../../firebase"; // Firebase configuration
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Firebase storage functions
import { toast } from "react-hot-toast"; // Importing toast

const UpdateMealForm = ({ meal, setMeals, onSave, onCancel }) => {
  const [updatedMeal, setUpdatedMeal] = useState({
    name: meal.name || "",
    category: meal.category || "",
    image: null,
    description: meal.description || "",
    ingredients: meal.ingredients || "",
    allergens: meal.allergens || "",
    price: meal.price || "",
    caloric: meal.caloric || "",
    protein: meal.protein || "",
    carbs: meal.carbs || "",
    fats: meal.fats || "",
    available: meal.available || true, // Available status
  });

  const [uploading, setUploading] = useState(false); // Uploading state
  const [dragging, setDragging] = useState(false); // Drag state
  const [uploadError, setUploadError] = useState(""); // Error state

  useEffect(() => {
    setUpdatedMeal({
      name: meal.name || "",
      category: meal.category || "",
      image: null,
      description: meal.description || "",
      ingredients: meal.ingredients || "",
      allergens: meal.allergens || "",
      price: meal.price || "",
      caloric: meal.caloric || "",
      protein: meal.protein || "",
      carbs: meal.carbs || "",
      fats: meal.fats || "",
      available: meal.available || true,
    });
  }, [meal]);

  const handleUpdateMeal = async (event) => {
    event.preventDefault();

    try {
      // Use the existing image URL if no new image is selected
      let pictureURL = meal.pictureURL;

      // Only attempt to upload a new image if one has been selected
      if (updatedMeal.image) {
        const storageRef = ref(storage, `meals/${updatedMeal.image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, updatedMeal.image);
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
              pictureURL = await getDownloadURL(uploadTask.snapshot.ref);
              await submitUpdatedMeal(pictureURL); // Submit with new pictureURL
            } catch (err) {
              setUploadError(err.message);
              setUploading(false);
              toast.error(err.message);
            }
          }
        );
      } else {
        // If no new image is selected, submit with the existing pictureURL
        await submitUpdatedMeal(pictureURL);
      }
    } catch (err) {
      setUploadError(err.message);
      setUploading(false);
      toast.error(err.message);
    }
  };

  const submitUpdatedMeal = async (pictureURL) => {
    try {
      // Send the updated meal data to the backend API
      const response = await fetch(
        `http://localhost:4600/api/meals/${meal._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...updatedMeal,
            pictureURL, // Add the updated Firebase image URL if a new image is uploaded
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setUploadError(errorData.message || "Failed to update meal");
        setUploading(false);
        toast.error(errorData.message || "Failed to update meal");
        return;
      }

      const data = await response.json();
      setMeals((prevMeals) =>
        prevMeals.map((mealItem) =>
          mealItem._id === data.meal._id ? data.meal : mealItem
        )
      );

      // Call onSave if available to pass the updated meal
      if (onSave) onSave(data.meal);

      setUploading(false);
      toast.success("Meal updated successfully!");
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
    if (file && file.type.startsWith("image/")) {
      setUpdatedMeal((prev) => ({ ...prev, image: file }));
    } else {
      toast.error("Please upload a valid image file.");
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleToggleAvailable = () => {
    setUpdatedMeal((prev) => ({ ...prev, available: !prev.available }));
  };

  return (
    <div className="text-sm">
      <form
        onSubmit={handleUpdateMeal}
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
              setUpdatedMeal({ ...updatedMeal, image: e.target.files[0] })
            }
          />
          <div
            className="flex items-center justify-center h-14"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {updatedMeal.image ? (
              <img
                src={URL.createObjectURL(updatedMeal.image)}
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

        {/* Form fields */}
        <div className="mb-2">
          <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">
            Meal Name
          </label>
          <input
            type="text"
            placeholder="Enter meal name"
            value={updatedMeal.name}
            onChange={(e) =>
              setUpdatedMeal({ ...updatedMeal, name: e.target.value })
            }
            required
            className="w-full p-2 h-10 border rounded-lg dark:bg-gray-800"
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
            value={updatedMeal.description}
            onChange={(e) =>
              setUpdatedMeal({ ...updatedMeal, description: e.target.value })
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
            value={updatedMeal.category}
            onChange={(e) =>
              setUpdatedMeal({ ...updatedMeal, category: e.target.value })
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
            value={updatedMeal.price}
            onChange={(e) =>
              setUpdatedMeal({ ...updatedMeal, price: e.target.value })
            }
            required
            className="w-full mt-1 p-2 h-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* New fields for Calories, Protein, Carbs, Fats */}
        <div className="grid grid-cols-2 gap-6 mb-2">
          <div>
            <label className="block font-medium mb-2">Calories</label>
            <input
              type="number"
              name="caloric"
              value={updatedMeal.caloric}
              onChange={(e) =>
                setUpdatedMeal({ ...updatedMeal, caloric: e.target.value })
              }
              placeholder="Total Calories"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Protein (g)</label>
            <input
              type="number"
              name="protein"
              value={updatedMeal.protein}
              onChange={(e) =>
                setUpdatedMeal({ ...updatedMeal, protein: e.target.value })
              }
              placeholder="Protein in grams"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-2">
          <div>
            <label className="block font-medium mb-2">Carbs (g)</label>
            <input
              type="number"
              name="carbs"
              value={updatedMeal.carbs}
              onChange={(e) =>
                setUpdatedMeal({ ...updatedMeal, carbs: e.target.value })
              }
              placeholder="Carbs in grams"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Fats (g)</label>
            <input
              type="number"
              name="fats"
              value={updatedMeal.fats}
              onChange={(e) =>
                setUpdatedMeal({ ...updatedMeal, fats: e.target.value })
              }
              placeholder="Fats in grams"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="col-span-2 flex justify-between mt-4">
          <button
            type="button"
            className="bg-gray-400 text-white rounded-lg p-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 text-white rounded-lg p-2"
          >
            {uploading ? "Updating..." : "Update Meal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMealForm;
