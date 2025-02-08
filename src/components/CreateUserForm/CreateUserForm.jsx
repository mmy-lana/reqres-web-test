import React, { useState } from "react";
import { createUser } from "../../services/userService";
import "./CreateUserForm.css";

const CreateUserButton = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    job: "",
  });
  const [error, setError] = useState("");
  const [notification, setNotification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.job) {
      setError("Name and Job are required.");
      return;
    }
    setError("");
    try {
      const createdUser = await createUser(newUser);
      setNotification(`User created successfully! ID: ${createdUser.id}`);
      setNewUser({ name: "", job: "" }); // Reset form
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
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Job"
                value={newUser.job}
                onChange={(e) =>
                  setNewUser({ ...newUser, job: e.target.value })
                }
              />
              <button type="submit">Create</button>
              <button type="button" onClick={() => setIsPopupOpen(false)}>
                Cancel
              </button>
            </form>
            {error && <p className="error">{error}</p>}
            {notification && <p className="notification">{notification}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateUserButton;
