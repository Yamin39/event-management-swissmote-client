import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://event-management-swissmote-server.vercel.app",
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
