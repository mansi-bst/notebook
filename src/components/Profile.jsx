import React, { useState } from "react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Mansi Singh",
    role: "Computer Science Student | Notebook Creator",
    bio: "Passionate about organizing knowledge and building structured digital notebooks.",
    email: "mansi@example.com",
    updatedAt: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    setProfile((prev) => ({
      ...prev,
      updatedAt: new Date().toLocaleString(),
    }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Cover */}
        <div className="bg-linear-to-r from-blue-600 to-indigo-600 h-40 relative">
          <div className="absolute -bottom-16 left-6">
            <img
              src="https://images.pexels.com/photos/30537433/pexels-photo-30537433/free-photo-of-woman-in-sweater-gazing-over-rustic-fence.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="mt-20 px-6 pb-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="w-full md:w-2/3">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="border p-2 rounded w-full mb-2"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-800">
                  {profile.name}
                </h1>
              )}

              {isEditing ? (
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                />
              ) : (
                <p className="text-gray-500 mt-1">{profile.role}</p>
              )}
            </div>

            <div>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition"
                >
                  Update
                </button>
              )}
            </div>
          </div>

          {/* About */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-800 mb-2">About</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="border p-3 rounded w-full"
                rows="3"
              />
            ) : (
              <p className="text-gray-600">{profile.bio}</p>
            )}
          </div>

          {/* Contact */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-2">Contact</h3>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ) : (
              <p className="text-gray-600">{profile.email}</p>
            )}
          </div>

          {/* Last Updated */}
          {profile.updatedAt && (
            <div className="mt-6 text-sm text-gray-400">
              Last Updated: {profile.updatedAt}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;