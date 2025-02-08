import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  updateUser,
  getUserDetails,
  deleteUser,
} from "../../services/userService";
import UserCard from "../../components/UserCard/UserCard";
import EditUserForm from "../../components/EditUserForm/EditUserForm";
import UserDetails from "../../components/UserDetails/UserDetails";
import Pagination from "../../components/Pagination/Pagination";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import CreateUserForm from "../../components/CreateUserForm/CreateUserForm";
import "./dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingUser, setEditingUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: "",
    email: "",
    job: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const data = await getUsers(currentPage);
        setUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUpdatedUserData({
      name: user.first_name + " " + user.last_name,
      email: user.email,
      job: user.job || "",
    });
  };

  const handleUpdateUser = async () => {
    try {
      const { name, email, job } = updatedUserData;
      const updatedData = {
        name,
        email,
        job,
      };
      const updatedUser = await updateUser(editingUser.id, updatedData);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id ? { ...user, ...updatedUser } : user
        )
      );
      setEditingUser(null);
    } catch (err) {
      setError("Failed to update user.");
    }
  };

  const handleViewDetails = async (userId) => {
    try {
      const user = await getUserDetails(userId);
      setUserDetails(user.data);
    } catch (err) {
      setError("Failed to fetch user details.");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (err) {
      setError("Failed to delete user.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <LogoutButton />
        <CreateUserForm />
      </div>
      <h1>Welcome to Dashboard</h1>
      <h2>User List</h2>
      <div className="user-list">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onViewDetails={handleViewDetails}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {editingUser && (
        <EditUserForm
          user={updatedUserData}
          onUpdate={handleUpdateUser}
          onCancel={() => setEditingUser(null)}
          onChange={handleChange}
        />
      )}
      {userDetails && <UserDetails user={userDetails} />}
    </div>
  );
};

export default Dashboard;
