// src/components/HomePage.jsx
import React from 'react';
import banner from "../assets/img.png";
import GetStarted from '../components/GetStarted';
import ExploreMenu from '../components/ExploreMenu';
import mos from "../assets/mos.jpg";
import fars from "../assets/fars.jpg";
import upap from "../assets/upap.jpg";
import aaus from "../assets/aaus.jpg";

const HomePage = ({ darkMode, isAuthenticated }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} font-sans`}>

      {/* Full-Screen Image Banner */}
      <div className="relative w-full h-screen">
        <img
          src={banner}
          alt="Hostel Cafeteria Banner"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(150%)" }}
        />
      </div>

      {/* Conditionally render GetStarted or ExploreMenu based on login status */}
      {isAuthenticated ? (
        <ExploreMenu darkMode={darkMode} />
      ) : (
        <GetStarted darkMode={darkMode} />
      )}

      {/* Main Content Below Banner */}
      <div className="px-4 py-12 max-w-screen-xl mx-auto">
        {/* Meal Ordering System */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          {/* Left Section - Content about Meal Ordering System */}
          <div className="flex flex-col justify-center">
            {/* Heading of the section */}
            <h2 className="text-3xl font-semibold mb-4">Meal Ordering System</h2>

            {/* First Paragraph - Explaining the Browse Menu feature */}
            <p className="mb-4">
              <strong>Browse Menu: </strong>
              Students will be able to easily view the daily menu offered by the cafeteria. The menu includes detailed descriptions of the meals, allowing students to understand the ingredients and preparation of each dish. Additionally, each menu item is accompanied by high-quality images, providing a clear visual representation of the meal. Prices for each item are also displayed, helping students make informed choices based on their budget.
            </p>

            {/* Second Paragraph - Explaining the Customize Orders feature */}
            <p>
              <strong>Customize Orders: </strong>
              The system allows students to customize their orders according to their preferences. This includes adjusting portion sizes to suit individual appetites or dietary needs. Students can also specify dietary preferences such as vegetarian, vegan, gluten-free, or others. Additionally, the option for adding extra toppings or special requests gives students the flexibility to personalize their meals to match their tastes.
            </p>
          </div>

          {/* Right Section - Image related to Meal Ordering System */}
          <div className="relative">
            {/* Meal Ordering System Image */}
            <img
              src={mos}
              alt="Meal Ordering System"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Feedback and Rating System */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          {/* Left Section - Image related to Feedback and Rating System */}
          <div className="relative">
            {/* Feedback and Rating System Image */}
            <img
              src={fars}
              alt="Feedback and Rating System"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Right Section - Content about Feedback and Rating System */}
          <div className="flex flex-col justify-center">
            {/* Heading of the section */}
            <h2 className="text-3xl font-semibold mb-4">Feedback and Rating System</h2>

            {/* First Paragraph - Explaining the Rate Your Meal feature */}
            <p className="mb-4">
              <strong>Detailed Feedback on Meal Experience: </strong>
              After students finish their meals, they have the opportunity to provide specific feedback on various aspects of their dining experience, including the portion size, presentation of the meal, and timeliness of service. This feedback can also include suggestions for improvement, such as preferred meal options or adjustments to the cafeteria's offerings.
            </p>

            {/* Second Paragraph - Explaining the Anonymous Feedback Option */}
            <p>
              <strong>Feedback Option: </strong>
              In order to encourage honest and constructive opinions, students have the option to submit their feedback anonymously. This feature ensures that students feel more comfortable sharing their true thoughts and experiences without fear of judgment. The anonymity option helps in gathering more candid feedback, which can be essential for the cafeteria management to understand areas that need improvement.
            </p>
          </div>
        </section>


        {/* User Profiles and Preferences */}
        <section className="mb-16 grid md:grid-cols-2 gap-8">
          {/* Left Section - Content about User Profiles and Preferences */}
          <div className="flex flex-col justify-center">
            {/* Heading of the section */}
            <h2 className="text-3xl font-semibold mb-4">User Profiles and Preferences</h2>

            {/* First Paragraph - Explaining the Student Profiles feature */}
            <p className="mb-4">
              <strong>Student Profiles: </strong>
              Each student using the system has their own personalized profile. This profile contains important information such as the student's order history, allowing them to see what meals they have previously ordered. Additionally, students can manage their dietary preferences within their profile, such as indicating any food allergies or preferences like vegetarian or vegan diets. Furthermore, students can mark their favorite meals, so they can easily reorder them or be reminded of them in the future.
            </p>

            {/* Second Paragraph - Explaining the One-Click Reordering feature */}
            <p>
              <strong>One-Click Reordering: </strong>
              The system includes a convenient "One-Click Reordering" feature, which allows students to quickly access their past orders and reorder their meals with just a single click. This feature is designed to make it easier for students who regularly order the same meals to save time. Instead of browsing through the entire menu, they can simply select a previously ordered meal and reorder it in an instant.
            </p>
          </div>

          {/* Right Section - Image related to User Profiles and Preferences */}
          <div className="relative">
            {/* User Profiles and Preferences Image */}
            <img
              src={upap}
              alt="User Profiles and Preferences"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="mb-16 grid md:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={aaus}
              alt="Feedback and Rating System"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-semibold mb-4">Authentication and User Security</h2>

            <p className="mb-4">
              <strong>JWT Token for Secure Authentication: </strong>
              JSON Web Tokens (JWT) are used for securing user authentication in the system. When a user logs in, a JWT token is generated and sent to the client. This token contains encrypted user data and serves as proof of identity for future requests. The token is stored securely on the client-side (typically in cookies or local storage) and is sent with each request to verify the user's authenticity.            </p>

            <p>
              <strong>Bcrypt for Password Hashing: </strong>
              Bcrypt is employed to enhance user security by securely hashing user passwords before storing them in the database. Instead of storing plaintext passwords, bcrypt applies a hashing algorithm that turns the password into a fixed-length hash, which is stored in the database. Additionally, bcrypt automatically adds a unique salt to each password, preventing attackers from using precomputed hash values (rainbow tables) to crack passwords.
            </p>
          </div>
        </section>
      </div>

    </div>
  );
};

export default HomePage;
