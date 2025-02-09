import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageEvents = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    console.log(id, "delete");

    try {
      const res = await axiosSecure.delete(`/events/${id}`);
      if (res.data.deletedCount > 0) {
        toast.success("Event has been deleted!");
        refetch();
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong!");
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-primary">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs border ">
            <colgroup>
              <col />
              <col />
              <col />
              <col />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr className="text-left bg-slate-100">
                <th className="p-3">SL</th>
                <th className="p-3">Name</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Description</th>
                <th className="p-3">Update</th>
                <th className="p-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {events?.map((event, i) => (
                <tr key={i} className="border *:py-4">
                  <td className="p-2">
                    <p>{i + 1}</p>
                  </td>
                  <td className="p-2">
                    <p>{event.name}</p>
                  </td>
                  <td className="p-2">
                    <p>{format(new Date(event.createdAt), "yyyy-MM-dd hh:mm a")}</p>
                  </td>
                  <td className="p-2">
                    <p>{event.description.slice(0, 40)}...</p>
                  </td>
                  <td className="p-2">
                    <Link to={`/dashboard/updateEvent/${event._id}`} className="px-3 py-1 font-semibold rounded-md bg-primary text-white cursor-pointer">
                      <span>Update</span>
                    </Link>
                  </td>
                  <td className="p-2">
                    <button onClick={() => handleDelete(event._id)} className="px-3 py-1 font-semibold rounded-md bg-red-500 text-white cursor-pointer">
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
