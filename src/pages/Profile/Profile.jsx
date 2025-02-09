import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { currentUser, loading } = useAuth();

  // Generate initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  if (loading || !currentUser) {
    return <div className="mt-20 text-center text-2xl font-bold text-gray-800">Loading...</div>;
  }
  return (
    <div className="min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-6">My Profile</h1>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar with initials */}
              <div className="w-16 h-16 rounded-full bg-violet-500 flex items-center justify-center text-white text-xl font-medium">
                {getInitials(currentUser?.fullName)}
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900">{currentUser?.fullName}</h2>
                <p className="text-gray-500">{currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)}</p>
                <p className="text-gray-500">{currentUser?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
