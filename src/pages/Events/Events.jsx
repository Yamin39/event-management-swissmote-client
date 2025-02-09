import { useQuery } from "@tanstack/react-query";
import { Calendar, Clock } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Events = () => {
  const axios = useAxios();
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();

  const {
    data: events = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axios.get("/events");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-primary">Loading...</p>
      </div>
    );
  }

  const handleAttend = async (id) => {
    console.log(id, "attend");

    if (!currentUser) {
      toast.error("Please login to attend the event");
      return;
    } else if (currentUser.role === "guest") {
      toast.error("Guests cannot attend events, please login or register");
      return;
    }

    try {
      const res = await axiosSecure.put(`/events/${id}/attend`);
      if (res.data.attended) {
        toast.success(res.data.message);
        refetch();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center">
        {events.map((seminar) => (
          <div
            key={seminar._id}
            className="group flex bg-[#F7F5F2] flex-col w-80 border border-gray-200 rounded shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:scale-105"
          >
            <div className="h-[40%]">
              <img className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" src={seminar.thumbnail} alt={seminar.name} />
            </div>

            <div className="relative bg-[#F7F5F2] duration-500 flex flex-col p-4">
              <div className="flex gap-2">
                <h2 className="px-2.5 py-0.5 text-xs text-center w-fit rounded-sm bg-green-400 text-teal-900">{seminar.category}</h2>
              </div>

              <h3 className="text-xl text-start font-bold mt-2">{seminar.name}</h3>

              {/* Description */}
              <p className="text-sm text-start text-gray-500 mt-2">{seminar.description}...</p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-green-600" />
                  <span>{seminar.date}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-orange-700" />
                  <span>{`${seminar.time}`}</span>
                </div>
              </div>

              <button
                onClick={() => handleAttend(seminar._id)}
                className=" mt-2 px-4 py-2 bg-red-500 text-white text-center rounded-md hover:bg-yellow-600 transition-colors duration-300"
              >
                Attend
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
