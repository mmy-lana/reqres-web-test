import React, { useState } from "react";
import { createUser } from "../../services/userService";
import "./CreateUserForm.css";

const CreateUserForm = ({ onUserCreated }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    job: [], // Initialize job as an empty array
  });
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  // Handle job checkbox changes
  const handleJobChange = (e) => {
    const { value, checked } = e.target;
    let updatedJobs = [...newUser.job]; // Create a copy of the current jobs array

    if (checked) {
      // Add the job to the array if checked
      updatedJobs.push(value);
    } else {
      // Remove the job from the array if unchecked
      updatedJobs = updatedJobs.filter((job) => job !== value);
    }

    // Update the newUser state with the updated jobs array
    setNewUser({ ...newUser, job: updatedJobs });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !newUser.firstName ||
      !newUser.lastName ||
      !newUser.email ||
      newUser.job.length === 0
    ) {
      setError(
        "First Name, Last Name, Email, and at least one job are required."
      );
      return;
    }
    setError("");

    try {
      // Simulate API call to create a user
      const createdUser = await createUser(newUser);
      setNotification(`User created successfully! ID: ${createdUser.id}`);

      // Add the new user to the list
      onUserCreated({
        id: createdUser.id,
        first_name: newUser.firstName,
        last_name: newUser.lastName,
        email: newUser.email,
        job: newUser.job, // Pass the jobs array
        avatar: "https://picsum.photos/200/300", // Default avatar
      });

      // Reset form and close popup
      setNewUser({ firstName: "", lastName: "", email: "", job: [] });
      setIsPopupOpen(false);
      setTimeout(() => setNotification(""), 3000); // Clear notification after 3 seconds
    } catch (err) {
      setError("Failed to create user.");
    }
  };

  return (
    <div className="create-user-button-container">
      <button
        onClick={() => setIsPopupOpen(true)}
        className="create-user-button"
      >
        Create User
      </button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Create New User</h2>
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <div className="job-checkboxes">
                <label>Job: </label>
                <label>
                  <input
                    type="checkbox"
                    value="Web Developer"
                    checked={newUser.job.includes("Web Developer")}
                    onChange={handleJobChange}
                  />
                  Web Developer (Frontend/Backend)
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="Mobile Developer"
                    checked={newUser.job.includes("Mobile Developer")}
                    onChange={handleJobChange}
                  />
                  Mobile Developer (iOS/Android)
                </label>
              </div>
              <div className="form-actions">
                <button type="submit">Create</button>
                <button type="button" onClick={() => setIsPopupOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
            {error && <p className="error">{error}</p>}
            {notification && <p className="notification">{notification}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateUserForm;
