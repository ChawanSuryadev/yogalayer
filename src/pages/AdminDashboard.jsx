import React from "react";

const AdminDashboard = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to the Admin Dashboard</h1>
      <p>You have admin access. From here you can manage the site.</p>

      <div style={{ marginTop: "2rem" }}>
        <h2>Sections:</h2>
        <ul>
          <li>🛒 View all user orders</li>
          <li>👤 Manage users</li>
          <li>📦 Manage product listings</li>
          <li>💳 Payment tracking</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
