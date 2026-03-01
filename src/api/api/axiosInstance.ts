import axios from "axios";
import { ApiRoute } from "../../Routes/apiRoute";

export const axiosInstance = axios.create({
  baseURL: ApiRoute.BASE_URL,
});
