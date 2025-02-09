import { Calendar, Clock, Upload } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import LoadingModal from "../../components/shared/LoadingModal/LoadingModal";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateEvent = () => {
  const { currentUser, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const categories = ["Conference", "Workshop", "Seminar", "Networking", "Social", "Other"];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    category: "",
    thumbnail: "",
    attendees: [],
    createdBy: null,
    createdAt: new Date().getTime(),
  });

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const uploadThumbnail = async () => {
    if (!thumbnail) return "";

    const formData = new FormData();
    formData.append("file", thumbnail);
    formData.append("upload_preset", "ems_event_images");

    try {
      setIsUploading(true);
      const response = await fetch(`${import.meta.env.VITE_CLOUDINARY_API_URL}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload error:", errorData);
        throw new Error(errorData.error?.message || "Upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUploading(true);

      if (!thumbnail) {
        toast.error("Please upload a thumbnail for the event");
        return;
      }

      const thumbnailUrl = await uploadThumbnail();

      const eventData = {
        ...formData,
        thumbnail: thumbnailUrl,
        createdBy: currentUser?._id,
      };

      const res = await axiosSecure.post("/events", eventData);

      if (res.data.result?.insertedId) {
        toast.success("Event created successfully");
        e.target.reset();
        setThumbnail(null);
        setThumbnailPreview("");
        setFormData({
          name: "",
          description: "",
          date: "",
          time: "",
          category: "",
          thumbnail: "",
          attendees: [],
          createdAt: new Date().getTime(),
        });
      } else {
        toast.error("Event creation failed, please try again");
      }
    } catch (err) {
      console.error("Event creation failed:", err);
      toast.error("Event creation failed, please try again");
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-center h-full">
          <p className="text-2xl font-semibold text-gray-800">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-blue-50 mb-20 flex items-center justify-center p-10 md:p-20 rounded-2xl">
      {isUploading && <LoadingModal text="Creating event..." />}

      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-gray-900">Create New Event</h1>
          <p className="mt-2 text-gray-600">Fill in the details to create a new event</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-sm">
          <div className="space-y-6">
            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Event Thumbnail</label>
              <div className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500">
                <input type="file" accept="image/*" onChange={handleThumbnailChange} className="hidden size-full" id="thumbnail-upload" />
                <label htmlFor="thumbnail-upload" className="cursor-pointer w-full">
                  {thumbnailPreview ? (
                    <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-48 object-cover rounded-lg" />
                  ) : (
                    <div className="text-center w-full">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">Click to upload thumbnail</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Category Select */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Event Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter event name"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide event details..."
                />
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                  Time
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="block w-full pl-10 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isUploading}
              className="w-full md:w-auto px-8 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
