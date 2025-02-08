import React from "react";
import "./EditUserForm.css";

const EditUserForm = ({ user, onUpdate, onCancel, onChange }) => {
  return (
    <div className="edit-user-form">
      <h2>Edit User</h2>
      <label>
        Name:
        <input type="text" name="name" value={user.name} onChange={onChange} />
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
        Job:
        <input type="text" name="job" value={user.job} onChange={onChange} />
      </label>
      <div className="form-actions">
        <button onClick={onUpdate}>Update</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditUserForm;
