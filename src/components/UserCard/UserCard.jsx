import React from "react";
import "./UserCard.css";

const UserCard = ({ user, onViewDetails, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="user-avatar"
      />
      <h3 className="user-name">
        {user.first_name} {user.last_name}
      </h3>
      <p className="user-email">{user.email}</p>
      <p className="user-job">
        {user.job && user.job.length > 0 ? user.job.join(", ") : "Others"}
      </p>
      <div className="user-actions">
        <button onClick={() => onViewDetails(user.id)}>View Details</button>
        <button onClick={() => onEdit(user)}>Edit</button>
        <button onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
