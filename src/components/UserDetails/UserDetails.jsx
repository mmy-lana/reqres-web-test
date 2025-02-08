import React from "react";
import "./UserDetails.css";

const UserDetails = ({ user }) => {
  return (
    <div className="user-details">
      <h2>User Details</h2>
      <img
        src={user.avatar}
        alt={`${user.first_name} ${user.last_name}`}
        className="user-details-avatar"
      />
      <h3>
        {user.first_name} {user.last_name}
      </h3>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserDetails;
