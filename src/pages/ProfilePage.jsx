import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ProfilePage({ user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>

      <div className="space-y-3">
        <div><strong>Full Name:</strong> {user.fullName}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Mobile:</strong> {user.mobile}</div>
        <div><strong>User ID:</strong> {user._id}</div>
        <div><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
      </div>

      <Link to="/address" className="text-blue-600 hover:underline mt-4 inline-block">
        ✏️ Edit Address
      </Link>
    </div>
  );
}
