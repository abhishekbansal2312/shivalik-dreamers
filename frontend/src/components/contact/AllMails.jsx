import React, { useEffect, useState } from "react";
import { FaInbox, FaRegPaperPlane, FaFolder, FaRegStar } from "react-icons/fa";
import { motion } from "framer-motion";

const AllMails = ({ darkMode }) => {
  const [mails, setMails] = useState([]);
  const [filteredMails, setFilteredMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [selectedMail, setSelectedMail] = useState(null);

  // Fetching mails
  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await fetch("http://localhost:4600/api/contact");
        const data = await response.json();
        setMails(data);
        setFilteredMails(data);
      } catch (err) {
        setError("Failed to fetch mails.");
      } finally {
        setLoading(false);
      }
    };
    fetchMails();
  }, []);

  // Filtering mails based on status
  useEffect(() => {
    const filtered = mails.filter((mail) =>
      selectedStatus === "all" ? true : mail.status === selectedStatus
    );
    setFilteredMails(filtered);
  }, [selectedStatus, mails]);

  // Sorting mails by sent date
  const handleSort = () => {
    const sortedMails = [...filteredMails].sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.sentAt) - new Date(b.sentAt)
        : new Date(b.sentAt) - new Date(a.sentAt);
    });
    setFilteredMails(sortedMails);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div
      className={`flex h-screen ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
      } transition-colors duration-300`}
    >
      {/* Sidebar */}
      <aside
        className={`w-1/4 p-6 flex flex-col shadow-lg border-r ${
          darkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
        }`}
      >
        <h3 className="text-xl font-semibold mb-4">Labels</h3>
        <ul className="space-y-2">
          {["all", "unread", "read", "replied"].map((status) => (
            <li key={status}>
              <button
                onClick={() => setSelectedStatus(status)}
                className={`w-full flex items-center p-3 rounded-lg transition-colors duration-300 ${
                  selectedStatus === status
                    ? "bg-blue-600 text-white shadow-md"
                    : `${
                        darkMode
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-800 hover:bg-gray-200"
                      }`
                }`}
              >
                {status === "all" && <FaInbox className="mr-2" />}
                {status === "unread" && <FaRegPaperPlane className="mr-2" />}
                {status === "read" && <FaFolder className="mr-2" />}
                {status === "replied" && <FaRegStar className="mr-2" />}
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        {/* Sort */}
        <h3 className="text-xl font-semibold mb-4">Sort by Date</h3>
        <button
          onClick={() => {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            handleSort();
          }}
          className={`w-full text-left p-3 rounded-lg transition-colors duration-300 ${
            darkMode
              ? "text-gray-300 hover:bg-gray-700"
              : "text-gray-800 hover:bg-gray-200"
          }`}
        >
          Sort: {sortOrder === "asc" ? "Oldest First" : "Newest First"}
        </button>
      </aside>

      {/* Main content */}
      <main className="w-3/4 p-0 overflow-hidden">
        <section
          className={`py-12 rounded-lg shadow-lg h-full border ${
            darkMode
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold mb-6">
              {selectedMail ? "Mail Details" : "All Mails"}
            </h2>

            {selectedMail ? (
              <motion.div
                className={`mail-details p-6 rounded-lg shadow-lg ${
                  darkMode
                    ? "bg-gray-800 text-gray-200"
                    : "bg-gray-100 text-gray-900"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <button
                  onClick={() => setSelectedMail(null)}
                  className="mb-4 text-blue-500 underline transition duration-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Back to Mails
                </button>
                <h3 className="text-2xl font-semibold mb-2">
                  {selectedMail.subject}
                </h3>
                <p className="mb-2">
                  <strong>From:</strong> {selectedMail.email}
                </p>
                <p className="mb-2">
                  <strong>Date:</strong>{" "}
                  {new Date(selectedMail.sentAt).toLocaleString()}
                </p>
                <p className="mb-4">
                  <strong>Status:</strong> {selectedMail.status}
                </p>
                <p>{selectedMail.message}</p>
              </motion.div>
            ) : (
              <div className="overflow-y-auto h-96">
                <motion.table
                  className="min-w-full rounded-lg shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <thead>
                    <tr className={darkMode ? "bg-gray-700" : "bg-gray-200"}>
                      <th className="px-4 py-3 text-left">Subject</th>
                      <th className="px-4 py-3 text-left">From</th>
                      <th className="px-4 py-3 text-left">Sent At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMails.map((mail) => (
                      <motion.tr
                        key={mail._id}
                        className={`hover:bg-gray-100 ${
                          darkMode
                            ? "dark:hover:bg-gray-700"
                            : "hover:bg-gray-200"
                        } cursor-pointer`}
                        onClick={() => setSelectedMail(mail)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td className="border px-4 py-3">{mail.subject}</td>
                        <td className="border px-4 py-3">{mail.email}</td>
                        <td className="border px-4 py-3">
                          {new Date(mail.sentAt).toLocaleString()}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </motion.table>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AllMails;
