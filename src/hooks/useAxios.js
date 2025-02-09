import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://event-management-swissmote-server.vercel.app",
  withCredentials: true,
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
