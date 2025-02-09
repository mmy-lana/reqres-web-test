import React from "react";
import "./EditUserForm.css";

const EditUserForm = ({ user, onUpdate, onCancel, onChange }) => {
  const handleJobChange = (e) => {
    const { value, checked } = e.target;
    let updatedJobs = user.job ? [...user.job] : [];

    if (checked) {
      updatedJobs.push(value);
    } else {
      updatedJobs = updatedJobs.filter((job) => job !== value);
    }

    onChange({ target: { name: "job", value: updatedJobs } });
  };

  return (
    <div className="edit-user-form">
      <h2>Edit User</h2>
      <label>
        First Name:
        <input
          type="text"
          name="first_name"
          value={user.first_name}
          onChange={onChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="last_name"
          value={user.last_name}
          onChange={onChange}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={onChange}
        />
      </label>
      <label>
        <label>Job: </label>
        <div className="job-checkboxes-edit">
          <label>
            <input
              type="checkbox"
              name="job"
              value="Web Developer"
              checked={user.job?.includes("Web Developer")}
              onChange={handleJobChange}
            />
            Web Developer
          </label>
          <label>
            <input
              type="checkbox"
              name="job"
              value="Mobile Developer"
              checked={user.job?.includes("Mobile Developer")}
              onChange={handleJobChange}
            />
            Mobile Developer
          </label>
        </div>
      </label>
      <div className="form-actions">
        <button onClick={onUpdate}>Update</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditUserForm;
